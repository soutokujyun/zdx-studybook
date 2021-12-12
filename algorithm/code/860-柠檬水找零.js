var lemonadeChange = function(bills) {
    if (bills.length == 1 && bills[0] > 5) return false;
    // 我们可以试想一下，正常情况下 收银台为了方便找零，肯定需要将各个不同数值的钱分类管理
    let p5 = 0, p10 = 0;
    // 10 就找一张5元的
    // 20 就找一张10元一张5元 或者 3张5元

    for (let i = 0; i < bills.length; i++) {
        if (bills[i] == 5) {
            p5++;
            continue;
        }
        // 10找零
        if (bills[i] == 10) {
            if (!p5) return false;
            p5--; p10++; 
            continue;
        }
        // 20找零
        if (bills[i] == 20) {
            if (p10 && p5) {
                p10--; p5--;
            } else {
                if (p5 < 3) return false
                p5 -= 3; 
            }
        }
    }
    return true;
};