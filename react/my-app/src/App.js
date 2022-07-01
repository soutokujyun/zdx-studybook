import logo from './logo.svg';
import HomePage from './pages/HomePage';
import Redux from './pages/redux';
import ReduxPage from './pages/redux/ReduxPage';
import ReactReduxPage from './pages/redux/ReactReduxPage';
import styles from './styles/app.module.scss'
// import ClockClass from './components/ClockClass';
// import ClockFunction from './components/ClockFunction';
// import SetStatePage from './pages/SetStatePage'

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import PureComponentPage from './pages/PureComponentPage';

function App() {
  return (
    <div className={styles.app}>
      <div style={{ 'textAlign': 'center' }}>
        <div className={styles.header}>My App</div>
        <img src={logo} className={styles.logo} alt="logo" />
      </div>
      <div style={{ 'textAlign': 'center' }}>
      <BrowserRouter>
        <Link to="/">首页</Link> | 
        <Link to="/redux">Redux</Link> | 
        <Link to="/redux/react">ReactRedux</Link> | 
        <Link to="/pure">PureComponent</Link>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/redux" element={<Redux />}>
            <Route index element={<ReduxPage/>} />
            <Route path="react" element={<ReactReduxPage/>} />
          </Route>
          <Route path="/pure" element={<PureComponentPage/>} />
        </Routes>
      </BrowserRouter>
      {/* <ClockClass></ClockClass> */}
      {/* <ClockFunction /> */}
      {/* <SetStatePage /> */}
      </div>
    </div>
  );
}

export default App;
