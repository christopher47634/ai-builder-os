#!/usr/bin/env python3
"""Extract 100 AI projects from markdown files into projects.json."""

import os
import re
import json
import glob

BASE_DIR = "/mnt/c/Users/25128/Desktop/AI项目资产库v1"
OUTPUT = "/mnt/c/Users/25128/Desktop/ai-builder-os/src/data/projects.json"

CATEGORY_MAP = {
    "01": ("RAG企业知识库", 1), "02": ("Agent类", 2), "03": ("工作流自动化", 3),
    "04": ("金融投研", 4), "05": ("教育学习", 5), "06": ("内容创作", 6),
    "07": ("电商与销售", 7), "08": ("HR法务办公", 8), "09": ("多模态", 9),
    "10": ("个人效率与小企业", 10), "11": ("跨领域精选", 11), "12": ("游戏与互动", 12),
    "13": ("本地模型部署", 13), "14": ("论文学术", 14), "15": ("医疗健康", 15),
    "16": ("数据分析", 16), "17": ("社媒与办公", 17), "18": ("小企业数字化", 18),
    "19": ("AI工程工具", 19), "20": ("开发者工具", 20),
}

CN_TO_NUM = {'一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10}

# Number-to-field mapping for table format (13, 14, 17, 18 style)
TABLE_FIELD_MAP = {
    1: ["项目名称"],
    2: ["一句话定位", "项目定位", "一句话描述", "英文名"],
    3: ["目标用户", "目标用户画像", "核心价值", "所属领域"],
    4: ["用户痛点", "核心痛点", "解决的核心问题", "核心功能1"],
    5: ["为什么传统方案不好", "核心功能2", "应用场景", "使用场景"],
    6: ["AI介入点", "核心功能3", "解决方案"],
    7: ["核心功能", "核心功能4", "核心功能模块"],
    8: ["MVP功能范围", "核心功能5"],
    9: ["V1功能范围", "核心功能6"],
    10: ["不做什么"],
}


def extract_table_field(text, number):
    """Extract from table format: | N | fieldName | content |"""
    # Try matching by row number
    pattern = rf'\|\s*{number}\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|'
    m = re.search(pattern, text)
    if m:
        field_name = m.group(1).strip()
        content = m.group(2).strip()
        return content, field_name
    return "", ""


def extract_numbered_field(text, number, field_name=""):
    """Extract a numbered field. Handles multiple markdown formats."""
    # Try ### N. fieldName (heading format)
    for alias in _get_aliases(field_name):
        pattern = rf'(?:^|\n)###\s+{number}\.\s*{re.escape(alias)}\s*\n(.*?)(?=\n###\s+\d+\.|\n---|\Z)'
        m = re.search(pattern, text, re.DOTALL)
        if m and m.group(1).strip():
            return m.group(1).strip()

    # Try **N. fieldName** or N. **fieldName** (bold format)
    for alias in _get_aliases(field_name):
        pattern = rf'(?:^|\n)\*?\*?{number}\.\s*\*?\*?{re.escape(alias)}\*?\*?\s*[：:]*\s*\n(.*?)(?=\n\*?\*?\d+\.|\n###\s*\d+\.|\n---|\Z)'
        m = re.search(pattern, text, re.DOTALL)
        if m and m.group(1).strip():
            return m.group(1).strip()

        # Inline format: N. **fieldName**：content
        pattern2 = rf'(?:^|\n)\*?\*?{number}\.\s*\*?\*?{re.escape(alias)}\*?\*?[：:]\s*(.*?)(?=\n\*?\*?\d+\.|\n###\s*\d+\.|\n---|\Z)'
        m2 = re.search(pattern2, text, re.DOTALL)
        if m2 and m2.group(1).strip():
            return m2.group(1).strip()

    # Try bold field without number (Format 3: **fieldName：** content)
    if field_name:
        for alias in _get_aliases(field_name):
            pattern = rf'\*\*{re.escape(alias)}[：:]\*?\*?\s*(.*?)(?=\n\*\*[^\d\n]|\n---|\n##|\Z)'
            m = re.search(pattern, text, re.DOTALL)
            if m and m.group(1).strip():
                return m.group(1).strip()

    # Try table format
    content, found_name = extract_table_field(text, number)
    if content:
        return content

    return ""


def _get_aliases(field_name):
    """Get aliases for a field name."""
    aliases_map = {
        "项目名称": ["项目名称"],
        "一句话定位": ["一句话定位", "项目定位", "一句话描述"],
        "目标用户": ["目标用户", "目标用户画像"],
        "用户痛点": ["用户痛点", "核心痛点"],
        "为什么传统方案不好": ["为什么传统方案不好", "为什么传统方案", "核心价值", "核心价值主张"],
        "AI介入点": ["AI介入点", "解决的核心问题", "解决方案"],
        "核心功能": ["核心功能", "核心功能模块", "核心功能1"],
        "MVP功能范围": ["MVP功能范围", "核心功能模块"],
        "不做什么": ["不做什么"],
        "用户流程": ["用户流程"],
        "页面结构": ["页面结构"],
        "数据来源": ["数据来源"],
        "数据结构": ["数据结构"],
        "Prompt设计": ["Prompt设计", "Prompt", "提示词设计"],
        "前端技术建议": ["前端技术建议", "前端"],
        "后端技术建议": ["后端技术建议", "后端"],
        "数据库设计": ["数据库设计", "数据库"],
        "API设计": ["API设计", "API"],
        "关键算法": ["关键算法/规则逻辑", "关键算法", "关键"],
        "风险点": ["风险点", "风险"],
        "测试方案": ["测试方案"],
        "部署方案": ["部署方案"],
        "开发难度": ["开发难度（1-5星）", "开发难度"],
        "预计开发周期": ["预计开发周期"],
        "商业价值": ["商业价值（高/中/低）", "商业价值"],
        "可能收费方式": ["可能收费方式", "收费方式"],
        "竞品或替代方案": ["竞品或替代方案", "竞品"],
        "差异化": ["差异化"],
        "简历写法": ["简历写法"],
        "最终评分": ["最终评分"],
    }
    return aliases_map.get(field_name, [field_name])


def clean_field(text, field_name):
    """Remove field name prefix from extracted text."""
    if not text:
        return ""
    for alias in _get_aliases(field_name):
        text = re.sub(r'\*?\*?' + re.escape(alias) + r'\*?\*?\s*[：:]?\s*', '', text, count=1)
    return text.strip().strip('*').strip()


def parse_list(raw):
    """Parse text into a list of items."""
    if not raw:
        return []
    items = [line.strip('- •*·\u2022').strip() for line in raw.split('\n') if line.strip().startswith(('-', '•', '*', '·', '\u2022'))]
    if not items:
        # Try numbered list
        items = [re.sub(r'^\d+[\.\)、]\s*', '', line).strip() for line in raw.split('\n') if re.match(r'^\d+[\.\)、]', line.strip())]
    if not items:
        items = [f.strip() for f in re.split(r'[；;]', raw) if f.strip()]
    if not items and raw:
        items = [raw]
    return [i for i in items if i]


def extract_score_field(text, field_name):
    """Extract a score like '简历价值：8/10'"""
    pattern = rf'{re.escape(field_name)}[：:]\s*(\d+)'
    m = re.search(pattern, text)
    if m:
        return int(m.group(1))
    return None


def extract_project(text, proj_num, category_name, category_idx, filename):
    """Extract a single project from markdown text."""
    project = {}
    project["id"] = f"{category_idx:02d}-{proj_num:03d}"
    project["category"] = category_name
    project["categoryIndex"] = category_idx
    project["sourceFile"] = filename

    # Project name
    name_text = extract_numbered_field(text, 1, "项目名称")
    name_text = clean_field(name_text, "项目名称")
    eng_match = re.search(r'[（(]([^）)]+)[）)]', name_text)
    if eng_match:
        project["englishName"] = eng_match.group(1)
    project["name"] = name_text.split('（')[0].strip() if '（' in name_text else name_text.split('(')[0].strip() if '(' in name_text else name_text
    if not project["name"]:
        project["name"] = name_text

    # One-liner
    oneliner = extract_numbered_field(text, 2, "一句话定位")
    project["oneliner"] = clean_field(oneliner, "一句话定位")

    # Target users
    target = extract_numbered_field(text, 3, "目标用户")
    target_clean = clean_field(target, "目标用户")
    users = parse_list(target_clean)
    if not users and target_clean:
        users = [u.strip() for u in re.split(r'[，,、]', target_clean) if u.strip()]
    project["targetUsers"] = users if users else []

    # Pain points
    pain = extract_numbered_field(text, 4, "用户痛点")
    pain_clean = clean_field(pain, "用户痛点")
    pain_items = parse_list(pain_clean)
    project["painPoints"] = pain_items if pain_items else ([pain_clean] if pain_clean else [])

    # Traditional weakness
    trad = extract_numbered_field(text, 5, "为什么传统方案不好")
    project["traditionalSolutionWeakness"] = clean_field(trad, "为什么传统方案不好")

    # AI intervention
    ai = extract_numbered_field(text, 6, "AI介入点")
    project["aiIntervention"] = clean_field(ai, "AI介入点")

    # Core features
    features = extract_numbered_field(text, 7, "核心功能")
    features_clean = clean_field(features, "核心功能")
    feat_list = parse_list(features_clean)
    project["coreFeatures"] = feat_list if feat_list else ([features_clean] if features_clean else [])

    # MVP scope
    mvp = extract_numbered_field(text, 8, "MVP功能范围")
    mvp_clean = clean_field(mvp, "MVP功能范围")
    mvp_list = parse_list(mvp_clean)
    project["mvpScope"] = mvp_list if mvp_list else ([mvp_clean] if mvp_clean else [])

    # V1 scope
    v1 = extract_numbered_field(text, 9, "V1功能范围")
    v1_clean = clean_field(v1, "V1功能范围")
    v1_list = parse_list(v1_clean)
    project["v1Scope"] = v1_list if v1_list else ([v1_clean] if v1_clean else [])

    # Out of scope
    oos = extract_numbered_field(text, 10, "不做什么")
    oos_clean = clean_field(oos, "不做什么")
    oos_list = parse_list(oos_clean)
    project["outOfScope"] = oos_list if oos_list else ([oos_clean] if oos_clean else [])

    # User flow
    flow = extract_numbered_field(text, 11, "用户流程")
    flow_clean = clean_field(flow, "用户流程")
    flow_list = [f.strip('- •*·\u2022').strip() for f in flow_clean.split('\n') if f.strip() and not f.strip().startswith('```')]
    project["userFlow"] = [f for f in flow_list if f]

    # Page structure
    page = extract_numbered_field(text, 12, "页面结构")
    project["pageStructure"] = clean_field(page, "页面结构")

    # Data source
    ds = extract_numbered_field(text, 13, "数据来源")
    ds_clean = clean_field(ds, "数据来源")
    ds_list = parse_list(ds_clean)
    project["dataSource"] = ds_list if ds_list else ([ds_clean] if ds_clean else [])

    # Data structure
    dst = extract_numbered_field(text, 14, "数据结构")
    project["dataStructure"] = clean_field(dst, "数据结构")

    # RAG/Agent/Tool/Multimodal
    for idx, (field, key) in enumerate([
        ("是否需要RAG", "needsRAG"),
        ("是否需要Agent", "needsAgent"),
        ("是否需要工具调用", "needsToolCalling"),
        ("是否需要多模态", "needsMultimodal"),
    ]):
        val = extract_numbered_field(text, 15 + idx, field)
        project[key] = "是" in val[:20] if val else False

    # Prompt
    prompt = extract_numbered_field(text, 19, "Prompt设计")
    project["promptTemplate"] = clean_field(prompt, "Prompt设计")[:500] if prompt else ""

    # Tech stack
    frontend = extract_numbered_field(text, 21, "前端技术建议")
    backend = extract_numbered_field(text, 22, "后端技术建议")
    db = extract_numbered_field(text, 23, "数据库设计")
    project["techStack"] = {
        "frontend": clean_field(frontend, "前端技术建议")[:300],
        "backend": clean_field(backend, "后端技术建议")[:300],
        "database": clean_field(db, "数据库设计")[:300],
    }

    # API design
    api = extract_numbered_field(text, 24, "API设计")
    project["apiDesign"] = clean_field(api, "API设计")[:500] if api else ""

    # Key algorithms
    algo = extract_numbered_field(text, 25, "关键算法")
    project["keyAlgorithms"] = clean_field(algo, "关键算法")[:500] if algo else ""

    # Risks
    risks_text = extract_numbered_field(text, 26, "风险点")
    risks_clean = clean_field(risks_text, "风险点")
    project["risks"] = parse_list(risks_clean)

    # Testing strategy
    testing = extract_numbered_field(text, 29, "测试方案")
    project["testingStrategy"] = clean_field(testing, "测试方案")[:500] if testing else ""

    # Deployment plan
    deploy = extract_numbered_field(text, 31, "部署方案")
    project["deploymentPlan"] = clean_field(deploy, "部署方案")[:500] if deploy else ""

    # Difficulty
    diff_text = extract_numbered_field(text, 32, "开发难度")
    diff_match = re.search(r'(\d+)[/／]?\s*[5五⭐]', diff_text)
    project["difficulty"] = int(diff_match.group(1)) if diff_match else 3

    # Estimated duration
    dur = extract_numbered_field(text, 33, "预计开发周期")
    project["estimatedDuration"] = clean_field(dur, "预计开发周期") if dur else "1-2周"

    # Business value
    bv = extract_numbered_field(text, 34, "商业价值")
    project["businessValueRating"] = clean_field(bv, "商业价值")[:50] if bv else "中"

    # Monetization
    monetization = extract_numbered_field(text, 35, "可能收费方式")
    project["monetization"] = clean_field(monetization, "可能收费方式")[:500] if monetization else ""

    # Competitive analysis
    comp = extract_numbered_field(text, 36, "竞品或替代方案")
    project["competitiveAnalysis"] = clean_field(comp, "竞品或替代方案")[:500] if comp else ""

    # Differentiation
    diff2 = extract_numbered_field(text, 37, "差异化")
    project["differentiationText"] = clean_field(diff2, "差异化")[:500] if diff2 else ""

    # All solutions (fields 41-43)
    all_solutions = []
    for sol_num in [41, 42, 43]:
        sol = extract_numbered_field(text, sol_num, "")
        if sol:
            all_solutions.append(sol[:300])
    project["allSolutions"] = all_solutions

    # Resume value
    resume = extract_numbered_field(text, 38, "简历写法")
    project["resumeTemplate"] = clean_field(resume, "简历写法")[:500] if resume else ""

    # Scores
    project["scores"] = {
        "resumeValue": 7, "businessValue": 7, "techGrowth": 7,
        "freelanceValue": 7, "developability": 7, "differentiation": 7, "longTermReuse": 7,
    }

    # Try to extract scores from field 50
    score_text = extract_numbered_field(text, 50, "最终评分")
    if score_text:
        for score_name, key in [
            ("简历价值", "resumeValue"), ("商业价值", "businessValue"),
            ("技术成长", "techGrowth"), ("接单价值", "freelanceValue"),
            ("可开发性", "developability"), ("差异化", "differentiation"),
            ("长期复用", "longTermReuse"),
        ]:
            s = extract_score_field(score_text, score_name)
            if s is not None:
                project["scores"][key] = s

    score_vals = list(project["scores"].values())
    project["avgScore"] = round(sum(score_vals) / len(score_vals), 1) if score_vals else 7.0

    return project


def parse_overview_scores(overview_path):
    scores = {}
    if not os.path.exists(overview_path):
        return scores
    with open(overview_path, 'r', encoding='utf-8') as f:
        content = f.read()
    for line in content.split('\n'):
        match = re.match(r'\|\s*(\d+)\s*\|[^|]*\|\s*([^|]+)\s*\|\s*([^|]*)\s*\|\s*(\d+)\s*\|\s*([\d.]+)\s*\|', line)
        if match:
            scores[int(match.group(1))] = {
                "name": match.group(2).strip(),
                "oneliner": match.group(3).strip(),
                "difficulty": int(match.group(4)),
                "avgScore": float(match.group(5)),
            }
    return scores


def parse_sorting_data(z01_path):
    sorting = {}
    if not os.path.exists(z01_path):
        return sorting
    with open(z01_path, 'r', encoding='utf-8') as f:
        content = f.read()
    current_section = ""
    for line in content.split('\n'):
        if '按简历价值' in line: current_section = "resumeValue"
        elif '按商业价值' in line: current_section = "businessValue"
        elif '按技术成长' in line: current_section = "techGrowth"
        elif '按接单价值' in line: current_section = "freelanceValue"
        elif '按可开发性' in line: current_section = "developability"
        match = re.match(r'\|\s*(\d+)\s*\|([^|]+)\|\s*(\d+)\s*\|', line)
        if match and current_section:
            name = match.group(2).strip()
            score = int(match.group(3))
            if name not in sorting:
                sorting[name] = {}
            sorting[name][current_section] = score
    return sorting


def main():
    overview_path = os.path.join(BASE_DIR, "00_总览.md")
    z01_path = os.path.join(BASE_DIR, "z01_项目排序与推荐.md")
    overview_scores = parse_overview_scores(overview_path)
    sorting_data = parse_sorting_data(z01_path)

    all_projects = []

    for cat_num in range(1, 21):
        cat_key = f"{cat_num:02d}"
        if cat_key not in CATEGORY_MAP:
            continue
        cat_name, cat_idx = CATEGORY_MAP[cat_key]

        pattern = os.path.join(BASE_DIR, f"{cat_key}_*.md")
        files = glob.glob(pattern)
        if not files:
            continue

        filepath = files[0]
        filename = os.path.basename(filepath)

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        project_splits = re.split(r'\n(?:##|###)\s*项目([一二三四五六七八九十\d]+)[：:]', content)

        for i in range(1, len(project_splits), 2):
            raw_num = project_splits[i]
            if raw_num in CN_TO_NUM:
                proj_num = CN_TO_NUM[raw_num]
            else:
                try:
                    proj_num = int(raw_num)
                except ValueError:
                    continue
            proj_text = project_splits[i + 1] if i + 1 < len(project_splits) else ""

            project = extract_project(proj_text, proj_num, cat_name, cat_idx, filename)

            global_idx = (cat_num - 1) * 5 + proj_num
            if global_idx in overview_scores:
                ov = overview_scores[global_idx]
                if ov["name"]: project["name"] = ov["name"]
                if ov["oneliner"]: project["oneliner"] = ov["oneliner"]
                project["difficulty"] = ov["difficulty"]
                project["avgScore"] = ov["avgScore"]

            name = project["name"]
            if name in sorting_data:
                sd = sorting_data[name]
                for key in ["resumeValue", "businessValue", "techGrowth", "freelanceValue", "developability"]:
                    if key in sd:
                        project["scores"][key] = sd[key]

            score_vals = list(project["scores"].values())
            project["avgScore"] = round(sum(score_vals) / len(score_vals), 1) if score_vals else 7.0

            all_projects.append(project)

    all_projects.sort(key=lambda p: (p["categoryIndex"], p["id"]))

    print(f"Extracted {len(all_projects)} projects")
    for cat_name, count in sorted(set((p["category"], len([x for x in all_projects if x["category"] == p["category"]])) for p in all_projects)):
        print(f"  {cat_name}: {count} projects")

    empty_fields = {}
    for p in all_projects:
        for key in ['targetUsers', 'coreFeatures', 'mvpScope', 'painPoints']:
            v = p.get(key)
            if not v or (isinstance(v, list) and len(v) == 0):
                empty_fields.setdefault(key, 0)
                empty_fields[key] += 1
    print(f"Empty fields: {empty_fields}")

    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(all_projects, f, ensure_ascii=False, indent=2)
    print(f"Written to {OUTPUT}")


if __name__ == "__main__":
    main()
