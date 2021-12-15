var backspaceCompare = function(s, t) {
    return stackHandle(s) === stackHandle(t)
};

var stackHandle = function(str) {
    let result = [];
    for (let s of str) {
        if (s == '#') {
            result.pop()
        } else {
            result.push(s)
        }
    }
    return result.join('');
}