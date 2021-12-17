var removeOuterParentheses = function(s) {
    let ret = "", cnt = 0;
    for(k of s) {
        if (k === '(' && cnt++ > 0) ret += k
        if (k === ')' && cnt-- > 1) ret += k
    }
    return ret;
};