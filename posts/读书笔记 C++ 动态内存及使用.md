---
title: 读书笔记:C++ 动态内存与智能指针
date: 2021-03-25 13:39:08
description: 即使在学C++之前，对它内存的double free和早泄也早有耳闻。。。
tag: Cpp
---

### 内存概述

C++内存大致分成三种：静态内存、栈内存和堆内存(又叫内存空间)。静态内存用于保存在整个函数运行期间都一直存在的对象，如局部static对象，类static数据成员。栈内存保存的是在程序运行中存在一段时间的对象，如函数中的非 static 对象。堆内存用来存储动态分配的对象，及在程序运行时(通过new这样的代码)分配的对象，因为动态对象是我们控制生成的，所以我们必须显示的销毁他们

### 动态内存与智能指针

`new` 运算符在动态内存中为对象分配空间并返回一个指向该对象的指针；`delete` 运算符接受 `new` 出来的指针，销毁该对象，并释放与之关联的内存。

想要在正确的时间释放内存是很困难的，并且也没发现好的调试内存泄漏的方法，C++ 提供了两种智能指针管理动态对象，**`shared_ptr` 允许多个指针指向同一个对象**，**`unique_ptr` 每个指针和一个对象绑定**。

#### 智能指针 `shared_ptr`

1. 是个模版，所以也需要尖括号指明类型。`shared_ptr<int> pi`

   定义和改变`shared_ptr` 的其他方法

   | 定义                                           | 说明                           |
   | ---------------------------------------------- | ------------------------------ |
   | shared_ptr<T>  p(q) 、shared_ptr<T>  p(u)      | p管理内置指针q所指向的对象     |
   | shared_ptr<T>  p(q, d)、shared_ptr<T>  p(q, d) | 使用可调用对象代替默认的delete |

   

2. 智能指针的使用与普通指针类似。 `if(pi && pi->empty()) *pi = 11;`

3. `pi.get()`返回 pi 保存的指针，`swap(p,q)` 交换p和q的指针

4. `make_shared<T>(arg)` 返回一个 shared_ptr，指向类型为T的对象，其中arg是该对象初始化的参数

   如 `shared_ptr<int> p = make_shared<int>(42);` `shared_ptr<string> q = make_shared<string>(10,'9');`

   `make_shared<T>p(q)` p 是 shared_ptr q 的拷贝，该操作会递增 q 中的计数器，q 的指针必须能转换为T*

5. 智能指针相较于动态内存的优势在于当指向该对象的最后一个 shared_ptr 被销毁时（ shared_ptr 使用的计数器由1转为0），shared_ptr会自动销毁该对象(通过类中的成员函数：析构函数)。其中判断是不是最后一个智能指针是通过shared_ptr关联的**引用计数**完成的。

6. 引用计数的计算方式

   查看当前智能指针的计数器可以通过 `pi.use_count()`方法，

   或者根据自己的经验。当我们试图拷贝一个shared_ptr 时，计数器就会递增，反之则递减。智能指针常见的拷贝情形如下

   * 用一个新 shared_ptr 初始化shared_ptr
   * 将 shared_ptr 作为参数传递给一个函数
   * 将 shared_ptr 作为函数的返回值

为什么要使用动态内存？

1. 程序不知道自己未来需要使用多少对象，如之前使用的容器类
2. 程序不知道所需对象的准确类型
3. 程序需要在多个对象见共享数据，即多个对象共享相同的状态，a销毁了，b紧连着也会被销毁

#### 通过`new`和`delete`直接管理内存

在自由空间分配的内存是**无名**的，`new`返回一个指向该对象的指针

**`new`初始化：**

1. 默认初始化	`string *ps = new string()`
2. 传统的构造方式（使用括号）  `string *ps = new string(10 , '9')`
3. 列表初始化  `vector<int> *v = new vector<int>{0,1,2,3}`
4. 对动态分配的值进行初始化    `string *ps = new string()`

**动态分配的 const 对象：**

`const int *pci = new const int(1024)` 必须初始化返回一个指向const的指针

**防止内存耗尽抛出的异常：**

如果程序用光了可用的自由空间，`new` 默认会抛出类型为`bad_alloc`的异常，可以通过使用**定位`new`**的方式组织抛出异常

`int *p1 = new int` 	// 分配失败，抛出`bad_alloc`

`int *p1 = new (nothrow) int` // 分配失败，返回一个空指针

**释放动态内存**：

传递给`delete` 通过`new`获得的指针：销毁给定的指针指向的对象；释放对应的内存，**有内置指针new管理的动态内存在显示释放之前都会一直存在**

**动态内存管理常见问题：**

1. 忘记`delete`内存，导致**内存泄漏**

2. 使用已经释放过的内存。可以通过释放内存后将指针置为空来解决

   但是只能解决单一的指针，若多个指针指向同一个对象，就会导致别的指针无效

   ```c++
   int *p(new int(42));	// p指向动态内存
   auto q = p;		// p和q指向相同的内存
   delete p;		// p和q均无效
   p = nullptr;	// 置空p，但是！q依然是一个指针，却无效了
   ```

   

3. 对同一块内存释放两次。

**空悬指针：**指向一块曾经保存数据对象但是现在已经无效的内存的指针

