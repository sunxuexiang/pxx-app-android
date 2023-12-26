import React from 'react';
import {msg } from 'plume2';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Platform
} from 'react-native';
import { priceColor } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import {List} from 'immutable';

/**
 * num input
 */
export default class NumInput extends React.PureComponent {
  input;
  // 连续点击处理定时器
  timer;

  static defaultProps = {
    //值
    value: 0,
    min: 0,
    //组件禁用
    disableNumberInput: false,
    //禁用 +
    disableAdd: false,
    // //禁用 -
    disableSubtraction: false,
    // //组件错误
    error: '',
    max: 99999,
    // 值改变时回调，值发生变化立即触发
    onChange: noop,
    // 值改变时回调，延时触发，200ms内多次连续操作只触发一次
    onDelayChange: noop,
    // 点击加号回调，两个参数：1.加号是否已禁用 2.this.state.value+1
    onAddClick: noop,
    //增加的步长
    addStep: 1,
    //是否展示限制弹窗
    tipShow: false,
  };

  state = {
    //是否禁用该组件
    disableNumberInput: this.props.disableNumberInput,
    //是否禁用左边的按钮
    disableAdd: this.props.disableAdd,
    disableSubtraction: this.props.disableSubtraction,
    addStep: this.props.addStep,
    value: this.props.defaultValue || this.props.value,
    // 计数器，用户直接输入触发setState时+1
    counter: 0, // 为了解决输入框连续输入字母后只有第一次重置为min问题：当value已经等于min时，再输入字母，正则校验失败并且通过setState
    // 设置value=min，这时state没有改变，不会触发re-render，输入框就会一直保留刚才输入的字母
    error: '',
    startPosition: 0,
    endPosition: 0
  };

  UNSAFE_componentWillMount() {
    this.validSku();
    if (this.state.value <= this.props.min || this.state.disableNumberInput) {
      this.setState({ disableSubtraction: true });
    }
    if (this.state.value >= this.props.max || this.state.disableNumberInput) {
      this.setState({ disableAdd: true });
    }
  }

  /**
   * 会出现父组件主动重置value的业务，这里重新设置一下。如果还有其他props会改变，需要在这里赋值
   * @param {Readonly<P>} nextProps
   * @param nextStat
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
      this.validSku();
    }
    if (nextProps.disableNumberInput) {
      this.setState({
        disableAdd: true,
        disableSubtraction: true,
        disableNumberInput: true
      });
    } else {
      this.setState({
        disableAdd: false,
        disableSubtraction: false,
        disableNumberInput: false
      });
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  componentDidUpdate() {
    this.setState({
      disableSubtraction:
        this.props.disableSubtraction || this.state.value <= this.props.min
    });
    this.setState({
      disableAdd: this.props.disableAdd || this.state.value >= this.props.max
    });
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      disableAdd,
      disableSubtraction,
      disableNumberInput,
      value
    } = this.state;

    const isDisableSub = !!(disableSubtraction || disableNumberInput);
    const isDisableAdd = !!(disableAdd || disableNumberInput);

    return (
      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <View style={styles.box}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.leftCon}
            onPress={() => this._handleSubtract()}
          >
            <View style={styles.navItem}>
              <Image
                source={isDisableSub ? require('./img/reduceg.png') : require('./img/reduce.png')}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.input}>
            {value && value > 0 ? <TextInput
              editable={!disableNumberInput}
              selection={{start: this.state.startPosition, end: this.state.endPosition}}
              style={[
                styles.blueText,
                disableNumberInput && { color: 'rgba(0,0,0,0.4)' }
              ]}
              value={value.toString()}
              underlineColorAndroid="transparent"
              onChangeText={(text) => this._handleChange(text)}
              keyboardType={
                Platform.OS === 'android' ? 'numeric' : 'number-pad'
              }
              onFocus={this._handleFocus.bind(this)}
              onBlur={this._handleBlur}
            /> : <TextInput
            editable={!disableNumberInput}
            style={[
              styles.blueText,
              disableNumberInput && { color: 'rgba(0,0,0,0.4)' }
            ]}
            value={value.toString()}
            underlineColorAndroid="transparent"
            onChangeText={(text) => this._handleChange(text)}
            keyboardType={
              Platform.OS === 'android' ? 'numeric' : 'number-pad'
            }
            onFocus={this._handleFocus.bind(this)}
            onBlur={this._handleBlur}
          />}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.rightCon}
            onPress={() => this._handleAdd()}
          >
            <View style={styles.navItem}>
              <Image
                source={isDisableAdd ? require('./img/addg.png') : require('./img/add.png')}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        </View>
        {this.props.showStateError &&
          <View
            style={ styles.errorBox}
          >
            <Text style={[styles.red, { color: priceColor }]} allowFontScaling={false}>
              {this.state.error}
            </Text>
          </View>
        }
        {this.props.error ? (
          <View
            style={ styles.errorBox}
          >
            <Text style={[styles.red, { color: priceColor }]} allowFontScaling={false}>
              {this.props.error}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  _handleFocus() {
    const val = this.state.value;
    this.setState({
      startPosition: val.toString().length,
      endPosition: val.toString().length
    });
  }

  _handleAdd() {
    const { disableAdd, disableNumberInput } = this.state;
    const addStep = this.props.addStep;
    const step = addStep ? addStep: 1;
    const onAddClick = this.props.onAddClick;
    const value = this.state.value + step;

    // 是否不能点击
    const disabled = disableAdd || disableNumberInput;
    if (onAddClick) {
      onAddClick(disabled, value);
    }
    if (disabled) {
      return;
    }

    this._handleTimeout(value);
    const onChange = this.props.onChange;
    this.setState({ value: value }, () => {
      this.validSku();
      if (onChange) {
        onChange(this.state.value);
      }
    });
  }

  _handleSubtract() {
    const onChange = this.props.onChange;
    const addStep = this.props.addStep;
    if (this.state.disableSubtraction || this.state.disableNumberInput) {
      return;
    }
    const step = addStep ? addStep : 1;
    const value = this.state.value - step;

    this._handleTimeout(value);
    this.setState({ value: value }, () => {
      this.validSku();
      if (onChange) {
        onChange(this.state.value);
      }
    });
  }

  _handleChange = (text) => {
    const onChange = this.props.onChange;
    if(text) {
      const reg = /^[0-9]*$/;

      // 如果不是合法的数字或者数字小于min，重置为min
      let value = !reg.test(text) || Number(text) < 0 ? 0 : Number(text);

      // counter+1，避免value相同时不re-render
      const counter = this.state.counter + 1;
      //最大值最小值处理
      if (value > this.props.max) {
        value = this.props.max;
        // if (this.props.tipShow) {
        //   msg.emit('app:tip', `该商品当前库存剩余${this.props.max}件`);
        // }
      }

      this._handleTimeout(value);
      this.setState({ value: value, counter: counter }, () => {
        const len = value.toString().length;
        this.setState({
          startPosition: len,
          endPosition: len
        });
        this.validSku();
        if (this.state.value < this.props.min) {
          return;
        }
        if (onChange) {
          onChange(this.state.value);
        }
      });
    } else {
      this.setState({ value: ''});
    }
  };

  /**
   * 输入框离开数字恢复最小值
   * @param e
   * @private
   */
  _handleBlur = () => {
    this.setState({
      startPosition: 0,
      endPosition: 0
    });
    const onChange = this.props.onChange;
    // const onDelayChange = this.props.onDelayChange;
    if (this.state.value < this.props.min) {
      const counter = this.state.counter + 1;
      this._handleTimeout(this.props.min);
      this.setState({ value: this.props.min, counter: counter }, () => {
        if (onChange) {
          onChange(this.state.value);
        }

        // onDelayChange && onDelayChange(this.state.value);
      });
    }
  };

