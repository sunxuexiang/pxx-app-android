import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Picker as AntdPicker } from '@ant-design/react-native';

export default class RegisterTypePicker extends React.Component {

  render() {
    const { disabled } = this.props;

    return (
      <AntdPicker
        disabled={disabled}
        data={[
          {value:1,label:'商户'},
          {value:2,label:'单位'}
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
