/*
1.安装react依赖
npm i react react-dom -S




*/

import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
    render() {
        return <div>hello world</div>;
    }
}
ReactDom.render(<App />, document.getElementById("app"));
