using System;
namespace GetUserInputApplication
{
  class GetUserInput
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Enter your name: ");
      string name = Console.ReadLine();
      Console.WriteLine("Hello " + name);
      Console.ReadLine();
    }
  }
}