# 🎮 Philo Drinking Game - 部署指南

完整的 GitHub Pages 部署教程，包含子域名配置。

---

## 📋 **前提条件**

- ✅ Philo 项目代码完成
- ✅ GitHub 账号（AlyciaBHZ）
- ✅ 域名 `lexaverse.dev` 已有 DNS 访问权限

---

## 🚀 **步骤 1：初始化 Git 仓库**

在 `philo` 项目目录中执行：

```bash
# 1. 初始化 Git
git init

# 2. 添加所有文件
git add .

# 3. 创建首次提交
git commit -m "Initial commit: Philo Drinking Game"
```

---

## 🌐 **步骤 2：创建 GitHub 仓库**

### 2.1 创建仓库

1. 访问：https://github.com/new
2. 填写信息：
   ```
   Repository name: philo-drinking
   Description: Interactive party card game with philosophical twists
   Public ✅
   不要勾选 "Add a README file"
   ```
3. 点击 **Create repository**

### 2.2 连接本地仓库

```bash
# 添加远程仓库
git remote add origin https://github.com/AlyciaBHZ/philo-drinking.git

# 重命名分支为 main
git branch -M main

# 推送代码
git push -u origin main
```

---

## ⚙️ **步骤 3：配置 GitHub Pages**

### 3.1 启用 GitHub Pages

1. 打开仓库：https://github.com/AlyciaBHZ/philo-drinking
2. 点击 **Settings** (设置)
3. 左侧菜单找到 **Pages**
4. **Source** 选择：**GitHub Actions**

### 3.2 触发首次部署

工作流会自动运行，或手动触发：

```bash
# 方法 1：推送代码触发
git add .
git commit -m "Configure deployment"
git push

# 方法 2：在 GitHub Actions 页面手动触发
# Actions > Deploy Philo Drinking Game > Run workflow
```

### 3.3 等待部署完成

1. 进入 **Actions** 标签
2. 查看工作流运行状态
3. 等待绿色 ✅ 完成标志（约 2-3 分钟）

**首次访问地址：**
```
https://alyciabhz.github.io/philo-drinking/
```

---

## 🌍 **步骤 4：配置子域名（两种方式）**

### 方式 A：子域名 `philo.lexaverse.dev`（推荐）

#### A1. 在项目中添加 CNAME 文件

```bash
# 在 philo/public 目录创建 CNAME 文件
echo "philo.lexaverse.dev" > public/CNAME

# 提交推送
git add public/CNAME
git commit -m "Add custom subdomain"
git push
```

#### A2. 配置 DNS 记录

登录您的域名 DNS 管理面板（Cloudflare/Namecheap/等），添加：

```
类型: CNAME
名称: philo
值: alyciabhz.github.io
TTL: Auto 或 3600
Proxy: DNS only (灰色云，如果是 Cloudflare)
```

#### A3. 在 GitHub 配置自定义域名

1. 回到 **Settings** > **Pages**
2. **Custom domain** 输入：`philo.lexaverse.dev`
3. 点击 **Save**
4. 等待 DNS 检查通过（5-30 分钟）
5. 看到 ✅ 后，勾选 **Enforce HTTPS**

**最终访问地址：**
```
https://philo.lexaverse.dev
```

---

### 方式 B：子路径 `lexaverse.dev/philo`

#### B1. 修改 Vite 配置

编辑 `vite.config.ts`：

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/philo-drinking/',  // 添加这行
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
  },
});
```

#### B2. 重新构建部署

```bash
npm run build
git add .
git commit -m "Configure base path"
git push
```

**访问地址：**
```
https://alyciabhz.github.io/philo-drinking/
```

**注意：** 要在主域名根路径访问，需要使用反向代理或子域名方式。

---

## 🔍 **步骤 5：验证部署**

### DNS 验证（子域名方式）

```powershell
# 检查 DNS 是否生效
nslookup philo.lexaverse.dev

