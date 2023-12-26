### 修改组件与业务代码的通信方式

1.  组件中不使用链接跳转页面, 例如

```
<a href='/search' />
```

全部修改成使用方法跳转, 例如

```
declare let window: any;
const { BusinessDataCenter = {} } = window;

<div onClick={this._jump} >.....</div>


_jump = e => {
  if (!BusinessDataCenter) return;
  BusinessDataCenter.getResult("search", placeholder);
}
```

上面代码的意思是从我们的业务代码*BusinessDataCenter*中获取一个叫做*search*的方法.

### 业务代码中的做法

#### h5 中 x-site 写法

```
const props = {
  renderHost: "http://127.0.0.1:3001",
  ossHost: "http://wanmi-x-site.oss-cn-shanghai.aliyuncs.com",
  systemCode: "d2cStore",
  envCode: "test1",
  platform: "weixin",
  pageType: "index",
  uid: "000000",
  api: {    // 即组件中的BusinessDataCenter
    search: async() =>{ // 即组件中的search方法, 注意: 需要为async方法, 因为当初他们的写法.

    }
  }
}
```

search 方法中就可以  使用类似 history 的跳转方式, 或者业务代码中的方法

#### app 中 x-site 写法

```
const props = {
  renderHost: "http://127.0.0.1:3001",
  ossHost: "http://wanmi-x-site.oss-cn-shanghai.aliyuncs.com",
  systemCode: "d2cStore",
  envCode: "test1",
  platform: "weixin",
  pageType: "index",
  uid: "000000",
  api: {    // 即组件中的BusinessDataCenter
    search: async() =>{ // 即组件中的search方法, 注意: 需要为async方法, 因为当初他们的写法.
      // 此时无法直接跳转, 必须告诉app, 我这里需要跳转
      // 此时约定, 当app接受到的消息字符串为search时, 才会进行search页面的跳转
      // 为了适应此后比较复杂的数据结构类型, 约定为json字符串类型的数据
      const data = {
        type: 'search', // require 表示跳转的类型
        param1,
        param2,
        param3,
        param4......
      }
      window.postMessage(JSON.stringify(data),'*');
    }
  }
}
```

#### app 中的写法

```
<WebView
  source={require('引用的资源页面')}
  onMessage={(e) => {
    // 首次会传递一个'[object Object]'的字符串, 需要过滤掉
    if (e.nativeEvent.data != '[object Object]') {
      // 这里的消息字符串为我们约定好的消息字符串'search'
      const results = JSON.parse(e.nativeEvent.data);
      const type = results.type;
      // 后面可以根据各自需求, 获取param1,param2,param3,param4
      if (type == 'search') {
        // 跳转进入search页
        msg.emit('router: goToNext', { routeName: 'Search' });
      }
      // 后面可以加上elseif等其他判断
    }
  }}
/>
```

### x-site 使用方式

进入 magic-box 项目的 demo 中, 在 demo 项目上配置好所有需要的信息, 例如

```
 xxxhost: '',

 ...

 api: { search: async() => {}}
```

#### x-site 固定跳转链接地址

目前关于格式跳转的类型分为以下几种

1.商品详情 2.类目 3.页面(专题页|文章页) 4.常用功能(固定跳转的业务地址,例如首页) 5.自定义网络地址

为了尽可能减少对接魔方 api 的改动, 规定这里的跳转的 BusinessDataCenter 为 go_link,
传递的参数为 json 字符串, 格式如下

```
{
  "app": {
    "routeNmae": "", //require app端路由页面地址
    "params": {  // 需要传递的参数

    }
  },
  "wechat": {
    "pathname": "", // require h5端路由页面地址
    "isHref": true, // 表示是否需要h5端接收地址后, 以location.href形式跳转页面
    "params": {  // 需要传递的参数
       //这里的参数可能为state: {....}或者search: {...}等, 根据已有业务代码选择
    }
  }
}
```

目前规定的路由跳转方式均为 push 类型, 如果需要类似 replace 等形式, 需要根据业务修改, 可以参考 isHref 的做法
