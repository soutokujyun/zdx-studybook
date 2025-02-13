let tree = {
        label: '名族系',
        children: [
            {
                label: '红旗',
                children: [
                    {
                        label: '其他'
                    }
                ]
            },
            {
                label: '吉利',
                children: [
                    {
                        label: '乘用车'
                    }
                ]
            }
        ]
    }


function travers(obj, ans, str = '') {
    str = str ? (str + ' / ' + obj.label) : obj.label
    if (obj.children && obj.children.length > 0) {
        for (let i of obj.children) {
            travers(i, ans, str)
        }
    } else {
        ans.push(str)
    }
}

let ans = []

travers(tree, ans)

console.log(ans)