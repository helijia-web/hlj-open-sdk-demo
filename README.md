# hlj-open-sdk demo

## 开始
```js
yarn
yarn start
```

## 其他

### 跨域处理

绑定 Host `dev-m.helijia.com` 到 `127.0.0.1`

访问 `http://dev-m.helijia.com:3000`


### 接口环境切换

预发环境：url 中添加 `hlj-env=staging`

正式环境：url 中添加 `hlj-env=prod`

### 项目注意

1、项目使用哈希路由

2、build 的最终结果

html、js、css、图片等文件放在同一个文件夹下。
