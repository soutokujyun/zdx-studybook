// eslint-disable-next-line
import React, { Component, useState } from 'react';
import IndexPage from './pages/IndexPage';
import CartPage from './pages/CartPage';
import OrderListPage from './pages/OrderListPage';
import UserPage from './pages/UserPage';
import BottomNav from './components/BottomNav';

// 默认按需加载
import "antd/dist/antd.less"

function App() {
    const [activeNum, setActiveNum] = useState(0);
    return (
      <div className="App">
        {activeNum === 0 && <IndexPage />}
        {activeNum === 1 && <CartPage />}
        {activeNum === 2 && <OrderListPage />}
        {activeNum === 3 && <UserPage />}
        <BottomNav activeNum={activeNum} setActiveNum={setActiveNum}  />
      </div>
    );
}

export default App;