# 应该返回：
# Name:    philo.lexaverse.dev
# Addresses: 185.199.108.153 (GitHub Pages IPs)
```

### 网站访问测试

访问并测试：
- ✅ https://philo.lexaverse.dev
- ✅ 卡片加载正常
- ✅ 游戏功能正常
- ✅ 移动端响应式
- ✅ HTTPS 证书有效

---

## 📊 **域名配置对比**

| 方式 | URL | 优点 | 缺点 |
|------|-----|------|------|
| **子域名** | `philo.lexaverse.dev` | 独立、专业、SEO 友好 | 需要 DNS 配置 |
| **子路径** | `lexaverse.dev/philo` | 无需 DNS | 需要反向代理才能在主域名下访问 |
| **GitHub 默认** | `alyciabhz.github.io/philo-drinking` | 最简单 | 不够专业 |

**推荐：** 使用子域名 `philo.lexaverse.dev`

---

## 🎯 **完整 DNS 配置示例（Cloudflare）**

假设您使用 Cloudflare 管理 `lexaverse.dev`：

| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| A | @ | 185.199.108.153 | DNS only | Auto |
| A | @ | 185.199.109.153 | DNS only | Auto |
| A | @ | 185.199.110.153 | DNS only | Auto |
| A | @ | 185.199.111.153 | DNS only | Auto |
| CNAME | www | alyciabhz.github.io | DNS only | Auto |
| **CNAME** | **philo** | **alyciabhz.github.io** | **DNS only** | **Auto** |

---

## 🔄 **后续更新流程**

修改代码后自动部署：

```bash
# 1. 修改代码
# （编辑文件）

# 2. 本地测试
npm run dev

# 3. 构建验证
npm run build

# 4. 提交推送（自动触发部署）
git add .
git commit -m "Update: game mechanics improvements"
git push
```

**自动化：** 推送到 main 分支后，GitHub Actions 自动构建部署（2-3 分钟）

---

## ❓ **常见问题**

### Q1: DNS 检查失败

**错误：** `DNS check unsuccessful`

**解决：**
1. 确认 CNAME 记录已添加
2. 等待 DNS 传播（最多 48 小时，通常 10-30 分钟）
3. 验证：`nslookup philo.lexaverse.dev`
4. Cloudflare 用户：确保 Proxy status 为 **DNS only**（灰色云）

### Q2: 页面 404 错误

**原因：**
- GitHub Pages 未启用
- 构建输出目录错误
- base 路径配置错误

**解决：**
```bash
# 检查构建输出
npm run build
ls build/  # 应该包含 index.html

# 检查 vite.config.ts 中的 base 和 outDir
```

### Q3: 样式/资源加载失败

**原因：** base 路径配置不正确

**解决：**
- 子域名方式：`base: '/'`
- 子路径方式：`base: '/philo-drinking/'`

### Q4: HTTPS 证书错误

**原因：** DNS 未完全传播或 HTTPS 未启用

**解决：**
1. 等待 DNS 完全传播
2. 确保 GitHub Pages 设置中 **Enforce HTTPS** 已勾选
3. 清除浏览器缓存重试

---

## 📝 **部署验证清单**

部署完成后，请验证：

- [ ] GitHub Actions 工作流运行成功 ✅
- [ ] 网站可以通过 `philo.lexaverse.dev` 访问
- [ ] HTTPS 正常工作（绿色锁图标）
- [ ] 所有卡片图片加载正常
- [ ] 游戏逻辑功能正常
- [ ] 移动端显示正常
- [ ] 没有控制台错误
- [ ] DNS 在全球传播（https://dnschecker.org）

---

## 🎉 **完成！**

您的 Philo Drinking Game 现在可以通过以下地址访问：

**主要地址：**
```
https://philo.lexaverse.dev
```

**备用地址：**
```
https://alyciabhz.github.io/philo-drinking/
```

---

## 🔗 **相关链接**

- **GitHub 仓库：** https://github.com/AlyciaBHZ/philo-drinking
- **主域名：** https://lexaverse.dev
- **个人作品集：** https://lexaverse.dev/projects

---

## 📚 **下一步**

1. ✅ 在主 portfolio 网站展示 Philo 项目
2. 📝 撰写项目博客文章（在 Thoughts 板块）
3. 📊 添加 Google Analytics（可选）
4. 🎨 优化 SEO（meta 标签、Open Graph）
5. 🚀 分享到社交媒体

---

**祝您部署顺利！** 🎮✨

