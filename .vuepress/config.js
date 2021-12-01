const githubUrl = 'https://github.com/EasySimple';
module.exports = {
  "base": '/record-blog/',
  "title": "刘涛",
  "description": "个人博客",
  "dest": "dist",
  "head": [
    ['link', { rel: 'icon', href: "/assets/img/avatar.png" }],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    // 添加百度统计
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?324e3291a527715a870c6e1d7da28fb1";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "footer": {
      "display":true,
    },
    "copyrightText":'转载请注明出处',
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "设计模式",
        "icon": "reco-message",
        "items": [
          {
            "text": "单例模式",
            "link": "/docs/design-mode/singleton-mode"
          },
          {
            "text": "策略模式",
            "link": "/docs/design-mode/strategy-mode"
          }
        ]
      },
      {
        "text": "GitHub",
        "link": githubUrl,
        "icon": "reco-github",
      }
    ],
    "sidebar": {
      "/docs/design-mode/": [
        // "",
        "singleton-mode",
        "strategy-mode",
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      },
      "socialLinks": [     // 信息栏展示社交信息
        { icon: 'reco-github', link: githubUrl },
      ],
    },
    // "friendLink": [
    //   {
    //     "title": "vuepress-theme-reco",
    //     "desc": "A simple and beautiful vuepress Blog & Doc theme.",
    //     "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
    //     "link": "https://vuepress-theme-reco.recoluan.com"
    //   }
    // ],
    "logo": "/assets/img/avatar.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "刘涛",
    "authorAvatar": "/assets/img/avatar.png",
    "record": "转载请注明出处",
    "startYear": "2021",
    "valineConfig": {
			appId: 'kPzUder8a8LVas2B3Cf4iXEE-gzGzoHsz',// your appId
			appKey: 'CRMrTeNnzfaOlkYcjNQzeIEf', // your appKey
			showComment: false,					// 关闭评论
			placeholder: 'test placeholder',
			avatar: 'wavatar',
			requiredFields: ['nick','mail'],
			// serverUrl: ''
		  }
  },
  "markdown": {
    "lineNumbers": true
  }
}