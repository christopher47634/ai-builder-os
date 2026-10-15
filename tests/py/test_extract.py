"""抽取脚本与清洗规则的单测：pytest tests/py（也可 python -m unittest 兼容 pytest 风格函数以外的用例，此处统一 pytest）。"""
import importlib.util
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(ROOT, "scripts"))

import data_rules as dr  # noqa: E402
import clean_existing_data as clean  # noqa: E402


def _load(name):
    spec = importlib.util.spec_from_file_location(name.replace("-", "_"), os.path.join(ROOT, "scripts", name + ".py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


customers = _load("extract-customers")
projects = _load("extract-projects")

CASE = """**客户画像**
陈总，38岁，广州，小型外贸B2B公司老板。痛点是重复询盘太多。真实愿意付钱的点：不漏单。

**需求拆解**
- 表面需求：做AI客服
- 是否值得接：{worth}

**沟通策略**
判断预算：大概1000-3000。

**报价方案**
入门版 {a}元，标准版 {b}元，高级版 {c}元
"""


def test_worth_negation():
    assert customers.extract_case(1, CASE.format(worth="不值得接", a="800", b="1,500", c="3,000"), "x")["worthTaking"] is False
    assert dr.parse_worth("不值得接") is False
    assert dr.parse_worth("不建议接") is False
    assert dr.parse_worth("值得接") is True
    assert dr.parse_worth("") is None


def test_thousands_separator_and_wan():
    assert dr.parse_amounts("标准版 1,500元") == [1500]
    assert dr.parse_amounts("1.5万元") == [15000]
    assert dr.parse_amounts("1000-3000元") == [1000, 3000]
    q = customers.extract_case(1, CASE.format(worth="值得", a="800", b="1,500", c="3,000"), "x")["quote"]
    assert (q["low"], q["standard"], q["high"]) == (800, 1500, 3000)


def test_type_sections_used():
    md = "## 客户类型一：留学机构\n\n### 案例1：甲\n内容\n\n## 客户类型二：电商卖家\n\n### 案例2：乙\n内容\n"
    assert [(n, t) for n, _, t in customers.split_cases(md)] == [(1, "留学机构"), (2, "电商卖家")]


def test_type_inference_industry_before_company():
    assert dr.infer_customer_type("某留学机构公司老板") == "留学机构"
    assert dr.infer_customer_type("小公司老板") == "小公司老板"


def test_derived_fields():
    c = customers.extract_case(1, CASE.format(worth="值得", a="800", b="1,500", c="3,000"), "x")
    assert c["willingness"] == "不漏单"
    assert c["painPoint"] == "重复询盘太多"
    assert "1000-3000" in c["budget"]


def test_no_default_score():
    assert dr.compute_avg({k: None for k in dr.SCORE_KEYS}) is None
    assert dr.compute_avg({"resumeValue": 8, "businessValue": 6, "techGrowth": None}) == 7.0
    p = {"oneliner": "", "targetUsers": [], "painPoints": [], "mvpScope": [], "scores": {k: None for k in dr.SCORE_KEYS}}
    projects.finalize_scores(p)
    assert p["dataMissing"] is True and p["scores"] is None and p["avgScore"] is None


def test_clean_projects_marks_empty_and_hides_scores():
    ps = [
        {"oneliner": "", "targetUsers": [], "painPoints": [], "mvpScope": [], "scores": {"resumeValue": 8}, "avgScore": 8},
        {"oneliner": "x", "targetUsers": ["u"], "painPoints": [], "mvpScope": [], "scores": {"resumeValue": 8}, "avgScore": 8},
    ]
    out = clean.clean_projects(ps)
    assert out[0]["dataMissing"] and out[0]["scores"] is None and out[0]["avgScore"] is None
    assert not out[1]["dataMissing"] and set(out[1]["scores"]) == set(dr.SCORE_KEYS)


def test_no_hardcoded_local_paths():
    for f in ("extract-customers.py", "extract-projects.py", "clean_existing_data.py", "data_rules.py"):
        assert "/mnt/c/" not in open(os.path.join(ROOT, "scripts", f), encoding="utf-8").read()


def test_shipped_data_clean():
    cases = json.load(open(os.path.join(ROOT, "src/data/customer-cases.json"), encoding="utf-8"))
    assert all(c["customerType"] not in ("", "未知") for c in cases)
    pj = json.load(open(os.path.join(ROOT, "src/data/projects.json"), encoding="utf-8"))
    assert all(p["scores"] is None for p in pj if p["dataMissing"])
    assert len({p["id"] for p in pj}) == len(pj)
