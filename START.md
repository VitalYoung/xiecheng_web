# 部署到 Cloudflare Pages

## 前置准备

- GitHub / GitLab 账号
- Cloudflare 账号（注册地址：https://dash.cloudflare.com/sign-up）
- 域名（可选，Cloudflare 会提供默认的 `*.pages.dev` 域名）

## 步骤一：推送代码到 GitHub

```bash
cd /Users/yang/Workspace/myweb/xiecheng

# 初始化 Git 仓库
git init
git add .
git commit -m "feat: 协诚激光官网初始化"

# 创建 GitHub 仓库后推送
git remote add origin https://github.com/你的用户名/xiecheng-laser.git
git branch -M main
git push -u origin main
```

## 步骤二：Cloudflare Pages 创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧菜单选择 **Workers 和 Pages** → **Pages**
3. 点击 **连接到 Git**
4. 授权并选择你的 GitHub 仓库
5. 配置构建设置：

| 配置项 | 值 |
|--------|-----|
| 框架预设 | **Astro** |
| 构建命令 | `npm run build` |
| 构建输出目录 | `dist` |
| Node.js 版本 | 22.x |

6. 点击 **保存并部署**

## 步骤三：设置环境变量

部署完成后，在项目设置中添加环境变量：

1. 进入项目 → **Settings** → **Environment variables**
2. 添加变量：

| 变量名 | 说明 |
|--------|------|
| `WECOM_WEBHOOK_URL` | 企业微信机器人 Webhook 地址（用于接收联系表单通知） |

### 如何获取企业微信 Webhook 地址？

1. 打开企业微信，进入需要接收通知的群聊
2. 群设置 → 群机器人 → 添加机器人
3. 复制 Webhook 地址（格式：`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx`）

如果不使用企业微信，可以修改 `functions/api/contact.ts` 改用其他通知方式（邮件、钉钉等）。

## 步骤四：绑定自定义域名（可选）

1. 项目 → **自定义域** → **设置自定义域**
2. 输入你的域名（如 `www.xiechenglaser.com`）
3. 按照提示配置 DNS 记录

如果域名在 Cloudflare 管理，DNS 会自动配置。如果在其他平台（如阿里云、腾讯云），需要手动添加 CNAME 记录。

## 步骤五：上线前检查清单

在 `src/data/site.json` 中填入真实信息：
- [ ] 公司名称、电话、邮箱
- [ ] 公司地址
- [ ] 营业时间

站点内容：
- [ ] 替换 `public/images/` 下的示例图片为真实照片
- [ ] 确认服务/设备/案例的 Markdown 内容准确
- [ ] 如需百度收录，在 `site.json` 的 `seo.baiduVerification` 填入百度站长验证码

SEO 验证：
- [ ] 访问 `https://你的域名/sitemap-index.xml` 确认 sitemap 正常
- [ ] 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证结构化数据
- [ ] 提交 sitemap 到 Google Search Console 和百度站长平台

## 日常更新

每次修改代码或内容后：

```bash
git add .
git commit -m "描述你的修改"
git push
```

Cloudflare Pages 会自动检测到推送并重新部署，无需手动操作。

## 本地预览生产构建

```bash
npm run build
npm run preview
```

在浏览器打开 `http://localhost:4321` 查看最终的静态文件效果。
