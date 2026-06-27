#!/usr/bin/env python3
"""Extract 100 customer cases from 100_客户模拟案例库.md into customer-cases.json."""

import os
import re
import json

INPUT_FILE = "/mnt/c/Users/25128/Desktop/V-warfare-system/100_客户模拟案例库.md"
OUTPUT = "/mnt/c/Users/25128/Desktop/ai-builder-os/src/data/customer-cases.json"

def extract_case(case_num, case_text, customer_type):
    """Extract a single customer case from markdown text."""
    case = {
        "id": case_num,
        "customerType": customer_type,
        "name": "",
        "age": 0,
        "location": "",
        "industry": "",
        "description": "",
        "painPoint": "",
        "willingness": "",
        "budget": "",
        "difficulty": "中等",
        "quote": {"low": 0, "standard": 0, "high": 0, "recommended": 0},
        "product": "",
        "deliveryDays": "",
        "communicationTips": "",
        "closingScript": "",
        "riskPoints": [],
        "keyLearning": "",
        "customerQuote": "",
        "surfaceNeed": "",
        "realNeed": "",
        "hiddenRisks": [],
        "worthTaking": True,
        "firstRoundQuestions": [],
        "acceptanceCriteria": "",
        "biggestRisk": "",
        "stopConditions": [],
    }
    
    # Customer profile section
    profile_match = re.search(r'\*?\*?客户画像\*?\*?\s*\n(.*?)(?=\n\*?\*?客户原话|\n---|\Z)', case_text, re.DOTALL)
    if profile_match:
        profile = profile_match.group(1).strip()
        # Extract name, age, location
        name_match = re.search(r'^([^，,]+)[，,]\s*(\d+)岁[，,]\s*([^，,]+)', profile)
        if name_match:
            case["name"] = name_match.group(1).strip()
            case["age"] = int(name_match.group(2))
            case["location"] = name_match.group(3).strip()
        case["description"] = profile[:500]
    
    # Customer quote
    quote_match = re.search(r'\*?\*?客户原话\*?\*?\s*\n(.*?)(?=\n\*?\*?需求拆解|\n---|\Z)', case_text, re.DOTALL)
    if quote_match:
        quote_text = quote_match.group(1).strip()
        # Extract the actual quote
        actual_quote = re.search(r'["""]([^"""]+)["""]', quote_text)
        if actual_quote:
            case["customerQuote"] = actual_quote.group(1)
        else:
            case["customerQuote"] = quote_text[:300]
    
    # Needs analysis
    needs_match = re.search(r'\*?\*?需求拆解\*?\*?\s*\n(.*?)(?=\n\*?\*?沟通策略|\n---|\Z)', case_text, re.DOTALL)
    if needs_match:
        needs = needs_match.group(1).strip()
        surface = re.search(r'表面需求[：:]\s*(.*?)(?=\n-|\n\*|$)', needs)
        if surface:
            case["surfaceNeed"] = surface.group(1).strip()
        real = re.search(r'真实需求[：:]\s*(.*?)(?=\n-|\n\*|$)', needs)
        if real:
            case["realNeed"] = real.group(1).strip()
        risk = re.search(r'隐藏风险[：:]\s*(.*?)(?=\n-|\n\*|$)', needs)
        if risk:
            case["hiddenRisks"] = [risk.group(1).strip()]
        worth = re.search(r'是否值得接[：:]\s*(.*?)(?=\n-|\n\*|$)', needs)
        if worth:
            case["worthTaking"] = "值得" in worth.group(1) or "可以" in worth.group(1)
    
    # Communication strategy
    comm_match = re.search(r'\*?\*?沟通策略\*?\*?\s*\n(.*?)(?=\n\*?\*?报价方案|\n---|\Z)', case_text, re.DOTALL)
    if comm_match:
        comm = comm_match.group(1).strip()
        case["communicationTips"] = comm[:500]
        # Extract first round questions
        questions = re.findall(r'[-•]\s*["""]([^"""]+)["""]', comm)
        case["firstRoundQuestions"] = questions[:5]
    
    # Quote/pricing
    quote_match = re.search(r'\*?\*?报价方案\*?\*?\s*\n(.*?)(?=\n\*?\*?成交话术|\n---|\Z)', case_text, re.DOTALL)
    if quote_match:
        quote_text = quote_match.group(1).strip()
        # Extract prices
        prices = re.findall(r'(\d+)元', quote_text)
        if len(prices) >= 3:
            case["quote"]["low"] = int(prices[0])
            case["quote"]["standard"] = int(prices[1])
            case["quote"]["high"] = int(prices[2])
            case["quote"]["recommended"] = int(prices[1])
        elif len(prices) >= 1:
            case["quote"]["recommended"] = int(prices[0])
            case["quote"]["low"] = int(prices[0])
            case["quote"]["standard"] = int(prices[0])
            case["quote"]["high"] = int(prices[0])
    
    # Closing script
    closing_match = re.search(r'\*?\*?成交话术\*?\*?\s*\n(.*?)(?=\n\*?\*?交付方案|\n---|\Z)', case_text, re.DOTALL)
    if closing_match:
        case["closingScript"] = closing_match.group(1).strip()[:500]
    
    # Delivery plan
    delivery_match = re.search(r'\*?\*?交付方案\*?\*?\s*\n(.*?)(?=\n\*?\*?风险控制|\n---|\Z)', case_text, re.DOTALL)
    if delivery_match:
        delivery = delivery_match.group(1).strip()
        days_match = re.search(r'(\d+)[\s-]*(\d+)\s*个?工作日', delivery)
        if days_match:
            case["deliveryDays"] = f"{days_match.group(1)}-{days_match.group(2)}天"
        else:
            days_match2 = re.search(r'周期[：:]\s*(\d+)', delivery)
            if days_match2:
                case["deliveryDays"] = f"{days_match2.group(1)}天"
        
        # Extract acceptance criteria
        acc_match = re.search(r'验收标准[：:]\s*(.*?)(?=\n-|\n\*|$)', delivery)
        if acc_match:
            case["acceptanceCriteria"] = acc_match.group(1).strip()
    
    # Risk control
    risk_match = re.search(r'\*?\*?风险控制\*?\*?\s*\n(.*?)(?=\n\*?\*?复盘|\n---|\Z)', case_text, re.DOTALL)
    if risk_match:
        risk = risk_match.group(1).strip()
        biggest = re.search(r'最大翻车点[：:]\s*(.*?)(?=\n-|\n\*|$)', risk)
        if biggest:
            case["biggestRisk"] = biggest.group(1).strip()
        stops = re.findall(r'停止条件[：:]\s*(.*?)(?=\n-|\n\*|$)', risk)
        if stops:
            case["stopConditions"] = [stops[0].strip()]
        case["riskPoints"] = [line.strip('- •*').strip() for line in risk.split('\n') if line.strip().startswith(('-', '•', '*'))][:5]
    
    # Review/retrospective
    review_match = re.search(r'\*?\*?复盘\*?\*?\s*\n(.*?)(?=\n---|\n##|\Z)', case_text, re.DOTALL)
    if review_match:
        review = review_match.group(1).strip()
        learn = re.search(r'训练能力[：:]\s*(.*?)(?=\n-|\n\*|$)', review)
        if learn:
            case["keyLearning"] = learn.group(1).strip()
    
    # Determine difficulty based on quote
    if case["quote"]["recommended"] <= 1500:
        case["difficulty"] = "低"
    elif case["quote"]["recommended"] <= 3000:
        case["difficulty"] = "中等"
    elif case["quote"]["recommended"] <= 5000:
        case["difficulty"] = "偏麻烦"
    else:
        case["difficulty"] = "高"
    
    return case

