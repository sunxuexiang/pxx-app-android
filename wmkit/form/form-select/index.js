import React from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import FormSelectBase from '../form-select-base/index';
import FormSelectReq from '../form-select-req';
export default class FormSelect extends React.Component {
  static defaultProps = {
    disabled: false,
    request: false
  };

  render() {
    const { disabled, onPress, request, ...rest } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        onPress={() => {
          // 收起键盘
          Keyboard.dismiss();
          onPress();
        }}
      >{request ? <FormSelectReq {...rest} /> : <FormSelectBase {...rest} />}
      </TouchableOpacity>
    );
  }
}
