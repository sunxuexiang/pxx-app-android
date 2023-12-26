import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Picker as AntdPicker } from '@ant-design/react-native';

export default class CustomerTagPicker extends React.Component {
  render() {

    const { disabled } = this.props;

    return (
      <AntdPicker
        disabled={disabled}
        data={[
          {value:0,label:'零食店'},
          {value:1,label:'便利店'},
          {value:2,label:'商超'},
          {value:3,label:'二批商'},
          {value:4,label:'水果零售店'},
          {value:5,label:'连锁系统'},
          {value:6,label:'炒货店'}
        ]}
        cols={1}
        title=""
        {...this.props}
      >
        <Wrapper content={this.props.children}/>
      </AntdPicker>
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