当`delete`掉一个指针后，指针值就变为无效。但是很多机器仍然保存着（已经释放了的）动态内存的地址。导致 这个指针可能依然保存之前的值，但是它之后会变成什么样子已经不是你自己能控制的了，就像你把房子卖给了别人，下次再到这个地址看看，可能还是你的房子，也可能已经被改成公共厕所了。这种指针就叫做空悬指针

#### `shared_ptr`和`new`结合使用

接受指针参数的智能指针构造函数是explicit的（无法将内置指针隐式转换为一个智能指针），因此必须直接初始化一个智能指针

`shared_ptr<int> p1 = new int(1024)` 	// 错误 打算将 `new` 内置指针转换为智能指针

`shared_ptr<int> p1(new int(1024))`

默认情况下，一个用来初始化智能指针的普通指针必须指向动态内存，因为智能指针默认使用delete释放它所关联的对象。但是，如果我们**提供自己的delete操作**，我们**可以将智能指针绑定到一个指向其他类型的资源的指针上**

**不要混合使用普通指针和智能指针**

```c++
void process(shared_ptr<int> ptr){
} // ptr 离开作用域，被销毁

int *x(new int(1024)); // x 是一个普通指针，而不是一个智能指针
process(x);	// error shared_ptr 是explicit的
process(shared_ptr<int>(x))	// 合法！但是 x 的内存会被释放，导致下一行的j获取不到值
int j = *x;
```

**不要使用get函数返回值初始化另一个智能指针或为指针指针赋值：**

智能指针的`get`函数返回一个内置指针，指向智能指针管理的对象。

`get` 用来将指针的访问权限传递给代码，即只有在确保代码不会delete指针时，才能使用`get`

```cpp
shared_ptr<int> p(new int(42));
int *q = p.get();
{
	shared_ptr<int>(q);
} // 程序结束，q被销毁，指向的内存被释放，p为空悬指针
int foo = *p;
```

**shared_ptr 其他操作：**

`shared_ptr.reset()` 将新指针赋予原先智能指针

`shared_ptr.unique()` 检查自己是不是当前对象仅有的用户，即计数器是1

#### 使用智能指针优化程序异常

异常发生后，析构函数可能不会正常运行，使用智能指针，即使程序块提前结束，也会将多余的内存释放。

**智能指针使用规范：**

* 不使用相同的内置指针初始化（或reset）多个智能指针
* 不delete get() 返回的指针
* 不使用get() 初始化或reset 另一个智能指针
* 使用 get() 返回的指针，当最后一个智能指针销毁时，内置指针成为悬空指针
* 当智能指针管理的不是new分配的内存，需要传递给一个删除器

#### unique_ptr使用

`unique_ptr` 与 给定对象一一对应， 因此不支持普通的拷贝和赋值操作

通过绑定到一个`new`返回的指针初始化， 没有类似 make_shared 的方法

可以通过调用`release` 或` reset` 将指针的所有权从 一个 `unique_ptr` 转移给另一个 `unique_ptr`

```cpp
unique_ptr<string> p1 (new string("Hello"));
unique_ptr<string> p2(p1.release()); // 将所有权p1转向p2， release将 p1 置为空
unique_ptr<string> p3(new string("world"))
p2.reset(p3.release()) // reset 释放了原来 p2 指向的内存
```

`release`返回当前保存的指针并将其置为空。

`reset`接受一个可选的指针参数，令`uniqeu_ptr`重新指向给定的指针。

**可以拷贝或赋值一个将要被销毁的unique_ptr**. 例如从函数中返回一个`unique_ptr`

```c++
unique_ptr<int> clone(int p){
  return unique_ptr<int>(new int(p))
}
```

**向 unique_ptr 传递删除器**

重载一个 unique_ptr 的删除器会影响到 unique_ptr类型并且决定如何构造该类型的对象，删除器必须在**尖括号中指向类型之后提供删除器类型**

`unique_ptr<objT,delT p(new objT, fcn)>;`

#### weak_ptr

`weak_ptr` 不控制所指向对象生存期，指向一个`shared_ptr`管理的对象

| API               | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| weak_ptr<T> w     | 空 weak_ptr，指向类型为T的对象                               |
| weak_ptr<T> w(sp) | 与shared_ptr sp指向相同对象的weak_ptr. T可以转换为sp指向的类型 |
| w=p               | p可以是一个shared_ptr 或者 weak_ptr，w与p共享家对象          |
| w.reset()         | 将w置为空                                                    |
| w.use_count()     | 与w共享的shared_ptr 的计数器数量                             |
| w.expired()       | 若 w.use_count() 为0， 返回true。反之返回 false              |
| w.lock()          | 若 expired 为 true，返回一个空的shared_ptr,否则返回指向w的对象的 shared_ptr |

weak_ptr 指向的对象可能不存在，所以必须在使用前使用`wp.lock()`判断 weak_ptr 指向的对象是否存在

`if(shared_ptr<int> np = wp.lock()){}	// 如果np不为空则条件成立，wp对应了一个shared_ptr对象`

| a    | b    | c    |
| ---- | ---- | ---- |
|      |      |      |







[未完待续...]							

