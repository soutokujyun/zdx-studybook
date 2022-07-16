define(['sum'], function(sum) {
    let num = 1;
    let accumulation = function(x) {
        return sum.add(x, num);
    }
    return {
        accumulation
    }
})