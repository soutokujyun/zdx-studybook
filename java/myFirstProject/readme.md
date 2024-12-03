# 记录

## 类与对象
### 子类：子类通过关键字extends来声明继承关系
```
class 子类名 extends 父类名 {}
```
### super()使用
1. super()必须放在子类的构造方法中，且必须放在第一行。
2. super()调用父类的构造方法。
3. super关键字可以用于访问父类的成员变量、方法、构造方法。
```
public class Parent {
  private String name;
  private String age = 12;

  public Parent() {
    System.out.println("Parent类的无参构造方法被调用");
  }
  public Parent(String name) {
    this.name = name;
    System.out.println("Parent类的有参构造方法被调用，name：" + name);
  }
}

public class Child extends Parent {
  public Child() {
    super(); // 调用父类的无参构造方法
    System.out.println("Child类的无参构造方法被调用");
  }
  public Child(String name) {
    super(name); // 调用父类的有参构造方法
    System.out.println("age：" + super.age); // 访问父类的成员变量
    System.out.println("Child类的有参构造方法被调用");
  }
}

public class Main {
  public static void main(String[] args) {
    Child child = new Child();
    Child child = new Child("张三");
  }
}
```

## JAVA 继承
继承就是子类继承父类的特征和行为
### 继承特性
1. 子类拥有父类非 private 的属性、方法
2. 子类可以拥有自己的属性和方法，即子类可以对父类进行扩展
3. 子类可以用自己的方式实现父类的方法



## 包 - package
1. 包采用逆域名的命名方式，如：com.alibaba.taobao.customer.data
2. 标准格式：域名后缀.组织机构名.项目名[.模块名].包的职能


## 访问修饰符
用于控制类、成员变量、方法的访问权限
1. public：公共的，所有类都可以访问
2. default：包访问，只能在同一个包内访问
3. protected：受保护的，只能在本包和子类中访问
4. private：私有的，只能在本类中访问

## 面向对象三大特征
### 封装
1. 将细节隐藏起来，只暴露出接口
2. 利用封装，减少代码重复，提高代码的复用性
3. 利用对象与方法是实现封装的直接途径
### 继承
1. 子类可以继承父类的属性和方法，并可以重写父类的方法

| 修饰词       | 本类 | 同一个包的类 | 继承类 | 其他类 |
|-----------|----|--------|-----|-----|
| private   | √  | ×      | ×   | ×   |
| default   | √  | √      | ×   | ×   |
| protected | √  | √      | √   | ×   |
| public    | √  | √      | √   | √   |

### 多态
1. 同一个行为具有多个不同表现形式或形态
2. 实现多态的关键是接口
   - 接口是一个抽象的类型，只提供方法的定义
   - 实现类是一个接口的具体实现，要实现每个接口方法的功能

## I/O 输入输出流
