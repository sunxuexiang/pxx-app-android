import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Picker, List } from '@ant-design/react-native';
import options from 'wmkit/area/address-option';
import { screenHeight } from 'wmkit/styles/index';

export default class AreaPicker extends React.Component {
  render() {
    console.log('====', options)
    return (
      <Picker
        format={(values) => {
          return values.join('/');
        }}
        data={options}
        title="选择地区"
        itemStyle={{height: screenHeight/3}}
        {...this.props}
      >
        {this.props.children}
        {/* <List.Item>
          dadsa
        </List.Item> */}
        {/* <Wrapper content={this.props.children} /> */}
      </Picker>
    );
  }
}

class Wrapper extends React.Component {
  render() {
    // 需要调用onClick方法弹出地址组件
    const { onClick } = this.props;

    return (
      <TouchableOpacity onPress={onClick || undefined}>
        {this.props.content}
      </TouchableOpacity>
    );
  }
}
