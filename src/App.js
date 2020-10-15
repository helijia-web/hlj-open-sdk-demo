import React, { useState, useEffect } from 'react';
import {
  setShare,
  ajax,
  checkLogin,
  login,
  trackPage,
  trackAction,
  go,
  hljurl,
  uploadImage,
  imgurl,
  getPlatform,
  doShare
} from 'hlj-open-sdk';
import 'hlj-open-sdk/dist/lib.css';
import './App.scss';

function App() {
  const [logined, setLogined] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const load = async() => {
      // 检测登录
      const value = await checkLogin();
      setLogined(value);

      // ajax请求，会自动处理登录态
      const url = 'https://p.helijia.com/api/magic/v2/pages/clientapp-index';
      const data = await ajax({ url });
      console.log(data);
    }

    // 初始化分享信息
    setShare({
      icon: 'https://static.helijia.cn/zmw/upload/active/bigfish/fishicon.jpg',
      title: '分享标题',
      desc: '分享副标题，一般会有很多字',
      link: 'https://m.helijia.com', // 分享出去的链接
      mediaType: 0 // 代表分享的媒体类型 0 是链接 1 是单图
    });

    // 进入页面埋点
    trackPage('b-face-test');

    load();
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

  const handleFileUpload = async e => {
    const file = e.target.files[0];
    setUploadLoading(true);
    const res = await uploadImage(file);
    setUploadLoading(false);
    if (!res.success) {
      alert(res.errorMessage);
      return;
    }

    // res.url  图片相对地址，可用于展示
    // res.path 图片相对地址，可传递给接口保存
    setImageUrl(res.url);

    // 图片相对地址可使用 `imgurl` 转成绝对地址
    console.log(res.path, '->', imgurl(res.path));
  };

  const handleShare = () => {
    const platform = getPlatform();
    if (platform === 'ios' || platform === 'android') {
      doShare();
    } else {
      alert('不支持');
    }
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
      <section className="upload-section">
        <h2>图片上传</h2>
        <input type="file" onChange={handleFileUpload} />
        { uploadLoading && <div>正在上传...</div> }
        { imageUrl && <img className="preview" src={imageUrl} alt="" /> }
      </section>
      <section>
        <h2>平台判断</h2>
        <div>{getPlatform()}</div>
      </section>
      <section>
        <h2>分享</h2>
        {
          <button onClick={handleShare}>分享</button>
        }
      </section>
    </div>
  );
}

export default App;
