import logo from './logo.svg';
import HomePage from './pages/HomePage';
import ReduxPage from './pages/ReduxPage';
import styles from './styles/app.module.scss'
// import ClockClass from './components/ClockClass';
// import ClockFunction from './components/ClockFunction';
// import SetStatePage from './pages/SetStatePage'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.header}>My App</div>
      <img src={logo} className={styles.logo} alt="logo" />
      <HomePage />
      <ReduxPage />
      {/* <ClockClass></ClockClass> */}
      {/* <ClockFunction /> */}
      {/* <SetStatePage /> */}
    </div>
  );
}

export default App;