def main():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by case headers
    # Pattern: ### 案例NN：title
    case_splits = re.split(r'\n###\s*案例\s*(\d+)[：:]', content)
    
    all_cases = []
    current_customer_type = "未知"
    
    # Track customer type from ## headers
    type_sections = re.split(r'\n##\s*客户类型[一二三四五六七八九十\d]+[：:]', content)
    
    for i in range(1, len(case_splits), 2):
        case_num = int(case_splits[i])
        case_text = case_splits[i + 1] if i + 1 < len(case_splits) else ""
        
        # Determine customer type from context
        # Look backwards in the text for the customer type header
        type_match = re.search(r'客户类型[^：:]*[：:]\s*([^\n]+)', case_text[:200])
        if type_match:
            current_customer_type = type_match.group(1).strip()
        
        case = extract_case(case_num, case_text, current_customer_type)
        all_cases.append(case)
    
    print(f"Extracted {len(all_cases)} customer cases")
    
    # Count by type
    type_counts = {}
    for c in all_cases:
        t = c["customerType"]
        type_counts[t] = type_counts.get(t, 0) + 1
    for t, count in sorted(type_counts.items()):
        print(f"  {t}: {count} cases")
    
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(all_cases, f, ensure_ascii=False, indent=2)
    print(f"Written to {OUTPUT}")

if __name__ == "__main__":
    main()
