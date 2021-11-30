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

``` js
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
<!-- ![image](/assets/img/javascript/scope_chain.jpg) -->
<img :src="$withBase('/assets/img/javascript/scope_chain.jpg')" alt="mixureSecure">

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

## 可执行代码块及其执行上下文
### 可执行代码块:
- **函数代码块（Function code）**:函数执行上下文 — 每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建
- **全局代码块（Global code）**:全局执行上下文 — 这是基础上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象（浏览器的情况下），并且设置 this 的值等于这个全局对象。一个程序中只会有一个全局执行上下文。
- **eval代码块（Eval code）**：Eval 执行上下文 — 执行在 eval 内部的代码也会有它属于自己的执行上下文，除非你想搞黑魔法，不然不要轻易使用它

### 执行上下文分为两个阶段：
- **创建阶段**
- **执行阶段**

我们主要讨论创建阶段，执行阶段的主要工作就是分配变量.

执行上下文的创建阶段主要解决以下三点:
- **1.决定 this 的指向**
- **2.创建词法环境(LexicalEnvironment)**
- **3.创建变量环境(VariableEnvironment)**

#### 1.决定this指向
我们应该知道this的指向是在代码执行阶段确定的，所谓的『代码执行阶段』正是『执行上下文的创建阶段』。

::: tip
this是怎么被绑定的呢？
在创建可执行上下文的时候，根据代码的执行条件，来判断分别进行默认绑定、隐式绑定、显示绑定等。
:::

#### 2.创建词法环境(LexicalEnvironment)
- 全局环境：全局环境的外部环境引用是 null，它拥有内建的 Object/Array/等、在环境记录器内的原型函数（关联全局对象，比如 window 对象）还有任何用户定义的全局变量，并且 this的值指向全局对象。
- 模块环境：包含模块顶级声明的绑定以及模块显式导入的绑定。 模块环境的外部环境是全局环境。
- 函数环境：函数内部用户定义的变量存储在环境记录器中，外部引用既可以是其它函数的内部词法环境，也可以是全局词法环境

环境记录器包含了环境记录器（Environment Record）和外部环境的引用（outer Lexical Environment）：
- **环境记录器（Environment Record）**：是存储变量和函数声明的实际位置。包含了
  - **声明式环境记录器（DecarativeEnvironmentRecord）**：范围包含函数定义，变量声明，try...catch等，此类型对应其范围内包含的声明定义的标识符集
  - **对象式环境记录器（ObjectEnvironmentRecord）**：由程序级别的（Program）对象、声明、with语句等创建，与称为其绑定对象的对象相关联，此类型对应于其绑定对象的属性名称的字符串标识符名称集
- **外部环境的引用（outer Lexical Environment）**：指它可以访问其父级词法环境（即作用域）

::: warning
作用域链是怎么形成的？
可执行上下文中的词法环境中含有外部词法环境的引用，我们可以通过这个引用获取外部词法环境的变量、声明等，这些引用串联起来一直指向全局的词法环境，因此形成了作用域链。
:::

#### 3.创建变量环境(VariableEnvironment)
变量环境的定义在es5标准和es6标准是略有不同的，我们采用es6的标准，变量环境也是一个词法环境，但不同的是词法环境被用来存储函数声明和变量（let 和 const）绑定，而变量环境只用来存储 var 变量绑定


```js
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
这里大致说一下JavaScript执行过程。后面有时间整理一篇JavaScript运行过程的文章。
<img :src="$withBase('/assets/img/javascript/JavaScript_Process.png')" alt="mixureSecure">
<!-- ![image](/assets/img/javascript/JavaScript_Process.png) -->

## 闭包的应用
闭包在前端开发中又哪些应用呢？
### 构造方法传参来访问私有变量
可以通过构造方法传参来访问私有变量
```js
function Desk(){
    var str="";//局部变量str,默认值为""
    this.getStr=function(){
        return str;
    }
    this.setStr=function(value){
        str=value;
    };
}
var desk=new Desk();
//为构造函数的局部变量写入值。
desk.setStr("hello workd");
//获取构造函数的局部变量
console.log(desk.getStr());//hello workd
```
### 模拟块级作用域
if(){}for(){}等没有作用域，所以在其块内声明的变量，在外部是可以使用的.
```js
//javaScript没有块级作用域的概念
function fn(num){
    for(var i=0;i<num;i++){}
    console.log(i);//在for外部i不会失败
}
fn(2);
if(true){
    var a=13;
}
console.log(a);//在if定义的变量在外部可以访问
```
通过匿名自执行函数可以模拟块级作用域
```js
(function(){
    //i在外部就不认识啦
    for(var i=0;i<count;i++){}
})();
console.log(i);//报错，无法访问
```
由于外部无法访问自执行函数内的变量，因此在函数执行完后会立刻被销毁，在外部无法访问。从而可有效避免在多人开发时由于全局变量过多而造成的命名冲突问题。另外由于作用域链的机制，局部变量要比全局变量的访问速度更快，可以提升程序的运行速度！
### 封装功能模块
如常见的 export XXX模块
### 函数柯里化
- 延伸优化递归（尾部调用）
- 实现性能优化，避免重复计算，对结果进行缓存
::: warning
注意this的指向
:::

## 闭包的优缺点
闭包有哪些优缺点呢？
### 优点
- 避免变量污染
- 可以牺牲空间换取时间加快计算速度
- 功能模块化

### 缺点
- 使用不当会很容易造成内存泄露
- 常驻内存，增加内存使用量