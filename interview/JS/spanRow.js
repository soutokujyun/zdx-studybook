let arr1 = [
    {   
        unit: 'mV',
        range: '100',
    },
    {
        unit: 'mV',
        range: '100',
    },
    {
        unit: 'mV',
        range: '100',
    },
    {
        unit: 'mV',
        range: '200',
    },
    {
        unit: 'V',
        range: '100',
    },
    {
        unit: 'V',
        range: '100',
    },
    {
        unit: 'V',
        range: '100',
    }
]


let memoUnit = null;
let rowIndex = 1;
const arr2 = [];
for (let i = 0; i < arr1.length; i++) {
    const item = arr1[i];
    if (memoUnit != item.unit) {
        arr2.splice(i - 1, 0, {
            unit: item.unit,
            range: item.unit,
        })
        memoUnit = item.unit;
    } else {
        arr2.push(item);
    }
}

for (let i = 0; i < arr2.length; i++) {
    const item = arr2[i];
    let j = i + 1;
    let memoRange = item.range;
    while (j < arr2.length && memoRange == arr2[j].range) {
        j++;
    }
    if (j - i > 1) {
        item['rowSpan'] = j - i;
        i = j;
    }
}


console.log(arr2);
