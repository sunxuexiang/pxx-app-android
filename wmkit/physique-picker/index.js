import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Picker, List } from '@ant-design/react-native';

export default class PhysiquePicker extends React.Component {
  render() {
    return (
      <List>
        <Picker
          data={[
            { value: 1, label: '政府机关/事业单位' },
            { value: 2, label: '国营' },
            { value: 3, label: '私营' },
            { value: 4, label: '中外合资' },
            { value: 5, label: '外资' },
            { value: 6, label: '其他' }
          ]}
          cols={1}
          title=""
          {...this.props}
        >
          {this.props.children}
          {/* <Wrapper content={this.props.children} /> */}
        </Picker>
      </List>

    );
  }
}

// class Wrapper extends React.Component {
//   render() {
//     // 需要调用onClick方法弹出地址组件
//     const { onClick } = this.props;

//     return (
//       <TouchableOpacity onPress={onClick || undefined}>
//         {this.props.content}
//       </TouchableOpacity>
//     );
//   }
// }
