import React, { useState, useEffect } from 'react';
import {
  ajax,
  checkLogin,
  login
} from 'hlj-open-sdk';
import './App.scss';

function App() {
  const [logined, setLogined] = useState(null);

  useEffect(() => {
    const load = async() => {
      const value = await checkLogin();
      setLogined(value);

      const url = 'https://p.helijia.com/api/magic/v2/pages/clientapp-index';
      const data = await ajax({ url });
      console.log(data);
    }
    load();
  }, []);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="app">
      <div className="section">
        <div className="row">登录状态：{logined ? '已登录' : '未登录'}</div>
        {logined === false &&
          <button onClick={handleLogin}>登录</button>
        }
      </div>
    </div>
  );
}

export default App;
