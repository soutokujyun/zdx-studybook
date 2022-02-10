var rand10 = function() {
    while(true) {
        // (RandX - 1) * Y + RandY = Rand(X * Y)
        let num = (rand7() - 1) * 7 + rand7() // rand49
        //  Rand(X * Y) % X + 1 = RandY
        if (num <= 40) return num % 10 + 1

        // 提高命中率
        num = num - 40 // rand49 - rand40 = rand9
        // rand9
        num = (num - 1) * 7 + rand7() // rand63
        if (num <= 60) return num % 10 + 1

        num = num - 60 // rand63 - rand60 = rand3
        // rand3
        num = (num - 1) * 7 + rand7() // rand21
        if (num <= 20) return num % 10 + 1
        // 舍去21 重新取样
    }
};