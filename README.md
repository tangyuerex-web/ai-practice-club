# Personal Site Builder

一个适合 GitHub Pages 的纯静态个人网页生成器。

核心结构：

- `index.html`：四步式可视化 Builder 和实时预览
- `profile.html?id=AB12`：所有用户共用的个人网页模板入口
- `styles.css`：Builder、自动页面风格和响应式样式
- `app.js`：表单、中英文切换、页面风格、唯一 ID、10 秒生成进度和发布逻辑
- `profile.js`：根据 URL 中的 ID 获取数据、动态渲染并切换界面语言
- `config.js`：Supabase 项目地址和 publishable key
- `supabase.sql`：数据库表和 Row Level Security 规则

## 1. 创建 Supabase 数据库

1. 打开 [Supabase](https://supabase.com/) 并创建一个免费项目。
2. 进入项目的 **SQL Editor**。
3. 打开本项目的 `supabase.sql`，复制全部内容并运行。
4. 进入 **Project Settings → API**。
5. 记录以下两项：
   - Project URL
   - Publishable key（旧项目也可以使用 legacy anon key）

不要把 `service_role` key 放进网页。

如果发布时出现 `PGRST205` 或 “Could not find the table public.profiles”，说明当前 Supabase 项目还没有建表。请确认 `config.js` 指向同一个项目，然后在该项目的 SQL Editor 中完整运行 `supabase.sql`，刷新 Builder 后再次发布。

## 2. 填写网页配置

打开 `config.js`：

```js
window.PROFILE_BUILDER_CONFIG = {
  SUPABASE_URL: "https://你的项目.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "你的 publishable key"
};
```

Publishable key 可以在前端使用；数据库权限由 `supabase.sql` 中的 RLS 规则控制。当前规则只允许匿名用户创建和读取公开个人网页，不允许修改或删除。绝对不要填写 `service_role` key。

## 3. 本地检查

不要直接双击 HTML 文件。建议在此目录运行：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/
```

如果还没填写 Supabase 配置，系统会使用 `localStorage` 演示完整流程，但生成的链接只能在当前设备打开。

## 4. 上传到现有 GitHub Pages

如果你的仓库是 `ai-practice-club`，建议把整个目录放到：

```text
ai-practice-club/profile-builder/
```

然后提交并推送：

```bash
git add profile-builder
git commit -m "Add personal site builder"
git push
```

如果仓库已经启用 GitHub Pages，发布地址会是：

```text
https://tangyuerex-web.github.io/ai-practice-club/profile-builder/
```

生成后的个人链接示例：

```text
https://tangyuerex-web.github.io/ai-practice-club/profile-builder/profile.html?id=AB12
```

如果还没启用 Pages：进入仓库 **Settings → Pages**，在 **Build and deployment** 中选择 **Deploy from a branch**，再选择 `main` 和 `/root`。

## 5. 跨设备验证

1. 在 Builder 填写内容并点击 **Publish My Website**。
2. 等待约 10 秒，复制生成的网址。
3. 用手机流量或另一台设备打开该网址。
4. 确认姓名、标题、颜色、页面风格和互动功能一致。

## 中英文切换

- Builder 和最终个人网页右上角都提供 `EN / 中文` 切换。
- 每次新打开页面时默认显示英文，不读取或保存上一次语言选择。
- 切换到中文后，导航、字段、预览、生成进度、结果弹窗、错误提示和个人网页界面都会完整切换。
- 用户自己填写的姓名、绰号、介绍和补充信息不会被自动翻译；只有尚未修改的示例内容会跟随语言切换。

## 分步创作流程

Builder 不再展示一张很长的表单，而是分成四个连续画面：

1. 填写姓名和绰号。
2. 填写一句介绍并选择主题颜色。
3. 填写必填的补充信息，并选择“触碰星星”或“触碰彩带”效果。
4. 检查概要并发布网页。

顶部进度条、步骤圆点和前后翻页按钮会显示当前位置；也可以拖动四段式分页滑杆，或在手机端左右滑动页面。切换页面采用完整的横向滑屏动画。

填写的姓名、绰号、介绍、颜色、互动方式、补充信息和当前页码都会自动保存为浏览器草稿。前后翻页不会清空内容，意外刷新或关闭后重新打开也会恢复；发布到 Supabase 的跨设备数据逻辑保持不变。

## 生成后的个人主页

- 第一页展示姓名、绰号和个人介绍，并通过“Know more about me”进入下一页。
- 第二页是全屏互动空间：中央显示姓名的首个字母，互动提示位于右侧；点击后显示补充信息。
- 使用者选择“星星”或“彩带”后，第二页会出现对应静态装饰，触碰页面时也会释放同类图样。
- 使用者选择的主题色会同步应用到两页背景强调、字母标识、按钮、滑杆与互动图样。
- 支持底部分页滑杆、分页按钮和手机左右滑动。
- 个人主页不展示社团主站品牌或模板说明，更像使用者自己的独立主页。

## 自动页面风格

- `orbit`：浅色圆形轨道视觉
- `blueprint`：深色网格开发者视觉
- `studio`：高对比双栏海报视觉

发布时系统会自动选择一种页面风格，并在同一浏览器连续发布时避免立即重复。风格信息会保存到数据库，因此同一链接每次打开都会保持一致。

## 上线前注意

- 当前是公开生成器，匿名用户可以创建公开页面。正式大规模使用前，建议在 Supabase 中增加验证码、频率限制或定期清理旧记录。
- 四位 ID 使用排除了 `0/O/1/I` 的字符集，共有 1,048,576 种组合；数据库主键会阻止重复，前端遇到冲突会自动重新生成。
- 不要在个人介绍或补充信息中填写手机号、住址等敏感信息。
