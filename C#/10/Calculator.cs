using System;
namespace CalculatorApp
{
  class NumberFinder
  {
    public int FindMax(int a, int b)
    {
      return a > b ? a : b;
    }

    static void Main(string[] args)
    {
      int a = 10;
      int b = 20;
      int ret;

      NumberFinder nf = new NumberFinder();
      ret = nf.FindMax(a, b);
      Console.WriteLine("Maximum number is: " + ret);
      Console.ReadLine();
    }
  }
}