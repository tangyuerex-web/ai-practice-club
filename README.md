# AI Practice Club 招新互动网页

这是一个完全静态的 GitHub Pages 网站，不需要服务器、数据库或安装任何开发工具。

## 已配置的信息

- 社团微信号：`1120091123`
- 微信群二维码：`assets/wechat-qr.jpg`
- 默认语言：英文；网页右上角可切换为完整中文界面
- 判断小游戏：10 题题库，每次随机抽取 2 道且不重复
- 招新年份：2026

> 报名表的姓名、年级、微信号只保存在填写者当前浏览器的本地存储中，不会发送给社长。真正的报名动作是提交后扫码进入微信群。这是纯静态网站的正常限制，也避免了虚假的“已上传”提示。

## 方法 A：直接用 GitHub 网页上传（推荐）

### 第 1 步：解压网站文件

1. 下载 `AI-Practice-Club-GitHub-Pages.zip`。
2. 在 Windows 中右键压缩包，选择“全部解压”。
3. 打开解压后的文件夹，确认第一层能直接看到：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `assets` 文件夹
   - `README.md`

### 第 2 步：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com/)。
2. 点击右上角 `+`，选择 **New repository**。
3. Repository name 填写：`ai-practice-club`。
4. 选择 **Public**。GitHub Free 的 Pages 使用 Public 最简单。
5. 不需要勾选 “Add a README file”，然后点击 **Create repository**。

### 第 3 步：上传网页文件

1. 在新仓库页面点击 **uploading an existing file**；如果没看到，点击 **Add file → Upload files**。
2. 把解压文件夹里面的全部内容拖进上传框。
3. 特别检查：`index.html` 必须位于仓库最外层，不能再套一层文件夹。
4. 页面底部 Commit message 可以写：`Publish club recruitment website`。
5. 点击 **Commit changes**。

### 第 4 步：开启 GitHub Pages

1. 进入仓库上方的 **Settings**。
2. 左侧菜单点击 **Pages**。
3. 在 **Build and deployment** 下：
   - Source 选择 **Deploy from a branch**
   - Branch 选择 **main**
   - Folder 选择 **/ (root)**
4. 点击 **Save**。
5. 等待约 1–3 分钟，然后刷新 Pages 设置页。

你的网址通常是：

```text
https://你的GitHub用户名.github.io/ai-practice-club/
```

例如用户名是 `rex123`，网址就是：

```text
https://rex123.github.io/ai-practice-club/
```

### 第 5 步：手机检查

1. 在手机浏览器打开上面的网址。
2. 从 START 开始完整玩一遍。
3. 检查画像下载、分享按钮、报名提交和微信群二维码。
4. 把最终网址做成海报二维码；不要把压缩包或 GitHub 仓库网址做成二维码。

## 以后如何更新

1. 在电脑上修改相应文件。
2. 回到 GitHub 仓库，点击 **Add file → Upload files**。
3. 重新上传同名文件并提交，GitHub 会提示替换。
4. 等待约 1–3 分钟，刷新网页。若仍显示旧版，可使用无痕窗口或强制刷新。

## 最常改的两个地方

### 更换微信号

打开 `app.js`，在最上方找到：

```js
const CLUB_WECHAT = "1120091123";
```

只修改引号中的数字或微信号。

### 更换微信群二维码

准备一张新的 JPG 图片，把它命名为：

```text
wechat-qr.jpg
```

然后替换 `assets/wechat-qr.jpg`。保持文件名完全一致，网页代码不用修改。

## 常见问题

### 打开网址显示 404

- 确认 Pages 的分支是 `main`，文件夹是 `/ (root)`。
- 确认 `index.html` 在仓库最外层。
- 刚开启 Pages 时等待 1–3 分钟再刷新。

### 页面有文字，但二维码不显示

- 确认仓库中存在 `assets/wechat-qr.jpg`。
- 注意 GitHub 区分大小写，`Assets` 和 `assets` 不是同一个文件夹。

### 报名信息在哪里查看

这个版本没有后端，因此不能在社长电脑统一查看报名表数据。学生提交后会看到二维码并扫码进群。若以后需要集中收集报名信息，可以把按钮改为腾讯文档、问卷星或金数据链接，同时继续保留当前小游戏。

### 是否需要购买域名

不需要。GitHub Pages 会免费提供 `github.io` 网址。以后想使用自己的域名，也可以在 Pages 设置中添加。
