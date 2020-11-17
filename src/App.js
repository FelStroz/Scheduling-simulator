import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Simulator from './components/Simulator/index'
import withStoreProvider from './redux/withStoreProvider'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <Simulator />
    </div>
  );
}

export default withStoreProvider(App);
