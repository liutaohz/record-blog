---
title: 闭包
sidebar: auto
date: 2021-11-25
tags:
 - 闭包
 - JavaScript
categories:
 -  JavaScript
---

闭包---我们经常听到这个词，那么究竟什么是闭包呢，我们来打破砂锅问到底的方式探索一下。
 # 定义
在不同的地方对它的定义相似但是略有差异
 > 在计算机科学中，闭包（Closure），是引用了自由变量的函数。这个被引用的自由变量将和这个函数一同存在，即使已经离开了创造它的环境也不例外。所以，有另一种说法认为闭包是由函数和与其相关的引用环境组合而成的实体。		---**维基百科**

 > 函数与对其状态即词法环境（lexical environment）的引用共同构成闭包（closure）。也就是说，闭包可以让你从内部函数访问外部函数作用域。在JavaScript，函数在每次创建时生成闭包。
 简言之，闭包是由函数引用其周边状态（词法环境）绑在一起形成的（封装）组合结构。在 JavaScript 中，闭包在每个函数被创建时形成。 ---**MDN**

> 函数对象可以通过作用域链相互关联起来，函数体内部的变量都可以保存在函数作用域内，这种特性在计算机科学文献中称为闭包。---**JavaScript权威指南**

> 闭包是指有权访问另一个函数作用域中的变量的函数。		---**JavaScript高级程序设计**

# 前置知识
在上述概念中，有多个词高频出现，比如：词法环境、作用域链 等。看来我们想要弄懂闭包先要把这些概念弄明白。
## 作用域
作用域就是一套规则，用于确定在何处以及如何查找变量（标识符）的规则

``` javascript
// eg1:
function foo() {
	var a = 'test';
	console.log(a); // 输出"test"
}
foo();

// eg2:
var b = 'hello';
function bar() {
	console.log(b); // 输出"hello"
}
bar();
// 函数作用域、全局作用域
```

### 作用域链
我们在查找d变量的时候，先在函数作用域1中查找，没有找到，逐层向外层作用域查找，有一个往外层查找的过程。如下图红色箭头：我们好像是顺着一条链条从下往上查找变量，这条链条，我们就称之为作用域链。
![image](/img/javascript/作用域链.jpg)

### 作用域嵌套
在还没有接触到ES6的let、const之前，只有函数作用域和全局作用域，函数作用域肯定是在全局作用域里面的，而函数作用域中又可以继续嵌套函数作用域，如上图，矩形框框作用域层层嵌套。

## 词法环境
在上面的作用域介绍中，我们将作用域定义为一套规则，这套规则来管理浏览器引擎如何在当前作用域以及嵌套的作用域中根据变量（标识符）进行变量查找。

“词法作用域是作用域的一种工作模型”，作用域有两种工作模型，在JavaScript中的词法作用域是比较主流的一种，另一种动态作用域
（比较少的语言在用）。

所谓的词法作用域就是在你写代码时将变量和块作用域写在哪里来决定，也就是
词法作用域是静态的作用域，在你书写代码时就确定了

### 变量（标识符）的查找规则
首先声明一点，JavaScript是有编译过程的。

eg:
var name = 'test'
编译器在当前作用域中声明一个变量name
运行时引擎在作用域中查找该变量，找到了name变量并为其赋值
``` javascript
console.log(name); // 输出undefined
var name = 'test';
```
在var name = 'test'的上一行输出name变量，并没有报错，输出undefined，说明输出的时候该变量已经存在了，只是没有赋值而已。
其实编译器是这样工作的，在代码执行之前从上到下的进行编译，当遇到某个用var声明的变量的时候，先检查在当前作用域下是否存在了该变量。如果存在，则忽略这个声明；如果不存在，则在当前作用域中声明该变量。
上面的这段简单的代码包含两种查找类型：
输出变量的值的时候的查找类型是RHS，找到变量为其赋值的查找类型是LHS。

这里的左侧和右侧指的是在赋值操作的左侧和右侧。也就是说，变量出现在赋值操作的左侧时进行LHS查询，出现在右侧时进行RHS查询。用一句通俗的话来讲，RHS就是取到它的源值。

注意：“赋值操作的左侧和右侧”，并不意味着只是“=”，实际上赋值操作还有好几种形式。

在作用域中查找变量都是RHS，并且查找的规则是从当前作用域开始找，如果没找到再到父级作用域中找，一层层往外找，如果在全局作用域如果还没找到的话，就会报错了：ReferenceError: 某变量 is not defined

所有的赋值操作中查找变量都是LHS。其中a=4这类赋值操作，也是会从当前作用域中查找，如果没有找到再到外层作用域中找，如果到全局变量啊这个变量，在非严格模式下会创建一个全局变量a
。不过，非常不建议这么做，因为轻则污染全局变量，重则造成内存泄漏（比如：a = 一个非常大的数组，a在全局变量中，一直用有引用，程序不会自动将其销毁）。

```javascript
// 当前词法环境(LexicalEnvironment)--window
// 环境记录器（Environment Record）  存储变量和函数声明的实际位置
// 外部环境的引用（outer Lexical Environment）:null
var d = 4;
var fn3 = function () {
  debugger
  // 当前创建词法环境(LexicalEnvironment)--fn3
  // 环境记录器（Environment Record
  // 外部环境的引用（outer Lexical Environment）:window   ↑
  var c = 3;
  var fn2 = function () {
    // 当前词法环境(LexicalEnvironment)--fn2
    // 环境记录器（Environment Record
    // 外部环境的引用（outer Lexical Environment）:fn3  ↑
    var b = 2;
    var fn1= function () {
      // 当前词法环境(LexicalEnvironment)--fn1
      // 环境记录器（Environment Record
      // 外部环境的引用（outer Lexical Environment）:fn2  ↑
      var a = 1;
      console.log(d);
      // console.log(test);
      return d;
    }
    return fn1();
  }
  return fn2();
}
console.log('result:',fn3())
```
## javascript执行过程
这里大致说一下JavaScript执行过程。
![image](/img/javascript/JavaScript_Process.png)

TODO
- javascript 执行过程
- 闭包调试
- 闭包的优缺点
- 闭包的应用