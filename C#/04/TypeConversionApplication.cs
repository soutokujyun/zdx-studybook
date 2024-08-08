using System;
namespace TypeConversionApplication
{
  class ExplicitConversion
  {
    static void Main(string[] args)
    {
      double d = 5673.764;
      double d2 = 123.456;
      float f = 123.456f;
      int i;
      int j;
      float k;

      // 强制转换 double 到 int
      i = (int)d;
      // 强制转换 float 到 int
      j = (int)f;
      // 强制转换 double 到 float
      k = (float)d2;
      Console.WriteLine("d = {0}, i = {1}", d, i);
      Console.WriteLine("f = {0}, j = {1}", f, j);
      Console.WriteLine("d2 = {0}, k = {1}", d2, k);
      Console.ReadKey();
    }
  }
}