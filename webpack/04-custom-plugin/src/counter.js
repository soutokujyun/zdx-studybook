// 处理js模块HMR
// 需要使用module.hot.accept来观察模块更新 从而更新
function counter() {
    var div = document.createElement("div");
    div.setAttribute("id", "counter");
    div.innerHTML = 1;
    div.onclick = function () {
        div.innerHTML = parseInt(div.innerHTML, 10) + 1;
    };
    document.body.appendChild(div);
}
export default counter;
