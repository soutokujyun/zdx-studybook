using System;
namespace ConstValueNamespace
{
  class ConstValue
  {
    static void Main(string[] args)
    {
      const int num = 10;
      const int num2 = 057;
      const float num3 = 314159.26e-5f;
      const string str1 = "one \n two";
      const string str2 = @"one ""\\n"" two";
      const string str3 = @"one
      two";
      Console.WriteLine("The value of num is {0}", num);
      Console.WriteLine("The value of num2 is {0}", num2);
      Console.WriteLine("The value of num3 is {0}", num3);
      Console.WriteLine("The value of str1 is {0}", str1);
      Console.WriteLine("The value of str2 is {0}", str2);
      Console.WriteLine("The value of str3 is {0}", str3);
      Console.ReadLine();
    }
  }
}