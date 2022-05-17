function number() {
    var div = document.createElement("div");
    div.setAttribute("id", "number");
    div.innerHTML = 1300; // 改13后 浏览器会刷新
    document.body.appendChild(div);
}
export default number;
