"""抽取脚本与数据清洗共用的纯函数（可单测，不依赖本机路径）。"""

import re

SCORE_KEYS = [
    "resumeValue", "businessValue", "techGrowth", "freelanceValue",
    "developability", "differentiation", "longTermReuse",
]

_NEGATIVE_WORTH = re.compile(r"不\s*(?:太)?\s*(?:值得|建议|推荐|可以|宜|要接|能接|应该接)|别接|不接|放弃|谢绝")
_POSITIVE_WORTH = re.compile(r"值得|可以接|建议接|推荐接|可以|能接")


def parse_worth(text):
    """「是否值得接」文本 -> True/False/None（无法判断）。否定词优先于「值得」。"""
    if not text or not text.strip():
        return None
    if _NEGATIVE_WORTH.search(text):
        return False
    if _POSITIVE_WORTH.search(text):
        return True
    return None


_NUM = r"\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?"
_AMOUNT = re.compile(
    rf"({_NUM})\s*(万)?\s*(?:[-~～至到]\s*({_NUM})\s*(万)?)?\s*元"
)


def _to_int(num, wan):
    v = float(num.replace(",", ""))
    if wan:
        v *= 10000
    return int(round(v))


def parse_amounts(text):
    """提取文本中的金额（元），支持千分位「1,500元」、「1.5万元」、区间「1000-3000元」。"""
    out = []
    for m in _AMOUNT.finditer(text or ""):
        first_wan = m.group(2)
        out.append(_to_int(m.group(1), first_wan or (m.group(4) if m.group(3) else None)))
        if m.group(3):
            out.append(_to_int(m.group(3), m.group(4)))
    return out


# 客户类型规则：前 12 类与 src/data/customerProfiles.json 对齐，另补「金融机构」「政务/公益机构」「电商卖家」「学生/求职者」。
# 按顺序匹配：行业/身份词优先，「公司/老板」这类泛称兜底（避免「留学机构公司」被判成小公司老板）。
_TYPE_RULES = [
    ("金融机构", r"银行|保险|私募"),
    ("政务/公益机构", r"政府|政务|街道|社区服务|公益|基金会"),
    ("学生/求职者", r"应届|毕业生|考研生|大[一二三四]学生|求职"),
    ("金融自媒体", r"(?:金融|财经|股|理财|投教|交易).{0,6}(?:博主|自媒体)"),
    ("投研个人/投顾团队", r"投顾|投研|证券|量化|券商"),
    ("留学机构", r"留学|出国|文书"),
    ("跨境电商", r"跨境|亚马逊|Shopee|速卖通|外贸|Shopify|TikTok Shop|出口"),
    ("游戏公司", r"游戏"),
    ("电商卖家", r"淘宝|拼多多|天猫|京东店|电商"),
    ("内容团队/MCN", r"MCN|编导|达人|内容团队|内容创业|短视频创业|编辑部"),
    ("本地商家", r"私教|健身|瑜伽"),
    ("自由职业者/个人IP", r"博主|自媒体|个人IP|自由职业|UP主|主播|摄影师|设计师|音乐人|创作者|独立.{0,4}开发者|策划师|咨询师|社群"),
    ("教育培训机构", r"培训|辅导|课程|考研|教育|校长|讲师"),
    ("咨询公司", r"咨询公司"),
    ("本地商家", r"门店|店主|店老板|商家|餐厅|餐饮|火锅|宠物|花店|美容|咖啡|奶茶|茶饮|直营店|剧本杀|4S店|画廊"),
    ("传统行业老板", r"工厂|制造|物流|批发|建材|五金|货运|司机|仓储|农场|合作社|种植"),
    ("小公司老板", r"老板|总经理|创始人|合伙人|公司|企业|创业|CTO"),
]


def infer_customer_type(text):
    """按客户画像文本推断客户类型；行业词优先，「公司」这类泛称兜底；无法判断返回「其他」。"""
    for name, pat in _TYPE_RULES:
        if re.search(pat, text or "", re.IGNORECASE):
            return name
    return "其他"


def derive_willingness(description):
    """客户画像里的「真实愿意付钱的点：……」。"""
    m = re.search(r"真实愿意付钱的点[：:]\s*([^\n]+)", description or "")
    return m.group(1).strip().rstrip("。") if m else ""


def derive_budget(communication_tips):
    """沟通策略里的「判断预算：……」。"""
    m = re.search(r"判断预算[：:]\s*([^\n]+)", communication_tips or "")
    return m.group(1).strip() if m else ""


def derive_pain_point(description):
    """客户画像里的「（最大）痛点是……」。"""
    m = re.search(r"痛点(?:是|[：:])\s*([^。\n]+)", description or "")
    return m.group(1).strip() if m else ""


def compute_avg(scores):
    """对已有（非 None）的维度求平均；没有任何分数返回 None（不再默认 7.0）。"""
    vals = [v for v in (scores or {}).values() if isinstance(v, (int, float))]
    if not vals:
        return None
    return round(sum(vals) / len(vals), 1)


# 判断「数据缺失」的核心描述字段：这些全空时，项目只剩名字/功能列表，评分没有依据
CORE_PROJECT_FIELDS = ["oneliner", "targetUsers", "painPoints", "mvpScope"]


def is_project_empty(project):
    """核心描述字段（定位/目标用户/痛点/MVP 范围）全空视为「数据缺失」项目。"""
    return not any(project.get(k) for k in CORE_PROJECT_FIELDS)
