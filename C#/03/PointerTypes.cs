using System;
namespace PointerTypes
{
  class Program
  {
    static unsafe void Main()
    {
      int number = 10;
      int* pNumber = &number; // 获取 number 的指针

      Console.WriteLine("Number: " + number);
      Console.WriteLine("Pointer: " + (long)pNumber); // 输出指针的地址
      Console.WriteLine("Value at Pointer: " + *pNumber); // 通过指针访问值

      *pNumber = 20; // 通过指针修改原变量的值
      Console.WriteLine("Modified Number: " + number);
      Console.WriteLine("Modified Pointer: " + (long)pNumber);
      Console.ReadKey();
    }
  }
}