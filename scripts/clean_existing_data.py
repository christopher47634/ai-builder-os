#!/usr/bin/env python3
"""原始 Markdown 资料不在仓库里时，对已有 src/data 下的 JSON 做幂等清洗。
找到原始资料请改跑 extract-*.py 重新生成（两边共用 data_rules.py 的规则）。

- customer-cases.json
  - customerType 为空/「未知」的按客户画像（画像为空时用客户原话）推断；
  - willingness / painPoint / budget 从画像与沟通策略里能直接读出的部分补齐；
  - 没有「需求拆解」章节的案例，worthTaking 原先是脚本默认 True，无依据，置 null。
- projects.json
  - 核心描述字段全空的项目标记 dataMissing=true，scores/avgScore 置 null（不展示假评分）；
  - 其余项目补 dataMissing=false，scores 补齐 7 维键，avgScore 按非空维度重算。
"""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from data_rules import (  # noqa: E402
    SCORE_KEYS, compute_avg, derive_budget, derive_pain_point, derive_willingness,
    infer_customer_type, is_project_empty,
)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "src", "data")


def clean_cases(cases):
    for c in cases:
        if not c.get("customerType") or c["customerType"] == "未知":
            c["customerType"] = infer_customer_type(c.get("description") or c.get("customerQuote", ""))
        if not c.get("willingness"):
            c["willingness"] = derive_willingness(c.get("description", ""))
        if not c.get("painPoint"):
            c["painPoint"] = derive_pain_point(c.get("description", ""))
        if not c.get("budget"):
            c["budget"] = derive_budget(c.get("communicationTips", ""))
        if not c.get("surfaceNeed") and not c.get("realNeed"):
            c["worthTaking"] = None
    return cases


def clean_projects(projects):
    for p in projects:
        if is_project_empty(p):
            p["dataMissing"] = True
            p["scores"] = None
            p["avgScore"] = None
        else:
            p["dataMissing"] = False
            scores = p.get("scores") or {}
            p["scores"] = {k: scores.get(k) for k in SCORE_KEYS}
            p["avgScore"] = compute_avg(p["scores"])
    return projects


def _rewrite(name, fn):
    path = os.path.join(DATA, name)
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    data = fn(data)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


if __name__ == "__main__":
    _rewrite("customer-cases.json", clean_cases)
    _rewrite("projects.json", clean_projects)
    print("cleaned")
