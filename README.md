<!--
 * @Author: your name
 * @Date: 2021-11-25 16:34:50
 * @LastEditTime: 2021-12-02 00:17:52
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /netease/github/record-blog/README.md
-->
# record-blog简介
个人博客:记录 经验总结、学习笔记、日常生活...
[博客地址](https://easysimple.github.io/record-blog/)
让搭建博客部署博客更加简单，你可以更专注于写博客内容。

## 命令
- npm i (加载依赖)
- npm run dev (本地运行，启动博客)
- npm run build (打包)
- npm run deploy （部署到github page上）

## 博客搭建使用技术
- vuepress
- vuepress-theme-reco@1.6.6
- gh-page

## 自定义修改添加功能点

- 添加页面访问量显示，使用Valine、leancloud
- 添加页面PV埋点统计，使用百度埋点

## 注意
如果想直接使用这个项目模板，你需要把“/record-blog/.vuepress/config.js”中valineConfig换成自己的信息。
同样的百度埋点信息在“/record-blog/.vuepress/enhanceApp.js”中，也需要替换本人的百度统计代码