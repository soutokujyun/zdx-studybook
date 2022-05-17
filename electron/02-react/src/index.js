// React负责逻辑控制，数据->VDOM
import React from 'react';
// ReactDOM渲染实际DOM，VDOM->DOM
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './static/iconfont/iconfont.css'

ReactDOM.render(<App />,document.getElementById('root'));
