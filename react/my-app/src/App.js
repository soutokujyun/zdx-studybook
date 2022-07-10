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
import HookPage from './pages/hook/HookPage';
import UseMemoPage from './pages/hook/UseMemoPage';
import UseCallbackPage from './pages/hook/UseCallbackPage';
import DialogPage from './pages/DialogPage';
import HocPage from './pages/HocPage';

function App() {
  return (
    <div className={styles.app}>
      <div style={{ 'textAlign': 'center' }}>
        <div className={styles.header}>My App</div>
        <img src={logo} className={styles.logo} alt="logo" />
      </div>
      <div className={styles.container}>
        <BrowserRouter>
          <div className={styles.navbar}>
            <Link className={styles.link} to="/">首页</Link>
            <Link className={styles.link} to="/pure">PureComponent</Link>
            <Link className={styles.link} to="/hook">Hook</Link>
            <Link className={styles.link} to="/hook/memo">useMemo</Link>
            <Link className={styles.link} to="/hook/callback">useCallback</Link>
            <Link className={styles.link} to="/redux">Redux</Link>
            <Link className={styles.link} to="/redux/react">ReactRedux</Link>
            <Link className={styles.link} to="/dialog">Dialog</Link>
            <Link className={styles.link} to="/hoc">HOC</Link>
          </div>
          <div className={styles.main}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/redux" element={<Redux />}>
                <Route index element={<ReduxPage />} />
                <Route path="react" element={<ReactReduxPage />} />
              </Route>
              <Route path='/hook' element={<HookPage/>}></Route>
              <Route path='/hook/memo' element={<UseMemoPage />}></Route>
              <Route path='/hook/callback' element={<UseCallbackPage />}></Route>
              <Route path="/pure" element={<PureComponentPage />} />
              <Route path="/dialog" element={<DialogPage />} />
              <Route path="/hoc" element={<HocPage/>} />
            </Routes>
            {/* <ClockClass></ClockClass> */}
            {/* <ClockFunction /> */}
            {/* <SetStatePage /> */}
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
