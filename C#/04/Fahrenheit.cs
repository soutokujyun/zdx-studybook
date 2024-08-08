using System;

public class Fahrenheit
{
    private double degrees; // 使用私有字段来存储华氏度

    public double Degrees
    {
      get { return degrees; }
      set { degrees = value; }
    }

    public Fahrenheit(double degrees)
    {
        Degrees = degrees;
    }

    // 隐式转换从Fahrenheit到double（返回摄氏度）
    public static implicit operator double(Fahrenheit f)
    {
        return (f.Degrees - 32) * 5 / 9; // 转换为摄氏度
    }
    
    // 显示转换从double（摄氏度）到Fahrenheit
    public static explicit operator Fahrenheit(double celsius)
    {
        return new Fahrenheit(celsius * 9 / 5 + 32); // 从摄氏度转换为华氏度
    }
}

public class Program
{
    public static void Main()
    {
        Fahrenheit f = new Fahrenheit(98.6);
        Console.WriteLine("Fahrenheit: {0}", f.Degrees);
        
        // 隐式转换为摄氏度
        double temp = f; 
        Console.WriteLine("After implicit conversion to Celsius: {0}", temp);

        // 显示转换回华氏度
        Fahrenheit newF = (Fahrenheit)temp; 
        Console.WriteLine("After explicit conversion back to Fahrenheit: {0}", newF.Degrees);
        Console.ReadKey();
    }
}
