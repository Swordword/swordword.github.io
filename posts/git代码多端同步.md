---
title: Node.js和Webhooks同步项目
date: 2020-06-28 22:58:19
description: 'git 多端代码同步'
tag: Git、Node、Webhook
---

1. **设置Webhook**

   登录github导航到待监控的存储库，选中设置里面的webhook，添加新的webhook

   * 在**payLoad URL**中，填写即将编写的Node.js服务器地址+端口
   * 将内容类型设为 `application/json`
   * 在Secret中，输入该webhook的密码，之后nodeJS会使用它验证hook
   * 选中触发事件的类型，通常选择推送事件，
   * 选择**活动**复选框

   ![](http://img.massivejohn.com/webhook.png)

2. **将存储库克隆到服务器**

3. **创建Webhook脚本**

   * `mkdir ~/NodeWebhooks&& cd ~/NodeWebhooks && touch webhook.js `

   * ```javascript
     const secret = "your_secret_here";
     const repo = "~/your_repo_path_here/";
     const http = require('http');
     const crypto = require('crypto');
     const exec = require('child_process').exec;
     http.createServer(function (req, res) {
         req.on('data', function(chunk) {
             let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
             if (req.headers['x-hub-signature'] == sig) {
                 exec('cd ' + repo + ' && git pull && pm2 restart webhook');
             }
         });
         res.end();
     }).listen(8002);
     ```

4. **测试Webhook**

   1. `node webhook.js`
   2. 返回[Github.com](https://github.com/)上,找到菜单中的“ **Webhooks** ”，找到**Recent Exiveries**，点击三个点 单击`Redeliver`重复测试请求

5. **push测试成功**

   需要等一段时间,使用pm2持续集成