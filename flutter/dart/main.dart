import 'index.dart';
void main() {
  Person p = Person('zdx', 18, 'Male');
  p.getInfo();
  // 修改姓名
  p.name = 'zengdexun';
  // 修改年龄
  // p.age = 26; // 私有属性无法修改
  p.setAge(26);
  // 修改性别
  // p.gender = 'Female'; // 固定变量一旦被赋值就无法修改
  // 获取个人信息
  // p._info(); // 私有方法不允许访问
  p.getInfo();
}