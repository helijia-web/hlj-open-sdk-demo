import React, { useState, useEffect } from 'react';
import {
  ajax,
  checkLogin,
  login,
  trackPage,
  trackAction,
  go,
  hljurl
} from 'hlj-open-sdk';
import 'hlj-open-sdk/dist/lib.css';
import './App.scss';

function App() {
  const [logined, setLogined] = useState(null);

  useEffect(() => {
    const load = async() => {
      // 检测登录
      const value = await checkLogin();
      setLogined(value);

      // 访问ajax
      const url = 'https://p.helijia.com/api/magic/v2/pages/clientapp-index';
      const data = await ajax({ url });
      console.log(data);
    }
    load();

    // 进入页面埋点
    trackPage('b-face-test');
  }, []);

  const handleLogin = () => {
    login();
  };

  const handleTrack = () => {
    trackAction('b-face-test.click');
  };

  const handleJump = () => {
    // 由运营使用乐高工具生成
    const url = 'hljclient://page?jsonData={"type":4,"pageName":"HTML","data":{"url1":"https://m.helijia.com"}}';
    go(hljurl(url));
  };

  return (
    <div className="app">
      <section>
        <h2>登录</h2>
        <div className="row">登录状态：{logined ? '已登录' : '未登录'}</div>
        {logined === false &&
          <button onClick={handleLogin}>登录</button>
        }
      </section>
      <section>
        <h2>埋点</h2>
        <button onClick={handleTrack}>点我</button>
      </section>
      <section>
        <h2>链接和跳转</h2>
        <button onClick={handleJump}>跳转页面</button>
      </section>
    </div>
  );
}

export default App;
