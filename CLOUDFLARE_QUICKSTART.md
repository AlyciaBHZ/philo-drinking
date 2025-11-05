# ⚡ Cloudflare Pages 5分钟快速部署

## 🎯 **最快部署方式**

### 步骤 1：访问 Cloudflare（1分钟）

```
https://dash.cloudflare.com/
```

1. 登录 Cloudflare 账号
2. 左侧菜单 → **Workers & Pages**
3. 点击 **Create application**
4. 选择 **Pages** 标签
5. 点击 **Connect to Git**

---

### 步骤 2：连接 GitHub（1分钟）

1. 选择 **GitHub**
2. 授权 Cloudflare（如果首次使用）
3. 选择 **philo-drinking** 仓库
4. 点击 **Begin setup**

---

### 步骤 3：配置构建（30秒）

**复制粘贴以下配置：**

```
Project name: philo-drinking
Production branch: main

Build settings:
├─ Framework preset: Vite
├─ Build command: npm run build
├─ Build output directory: build
└─ Root directory: (留空)

Environment variables:
└─ NODE_VERSION = 18
```

点击 **Save and Deploy**

---

### 步骤 4：等待部署（1分钟）

- 🔨 正在构建...
- 📦 正在部署...
- ✅ 部署完成！

**您的网站：**
```
https://philo-drinking.pages.dev
```

---

### 步骤 5：添加自定义域名（1分钟）

1. 项目页面 → **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入：`philo.lexaverse.dev`
4. 点击 **Continue** → **Activate domain**
5. ✅ 自动配置完成！

**最终网址：**
```
https://philo.lexaverse.dev
```

---

## 🎉 **完成！**

总用时：**5 分钟**

---

## 🔄 **后续更新**

每次更新代码后：

```bash
git add .
git commit -m "Update game"
git push
```

⚡ **30-60秒后自动部署完成！**

---

## 📊 **对比**

| 方式 | 部署时间 | 更新速度 | CDN |
|------|---------|---------|-----|
| **GitHub Pages** | 2-3 分钟 | 2-3 分钟 | 标准 |
| **Cloudflare Pages** | 30-60 秒 ⚡ | 30-60 秒 ⚡ | 优化 ✨ |

---

## 🆘 **遇到问题？**

参考完整指南：`CLOUDFLARE_SETUP.md`

---

**立即开始：** https://dash.cloudflare.com/ 🚀


