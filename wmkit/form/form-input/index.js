import React from 'react';
import { PixelRatio, StyleSheet, Text, TextInput, View } from 'react-native';
import { priceColor } from 'wmkit/styles/index';
import FormRegexUtil from '../form-regex';

export default class FormInput extends React.Component {
  state = {
    inputValue: this.props.defaultValue,
    errorPress: false,
    height: 0
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ inputValue: nextProps.defaultValue });
  }

  static defaultProps = {
    autoFocus: false
  };

  render() {
    const {
      label,
      placeholder,
      onChange,
      required,
      maxLength,
      disabled,
      type,
      multiline,
      keyboardType,
      autoFocus,
      rightStyle,
      rightTextStyle,
      rightTextInputStyle,
      itemStyle,
      placeholderTextColor
    } = this.props;

    return (
      <View style={[styles.container,this.props.style]}>
        {required ? (
          <Text
            allowFontScaling={false}
            style={{
              color: required ? priceColor : 'transparent',
              marginRight: 2
            }}
          >
            *
          </Text>
        ) : null}
        <View style={[styles.item, itemStyle]} >
          <Text style={styles.text} allowFontScaling={false}>
            {label}
          </Text>
          <View style={[styles.right, rightStyle]}>
            {disabled ? (
              <Text
                allowFontScaling={false}
                style={[styles.valueText, { color: '#999' }, rightTextStyle]}
                numberOfLines={1}
              >
                {this.state.inputValue || placeholder}
              </Text>
            ) : (
              <TextInput
                style={[styles.textRight,rightTextInputStyle]}
                editable={!disabled}
                placeholder={placeholder}
                value={this.state.inputValue}
                maxLength={maxLength}
                /*    onChangeText={()=>onChange()}*/
                onChangeText={(text) =>
                  this._handelOnChange(text, onChange, type, maxLength)
                }
                underlineColorAndroid="transparent"
                multiline={multiline}
                keyboardType={keyboardType}
                autoFocus={autoFocus}
                placeholderTextColor={placeholderTextColor}
                onBlur={text => {
                  this.handleEndEditing(text);
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  /**
   * 解决type='number'的时候，maxlength不兼容的问题
   *
   * @param text
   * @param onChangeFun
   * @param type
   * @param maxLength
   * @private
   */
  _handelOnChange = (text, onChangeFun, type, maxLength) => {
    if (this.state.errorPress) {
      text = ''; //110.和110。在react看来是一样的值，不会更新，所以先清空，再填值
      this.setState({ inputValue: this.state.inputValue });
      return;
    }
    let value = text;
    if (type == 'number' || type == 'tel') {
      if (value.length <= maxLength) {
        this.setState({ inputValue: value });
      } else {
        this.setState({
          inputValue: this.state.inputValue.slice(0, maxLength)
        });
        return;
      }
    } else {
      this.setState({ inputValue: value });
    }
    onChangeFun && onChangeFun(text);
  };

  handleEndEditing = (text) => {
    //校验输入值
    let { label, required, checkValue, min, max, regexString, minLength, maxLength } = this.props;
    if (checkValue) {
      FormRegexUtil(text, label, {
        required: !!required,
        minLength: minLength,
        maxLength: maxLength,
        regexString: regexString,
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    flex: 1,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    // justifyContent: 'space-between',
    backgroundColor: '#ffffff'
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  textRight: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
    overflow: 'hidden'
  },
  text: {
    fontSize: 14,
    color: '#333'
  },
  valueText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 0,
  }
});
