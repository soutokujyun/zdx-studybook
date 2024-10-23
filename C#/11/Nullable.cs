using System;
namespace NullableApplication
{
  class Program
  {
    static void Main(string[] args)
    {
      int? i = null;
      double? d = new double?();
      bool? b = new bool?();
      Console.WriteLine(i);
      Console.WriteLine(d);
      Console.WriteLine(b);
      Console.ReadLine();
    }
  }
}