var minRemoveToMakeValid = function(s) {
    let ret = "", cnt = 0;

    for (k of s) {
        if (k == '(') {
            cnt++;
            ret += k;
        } else if (k == ')') {
            if (cnt == 0) continue
            cnt--
            ret += k
        } else {
            ret += k
        }
    }

    s = ret.split('').reverse().join('');
    ret = "", cnt = 0;

    for (k of s) {
        if (k == ')') {
            cnt++;
            ret += k;
        } else if (k == '(') {
            if (cnt == 0) continue
            cnt--
            ret += k
        } else {
            ret += k
        }
    }

    return ret.split('').reverse().join('');
};