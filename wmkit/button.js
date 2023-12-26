'use strict';
import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Keyboard
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { mainColor } from 'wmkit/styles/index';

/**
 * 按钮组件
 */
export default class Button extends Component {
  static defaultProps = {
    text: '确定',
    disabled: false
  };

  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.state.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }
  }

  componentWillUnmount() {
    // Button的timer默认是setTimeout，用于防止过快重复点击按钮。SendButton的timer是setInterval，倒计时60秒
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { text } = this.props;

    return (
      <View style={this.getBoxStyle()}>
        <TouchableOpacity
          style={this.getBtnStyle()}
          onPress={this.handleClick}
          disabled={this.props.disabled}
        >
          <Text allowFontScaling={false} style={styles.getTextStyle()}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * 获取按钮框的样式
   * @returns {{}}
   */
  getBoxStyle = () => {
    return this.state.boxStyle;
  };

  /**
   * 获取按钮的样式
   * @returns {{}}
   */
  getBtnStyle = () => {
    return this.state.btnStyle;
  };

  /**
   * 获取按钮文本的样式
   * @returns {styles.longBtnText|{color, fontSize}|*}
   */
  getTextStyle = () => {
    return this.state.btnTextStyle;
  };

  /**
   * 处理按钮点击事件
   * 防止重复提交可以把 onClick 的返回值定义为 Promise
   */
  handleClick = async () => {
    // 收起键盘
    Keyboard.dismiss();

    const { disabled } = this.props;
    const { processing } = this.state;

    if (disabled || processing) {
      return;
    }

    // 设置按钮状态执行操作中
    this.setState({
      processing: true
    });

    // 执行 onClick 方法
    await this.props.onClick();
    this.setState({
      processing: false
    });
  };
}

/**
 * 长按钮
 */
export class LongButton extends Button {
  timer;

  constructor(props) {
    super(props);

    this.state = {
      isLock: false,
      boxStyle: this.props.boxStyle
        ? StyleSheet.flatten([styles.longBtnBox, this.props.boxStyle])
        : styles.longBtnBox,
      btnStyle: this.props.btnStyle
        ? StyleSheet.flatten([styles.longBtn, { backgroundColor: mainColor }, this.props.btnStyle])
        : [styles.longBtn, { backgroundColor: mainColor }],
      btnTextStyle: this.props.btnTextStyle
        ? StyleSheet.flatten([styles.longBtnText, this.props.btnTextStyle])
        : styles.longBtnText
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { disabled, processing } = nextProps;
    if (disabled || processing) {
      //按钮样式
      this.setState({
        btnStyle: StyleSheet.flatten([
          this.state.btnStyle,
          styles.disableBgColor
        ])
      });
    } else {
      this.setState({
        btnStyle: StyleSheet.flatten([
          this.state.btnStyle,
          { backgroundColor: mainColor },
          this.props.btnStyle
        ])
      });
    }
  }

  render() {
    const { text } = this.props;
    return (
      <View style={this.getBoxStyle()}>
        <TouchableOpacity
          style={this.getBtnStyle()}
          onPress={this._handleClick}
          disabled={this.props.disabled}
        >
          <Text allowFontScaling={false} style={this.getTextStyle()}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _handleClick = () => {
    if (this.state.isLock) {
      return;
    }

    this.setState(
      {
        isLock: true,
        btnStyle: StyleSheet.flatten([
          this.state.btnStyle,
          styles.disableBgColor
        ])
      },
      async () => {
        await this.handleClick();
        this.setState({
          boxStyle: this.props.boxStyle
            ? StyleSheet.flatten([styles.longBtnBox, this.props.boxStyle])
            : styles.longBtnBox,
          btnStyle: this.props.btnStyle
            ? StyleSheet.flatten([styles.longBtn, { backgroundColor: mainColor }, this.props.btnStyle])
            : [styles.longBtn, { backgroundColor: mainColor }],
          btnTextStyle: this.props.btnTextStyle
            ? StyleSheet.flatten([styles.longBtnText, this.props.btnTextStyle])
            : styles.longBtnText
        });
        if (this.props.disabled || this.state.processing) {
          //按钮样式
          this.setState({
            btnStyle: StyleSheet.flatten([
              this.state.btnStyle,
              styles.disableBgColor
            ])
          });
        }
      }
    );
    this.timer = setTimeout(() => this.setState({ isLock: false }), 600);
  };
}

/**
 * 无背景长按钮
 */
export class LongSimpleButton extends Button {
  constructor(props) {
    super(props);
    this.state = {
      boxStyle: styles.longBtnBox,
      btnStyle: styles.longSimpleBtn,
      btnTextStyle: styles.longSimpleBtnText
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { disabled, processing } = nextProps;
    if (disabled || processing) {
      //按钮样式
      this.setState({
        btnStyle: StyleSheet.flatten([
          this.state.btnStyle,
          styles.disableBgColor
        ])
      });
    } else {
      this.setState({
        btnStyle: StyleSheet.flatten([
          this.state.btnStyle,
          { backgroundColor: mainColor }
        ])
      });
    }
  }

  render() {
    const { text } = this.props;
    return (
      <View style={this.getBoxStyle()}>
        <TouchableOpacity
          style={this.getBtnStyle()}
          onPress={this.handleClick}
          disabled={this.props.disabled}
        >
          <Text allowFontScaling={false} style={this.getTextStyle()}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/**
 * 验证码按钮
 */
export class SendButton extends Button {
  static defaultProps = {
    text: '获取验证码',
    time: 60
  };

  constructor(props) {
    super(props);
    this.state = {
      btnStyle: this.props.btnStyle
        ? StyleSheet.flatten([styles.sendBtn, this.props.btnStyle])
        : styles.sendBtn,
      btnTextStyle: this.props.btnTextStyle
        ? StyleSheet.flatten([styles.sendText, this.props.btnTextStyle])
        : styles.sendText,
      //按钮禁用
      btnDisable: false,
      //默认倒计时时间
      time: this.props.time,
      //文本
      text: this.props.text
    };

    if (this.props.disabled || this.state.btnDisable) {
      //按钮样式
      this.state.btnStyle = StyleSheet.flatten([
        this.state.btnStyle,
        styles.disableBgColor
      ]);
      //按钮文本样式
      this.state.btnTextStyle = StyleSheet.flatten([
        this.state.btnTextStyle,
        styles.disableColor
      ]);
    }
  }

  componentWillUnmount() {
    // SendButton的timer是setInterval，倒计时60秒
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { btnDisable, text, time } = this.state;

    const { disabled } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={this.getBtnStyle()}
        onPress={!disabled && !btnDisable ? this._handlePress : null}
        disabled={disabled}
      >
        <Text style={this.getTextStyle()} allowFontScaling={false}>
          {disabled ? text : !btnDisable ? text : time + '秒后重新获取'}
        </Text>
      </TouchableOpacity>
    );
  }

  /**
   * 重新发送短信
   */
  _handlePress = () => {
    if (this.props.clickValid && this.props.clickValid() === false) {
      return;
    }

    this.setState(
      {
        time: this.props.time,
        btnDisable: true,
        btnStyle: StyleSheet.flatten([
          this.state.btnStyle,
          styles.disableBdColor,
          this.props.disableBdColor
        ]),
        btnTextStyle: StyleSheet.flatten([
          this.state.btnTextStyle,
          styles.disableColor
        ])
      },
      async () => {
        const clickResult = this.props.onClick();
        if (clickResult instanceof Promise) {
          clickResult.catch(() => {
            // 异常情况是否重置按钮
            if (this.props.resetWhenError) {
              this.setState({
                btnStyle: this.props.btnStyle
                  ? StyleSheet.flatten([styles.sendBtn, this.props.btnStyle])
                  : styles.sendBtn,
                btnTextStyle: this.props.btnTextStyle
                  ? StyleSheet.flatten([
                      styles.sendText,
                      this.props.btnTextStyle
                    ])
                  : styles.sendText,
                //默认倒计时时间
                time: this.props.time,
                //文本
                text: this.props.text,
                //按钮禁用
                btnDisable: false
              });
              clearInterval(this.timer);
            }
          });
        }
        await this._doCount();
      }
    );
  };

  /**
   * 计时器倒计时
   */
  _doCount = () => {
    this.timer = setInterval(() => {
      if (this.state.time == 1) {
        clearInterval(this.timer);
        this.setState({
          btnDisable: false,
          btnStyle: this.props.btnStyle
            ? StyleSheet.flatten([styles.sendBtn, this.props.btnStyle])
            : styles.sendBtn,
          btnTextStyle: this.props.btnTextStyle
            ? StyleSheet.flatten([styles.sendText, this.props.btnTextStyle])
            : styles.sendText
        });

        if (
          this.props.disabled ||
          this.state.processing ||
          this.state.btnDisable
        ) {
          //按钮样式
          this.setState({
            btnStyle: StyleSheet.flatten([
              this.state.btnStyle,
              styles.disableBdColor,
              this.props.disableBdColor
            ]),
            btnTextStyle: StyleSheet.flatten([
              this.state.btnTextStyle,
              styles.disableColor
            ])
          });
        }
      }
      this.setState({
        time: this.state.time - 1
      });
    }, 1000);
  };
}

/**
 * Submit
 */
export class Submit extends Button {
  constructor(props) {
    super(props);
    this.state = {
      boxStyle:
        this.props.boxStyle && !this.props.disabled
          ? StyleSheet.flatten([this.props.aotuFixed ? styles.autoFixedSubmitBox : styles.submitBox, { backgroundColor: mainColor }, this.props.boxStyle])
          : [styles.submitBox, { backgroundColor: mainColor }],
      btnStyle:
        this.props.btnStyle && !this.props.disabled
          ? StyleSheet.flatten([styles.submitBtn, this.props.btnStyle])
          : styles.submitBtn,
      btnTextStyle:
        this.props.btnTextStyle && !this.props.disabled
          ? StyleSheet.flatten([styles.submitBtnText, this.props.btnTextStyle])
          : styles.submitBtnText
    };
    if (this.props.disabled || this.state.processing) {
      //按钮样式
      this.state.boxStyle = StyleSheet.flatten([
        this.state.boxStyle,
        styles.disablePoorBgColor
      ]);
      this.state.btnStyle = StyleSheet.flatten([
        this.state.btnStyle,
        styles.disablePoorBdColor
      ]);
      this.state.btnTextStyle = StyleSheet.flatten([
        styles.disablePoorColor,
        this.state.btnTextStyle
      ]);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ((nextProps && nextProps.disabled) || this.state.processing) {
      this.setState({
        boxStyle: StyleSheet.flatten([
          this.state.boxStyle,
          styles.disablePoorBgColor
        ]),
        btnStyle: StyleSheet.flatten([
          this.state.btnStyle,
          styles.disablePoorBdColor
        ]),
        btnTextStyle: StyleSheet.flatten([
          styles.disablePoorColor,
          this.state.btnTextStyle
        ])
      });
    } else {
      this.setState({
        boxStyle: this.props.boxStyle
          ? StyleSheet.flatten([this.props.aotuFixed ? styles.autoFixedSubmitBox : styles.submitBox, { backgroundColor: mainColor }, this.props.boxStyle])
          : [styles.submitBox, { backgroundColor: mainColor }],
        btnStyle: this.props.btnStyle
          ? StyleSheet.flatten([styles.submitBtn, this.props.btnStyle])
          : styles.submitBtn,
        btnTextStyle: this.props.btnTextStyle
          ? StyleSheet.flatten([styles.submitBtnText, this.props.btnTextStyle])
          : styles.submitBtnText
      });
    }
  }

  render() {
    const { text, isLinear, colors } = this.props;

    //渐变按钮
    if (isLinear) {
      return (
        <LinearGradient
          colors={colors}
          style={this.getBoxStyle()}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={this.getBtnStyle()}
            onPress={this._handleClick}
            disabled={this.props.disabled}
          >
            <Text allowFontScaling={false} style={this.getTextStyle()}>
              {text}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    }

    return (
      <View style={this.getBoxStyle()}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={this.getBtnStyle()}
          onPress={this._handleClick}
          disabled={this.props.disabled}
        >
          <Text allowFontScaling={false} style={this.getTextStyle()}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _handleClick = () => {
    this.setState(
      {
        //按钮样式
        boxStyle: StyleSheet.flatten([
          this.state.boxStyle,
          styles.disablePoorBgColor
        ]),
        btnStyle: StyleSheet.flatten([
          this.state.btnStyle,
          styles.disablePoorBdColor
        ]),
        btnTextStyle: StyleSheet.flatten([
          this.state.btnTextStyle,
          styles.disablePoorColor
        ])
      },
      async () => {
        await this.handleClick();
        if (this.props.disabled || this.state.processing) {
          //按钮样式
          this.setState({
            boxStyle: StyleSheet.flatten([
              this.state.boxStyle,
              styles.disablePoorBgColor
            ]),
            btnStyle: StyleSheet.flatten([
              this.state.btnStyle,
              styles.disablePoorBdColor
            ]),
            btnTextStyle: StyleSheet.flatten([
              this.state.btnTextStyle,
              styles.disablePoorColor
            ])
          });
        } else {
          this.setState({
            boxStyle: this.props.boxStyle
              ? StyleSheet.flatten([this.props.aotuFixed ? styles.autoFixedSubmitBox : styles.submitBox, { backgroundColor: mainColor }, this.props.boxStyle])
              : [styles.submitBox, { backgroundColor: mainColor }],
            btnStyle: this.props.btnStyle
              ? StyleSheet.flatten([styles.submitBtn, this.props.btnStyle])
              : styles.submitBtn,
            btnTextStyle: this.props.btnTextStyle
              ? StyleSheet.flatten([
                  styles.submitBtnText,
                  this.props.btnTextStyle
                ])
              : styles.submitBtnText
          });
        }
      }
    );
  };
}

const styles = StyleSheet.create({
  //begin disable style
  disableBdColor: {
    borderColor: '#999'
  },
  disableBgColor: {
    backgroundColor: '#999'
  },
  disableColor: {
    color: '#999'
  },
  //end disable style

  //begin poorDisable style
  disablePoorBdColor: {
    borderColor: '#e1e1e1'
  },
  disablePoorBgColor: {
    backgroundColor: '#e1e1e1',
    marginRight:10
  },
  disablePoorColor: {
    color: '#939495'
  },
  //end poorDisable style

  //begin longBtn
  longBtnBox: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 8,
    paddingRight: 8
  },
  longBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  longBtnText: {
    color: '#fff',
    fontSize: 16
  },
  longSimpleBtn: {
    backgroundColor: '#fff',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ebebeb',
    borderWidth: 1
  },
  longSimpleBtnText: {
    color: '#333',
    fontSize: 16
  },
  //end longBtn

  //begin sendBtn
  sendBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: '#fff',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#000',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5
  },
  sendText: {
    fontSize: 14,
    color: '#000'
  },
  //end sendBtn

  //begin submit
  submitBox: {
    width: 94,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    height: 36
  },
  autoFixedSubmitBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 18,
    height: 36
  },
  submitBtn: {
    //borderWidth: 1,
    //borderColor: '#cb4255',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitBtnText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  }
  //end submit
});
