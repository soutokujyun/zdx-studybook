var isAlienSorted = function(words, order) {
    const map = new Map();
    for (let i = 0; i < order.length; i++) map.set(order[i], String.fromCharCode(97 + i));
    for (let i = 0; i < words.length; i++) {
        words[i] = [...words[i]].reduce((a, c) => a + map.get(c), '');
        if (i && words[i] < words[i - 1]) return false;
    }
    return true;
};