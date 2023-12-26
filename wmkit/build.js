const path = require('path');
const fs = require('fs');
const envTmp = process.argv[2];

const copyFile = (type) => {
  if (type) {
    fs.writeFileSync(
      path.resolve(__dirname, 'config.js'),
      fs.readFileSync(path.resolve(__dirname, `config-${type}.js`))
    );
  }
};

// 涉及到改动源码的地方，类似这样刷一下脚本
const copyFile1 = () => {
  // 解决IOS端input输入框输入中文乱跳的bug.
  fs.writeFileSync(
    path.join(__dirname,'../', 'node_modules','react-native','Libraries','Text','TextInput','Singleline','RCTUITextField.m'),
    fs.readFileSync(path.resolve(__dirname, 'RCTUITextField.m'))
  );
  // 安卓软键盘多行文本输入无法聚焦光标乱跳的问题
  fs.writeFileSync(
    path.join(__dirname,'../', 'node_modules','@react-navigation','stack','src','views','KeyboardManager.tsx'),
    fs.readFileSync(path.resolve(__dirname, 'KeyboardManager.tsx'))
  );
};

copyFile1();
copyFile(envTmp);
