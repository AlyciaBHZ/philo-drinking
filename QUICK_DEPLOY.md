# ⚡ Quick Deploy Checklist

## 🚀 5分钟快速部署

### Step 1: Git 初始化（1分钟）
```bash
cd philo
git init
git add .
git commit -m "Initial commit: Philo Drinking Game"
```

### Step 2: GitHub 仓库（2分钟）
```bash
# 1. 访问：https://github.com/new
# 2. Repository name: philo-drinking
# 3. Public ✅
# 4. Create repository

# 5. 连接仓库
git remote add origin https://github.com/AlyciaBHZ/philo-drinking.git
git branch -M main
git push -u origin main
```

### Step 3: 启用 GitHub Pages（30秒）
```
1. Settings > Pages
2. Source: GitHub Actions
3. 完成！
```

### Step 4: 配置子域名 DNS（1分钟）
```
登录 DNS 管理（Cloudflare/Namecheap）

添加 CNAME 记录：
Type: CNAME
Name: philo
Value: alyciabhz.github.io
Proxy: DNS only (灰色云)
```

### Step 5: 配置自定义域名（30秒）
```
1. GitHub Settings > Pages
2. Custom domain: philo.lexaverse.dev
3. Save
4. 等待 DNS 检查 ✅
5. 勾选 Enforce HTTPS
```

---

## ✅ 验证

```bash
# DNS 检查
nslookup philo.lexaverse.dev

# 访问网站
https://philo.lexaverse.dev
```

---

## 🎯 完成时间线

| 步骤 | 时间 |
|------|------|
| Git + GitHub | 3分钟 |
| GitHub Pages 配置 | 30秒 |
| DNS 配置 | 1分钟 |
| DNS 传播等待 | 10-30分钟 |
| HTTPS 证书 | 5-10分钟 |
| **总计** | **15-45分钟** |

---

**现在就开始！** 🚀