  /**
   * 延时处理
   * @private
   */
  _handleTimeout = (value) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      const onDelayChange = this.props.onDelayChange;
      if (onDelayChange) {
        onDelayChange(value);
      }
    }, 200);
  };

  /**
   * 校验sku数量 规则如下, 少于限定 更新限定 大于起订跟库存，显示起订跟库存
   * @param skuNum
   * @param skuId
   * @returns {string}
   */
  validSku = () => {
    let msgArray = List.of();
    //购买数量
    const skuNum = this.state.value;
    //起售数量
    const min = this.props.minCount;
    //最大可购数量
    const max = this.props.maxCount || this.props.maxCount === 0 ? this.props.maxCount : Infinity;
    //库存
    const stock = this.props.max;

    //没有库存，商品失效都不做check
    if (
      stock === 0 ||
      this.props.delFlag === 1 ||
        this.props.addedFlag === 0 ||
      stock < min
    ) {
      this.setState({
        error: ''
      });
    } else {
      if (min && skuNum < min) {
        msgArray = msgArray.push(`${min}起订`);
      }
      //当大于可购跟库存 取可购跟库存最小值
      if (((max || max === 0) && skuNum > max) || skuNum >= stock) {
        //可购跟库存最小值
        const maxNum = Math.min(max, stock);
        if (maxNum === max) {
          msgArray = msgArray.push(`可购${maxNum || 0}`);
        } else {
          msgArray = msgArray.push(`库存${stock}`);
        }
      }
      this.setState({
        error: msgArray.count() > 0 ? msgArray.join('|') : ''
      });
    }
  };
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  leftCon: {
    paddingHorizontal: 10,
    marginLeft: -30
  },
  rightCon: {
    paddingHorizontal: 10,
    marginRight: -10
  },
  input: {
    height: 22,
    width: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  blueText: {
    flex: 1,
    height: 20,
    textAlign: 'center',
    width: 30,
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.8)',
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  icon: {
    width: 8,
    height: 8
  },
  red: {
    fontSize: 12,
    padding: 0
  },
  errorBox:{
  }
});
