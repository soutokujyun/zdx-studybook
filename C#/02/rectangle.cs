using System;
namespace RectangleApplication
{
  class Rectangle
  {
    // 成员变量
    double width;
    double length;
    public void AcceptDetails()
    {
      length = 4.5;
      width = 3.5;
    }
    public double GetArea()
    {
      return width * length;
    }
    
    public void Display()
    {
      Console.WriteLine("Width of rectangle is {0}", width);
      Console.WriteLine("Length of rectangle is {0}", length);
      Console.WriteLine("Area of rectangle is {0}", GetArea());
    }
  }

  class ExecuteRectangle
  {
    static void Main(string[] args)
    {
      Rectangle r = new Rectangle();
      r.AcceptDetails();
      r.Display();
      Console.ReadLine();
    }
  }
}