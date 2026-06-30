# 协诚激光官网

基于 **Astro 5 + Tailwind CSS v4** 构建的企业静态官网，部署在 Cloudflare Pages。

## 技术栈

- **框架**: Astro 5（纯静态生成，零 JS 默认）
- **样式**: Tailwind CSS v4
- **部署**: Cloudflare Pages
- **内容管理**: Astro Content Collections（Markdown + Zod 校验）

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
src/
├── layouts/           # 布局壳
│   └── BaseLayout.astro
├── components/        # 可复用组件
│   ├── SEO.astro              # 集中式 SEO 标签
│   ├── Header.astro           # 固定导航
│   ├── Footer.astro           # 页脚
│   ├── HeroBanner.astro       # 页面 Banner
│   ├── ContactForm.astro      # 联系表单
│   └── ui/                    # 基础 UI 组件
├── pages/             # 页面路由
│   ├── index.astro            # 首页
│   ├── services.astro         # 服务项目
│   ├── about.astro            # 关于我们
│   ├── contact.astro          # 联系我们
│   ├── cases.astro            # 案例列表
│   ├── cases/[slug].astro     # 案例详情
│   └── 404.astro
├── content/           # 内容管理（Markdown）
│   ├── services/              # 服务内容
│   ├── equipment/             # 设备信息
│   └── cases/                 # 案例内容
├── data/site.json     # 公司信息配置
├── utils/seo.ts       # SEO 辅助函数
└── styles/global.css  # 设计系统样式
```

## 内容维护

### 修改公司信息

编辑 `src/data/site.json`：

```json
{
  "company": {
    "name": "协诚激光",
    "phone": "138-xxxx-xxxx",
    "email": "info@example.com",
    "address": "广东省佛山市顺德区XX路XX号",
    "businessHours": "周一至周六 8:00-18:00"
  }
}
```

### 添加服务/设备/案例

在对应的 `src/content/` 目录下创建新的 `.md` 文件，按已有文件格式填写 frontmatter 即可。
构建时会自动生成对应页面。

### 替换图片

将图片放入 `public/images/` 对应子目录，并在内容文件的 `image` 字段引用路径。

## SEO

- 每页独立 title/description/keywords
- Open Graph / Twitter Card 标签
- JSON-LD 结构化数据（Organization、LocalBusiness、FAQPage、Article）
- 自动生成 sitemap.xml
- robots.txt + Cloudflare 缓存策略
- 语义化 HTML5 + 百度/Google 站长验证支持

## 联系表单

联系表单提交到 `/api/contact`（Cloudflare Pages Function），转发到企业微信 Webhook。

部署后在 Cloudflare Pages 后台设置环境变量：
- `WECOM_WEBHOOK_URL`：企业微信机器人 Webhook 地址

## 部署

详见 [START.md](./START.md)
