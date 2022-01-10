var topKFrequent = function(words, k) {
    let freq = new Map();
    for (let w of words) freq.get(w) ? freq.set(w, freq.get(w)+1) : freq.set(w, 1);
    freq = Array.from(freq);

    freq.sort((a,b) =>{
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
    })

    let res = [];
    freq.forEach(item => {
        res.push(item[0])
    });

    return res.slice(0, k);
};