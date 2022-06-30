import logo from './logo.svg';
import HomePage from './pages/HomePage';
import ReduxPage from './pages/ReduxPage';
import ReactReduxPage from './pages/ReactReduxPage';
import styles from './styles/app.module.scss'
// import ClockClass from './components/ClockClass';
// import ClockFunction from './components/ClockFunction';
// import SetStatePage from './pages/SetStatePage'

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.header}>My App</div>
      <img src={logo} className={styles.logo} alt="logo" />
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/redux">ReduxPage</Link>
        <Link to="/react-redux">ReactReduxPage</Link>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/redux" element={<ReduxPage/>} />
          <Route path="/react-redux" element={<ReactReduxPage/>} />
        </Routes>
      </BrowserRouter>
      {/* <HomePage />
      <ReduxPage />
      <ReactReduxPage /> */}
      {/* <ClockClass></ClockClass> */}
      {/* <ClockFunction /> */}
      {/* <SetStatePage /> */}
    </div>
  );
}

export default App;
