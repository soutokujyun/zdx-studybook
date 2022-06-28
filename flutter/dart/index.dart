class Person {
  // 类成员
  String name;
  // 私有类成员
  int _age;
  // final修饰的属性，不能被外部重新赋值，只可读，不可写
  final String gender;

  // 构造函数
  Person(this.name, this._age, this.gender);

  // 间接调用私有属性
  void setAge(age) {
    _age = age;
    print(_age);
  }
  // 间接调用私有方法
  void getInfo() {
    this._info();
  }
  //dart默认都是公开的，在变量名或⽅法名前加⼊_前缀即为私有
  void _info() {
    print('Name is $name, Age is $_age, Gender is $gender');
  }
}
