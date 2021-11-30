# record-blog简介
个人博客:记录 经验总结、学习笔记、日常生活...

[博客地址](https://easysimple.github.io/record-blog/)

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