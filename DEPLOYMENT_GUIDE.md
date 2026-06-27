# Deployment Guide — AI Builder OS

## 环境要求

- Node.js 18+（推荐 20+）
- npm 9+
- 操作系统：Windows 10/11、macOS、Linux

## Windows 启动

```powershell
# 打开 PowerShell 或 CMD
cd C:\Users\25128\Desktop\ai-builder-os
npm install
npm run dev
```

浏览器打开 http://localhost:3000

## WSL 启动

```bash
cd /mnt/c/Users/25128/Desktop/ai-builder-os
npm install
npm run dev
```

浏览器打开 http://localhost:3000

## 生产构建

```bash
npm run build    # 构建静态文件
npm run start    # 启动生产服务器
```

## Vercel 部署

1. 推送到 GitHub 仓库
2. 登录 vercel.com
3. Import Git Repository
4. Framework: Next.js（自动检测）
5. 点击 Deploy

```bash
# 或使用 Vercel CLI
npm i -g vercel
vercel
vercel --prod
```

## 静态导出

如果需要纯静态文件（无 Node.js 服务器）：

```bash
# next.config.ts 中添加：
# output: 'export'

npm run build
# 输出在 out/ 目录
```

## 常见问题

### Q: npm install 很慢
```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com
npm install
```

### Q: Google Fonts 报错
已修复。项目使用系统字体，不依赖 Google Fonts。

### Q: 端口被占用
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# WSL/Linux
lsof -i :3000
kill -9 <PID>
```

### Q: WSL 和 Windows 路径问题
- WSL 路径：/mnt/c/Users/25128/Desktop/ai-builder-os/
- Windows 路径：C:\Users\25128\Desktop\ai-builder-os\
- 两者是同一个目录，数据同步

## 数据更新

如需更新数据，重新运行提取脚本：

```bash
cd /mnt/c/Users/25128/Desktop/ai-builder-os
python3 scripts/extract-projects.py
python3 scripts/extract-customers.py
```

然后重新 build。
