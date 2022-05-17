// 将序列化的css插入到style
// 可以做，但没必要
module.exports = function (source) {
    const content = `const tag = document.createElement('style');
                    tag.innerHTML = ${source};
                    document.head.appendChild(tag);
    `;
    this.callback(null, content);
};
