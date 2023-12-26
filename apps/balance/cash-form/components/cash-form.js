import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax } from 'plume2';
import FormInput from 'wmkit/form/form-input';
import { noop } from 'wmkit/noop';
import ValidConst from 'wmkit/validate';
import { Const } from 'wmkit/const';
import * as _ from 'wmkit/common/util';
import LinearGradient from 'react-native-linear-gradient';
import { mainColor } from '@/wmkit/styles';

@Relax
export default class CashForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 输入框的提现金额
      inputValue: '',
      // 输入值是否正确,是否可以提交 默认不能提交到下一步
      canSubmit: false,
      // 错误提示语
      noticeTitle: ''
    };
  }

  static relaxProps = {
    headImgUrl: 'headImgUrl',
    nickName: 'nickName',
    myBalance: 'myBalance',
    alreadyDrawCash: 'alreadyDrawCash',
    customerDrawCashInfo: 'customerDrawCashInfo',
    changeCustomerDrawCashInfo: noop,
    drawNext: noop
  };

  render() {
    const {
      headImgUrl,
      nickName,
      myBalance,
      alreadyDrawCash,
      customerDrawCashInfo,
      changeCustomerDrawCashInfo
    } = this.props.relaxProps;
    // 提现上限
    const maxLimit =
      myBalance > Const.MAX_DRAW_CASH ? Const.MAX_DRAW_CASH : myBalance;
    // 可提现金额，余额小于限定金额10000，则是余额，否则取限定金额
    let canDrawCash = maxLimit;
    if (alreadyDrawCash) {
      // 已提现金额 < 最大限额
      if (alreadyDrawCash < Const.MAX_DRAW_CASH) {
        // 剩余可提现金额 =（最大限额 - 已提现金额）
        let restDrawCash = _.sub(Const.MAX_DRAW_CASH, alreadyDrawCash);
        canDrawCash = maxLimit > restDrawCash ? restDrawCash : maxLimit;
      } else {
        canDrawCash = 0;
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.avaBox}>
          <View style={styles.pointerBox}>
            <Image
              style={styles.pointer}
              source={
                headImgUrl
                  ? { uri: headImgUrl }
                  : require('../img/default-img.png')
              }
            />
          </View>
          <Text style={styles.pointerText} allowFontScaling={false}>
            {nickName}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.title} allowFontScaling={false}>
              提现金额
            </Text>
            <View style={styles.money}>
              <TextInput
                style={styles.number}
                keyboardType="numeric"
                value={this.state.inputValue + ''}
                placeholder={`本次最多可提现￥${canDrawCash}`}
                maxLength={8}
                underlineColorAndroid="transparent"
                onChangeText={(text) => this._setInput(text, canDrawCash)}
              />
              <TouchableOpacity
                style={styles.cashBtn}
                activeOpacity={0.8}
                onPress={() => this._setDrawCash(canDrawCash)}
              >
                <Text style={[styles.cashText, { color: mainColor }]} allowFontScaling={false}>
                  全部提现
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.canSubmit && (
            <View style={styles.cashBox}>
              <Text allowFontScaling={false} style={[styles.errorText, { color: mainColor }]}>
                {this.state.noticeTitle}
              </Text>
            </View>
          )}
        </View>
        <FormInput
          // style={{ marginHorizontal: 0,height: 54 }}
          label={'备注'}
          rightStyle={{marginLeft: 28}}
          placeholder="(非必填)最多输入50字"
          defaultValue={customerDrawCashInfo.get('drawCashRemark')}
          onChange={(text) =>
            changeCustomerDrawCashInfo('drawCashRemark', text)
          }
          maxLength={50}
        />
        {this.state.canSubmit || !this.state.inputValue ? (
          <View style={[styles.submit, { backgroundColor: '#ccc' }]}>
            <Text allowFontScaling={false} style={styles.submitText}>
              提交
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this._paymentPass()}
          >
            <LinearGradient
              colors={[mainColor, mainColor]}
              style={styles.submit}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text allowFontScaling={false} style={styles.submitText}>
                提交
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  /**
   * 提现金额input输入
   * @param inputMoney 输入的提现金额
   * @param canDrawCash 可提现金额
   */
  _setInput(inputMoney, canDrawCash) {
    const regex = ValidConst.price;
    if (!inputMoney) {
      this.setState({ canSubmit: false, inputValue: '', noticeTitle: '' });
    } else {
      this.setState({
        inputValue: inputMoney,
        canSubmit: true,
        noticeTitle: ''
      });
      // 输入不合法
      if (!regex.test(inputMoney)) {
        this.setState({ noticeTitle: '输入有效金额（保留两位小数）' });
      } else if (inputMoney > canDrawCash) {
        // 提现金额超出我的余额
        this.setState({ noticeTitle: '输入金额超过可提现金额' });
      } else if (inputMoney < Const.MIN_DRAW_CASH) {
        // 最少提现金额不可小于1元
        this.setState({
          noticeTitle: `最少提现金额不可小于${Const.MIN_DRAW_CASH}元`
        });
      } else {
        this.setState({ canSubmit: false });
        // 输入合法，设置提现金额
        this._setDrawCash(inputMoney);
      }
    }
  }

  /**
   * 全部提现，设置提现金额
   * @param drawCash
   * @private
   */
  _setDrawCash = (drawCash) => {
    this.setState({ inputValue: drawCash });
    const { changeCustomerDrawCashInfo } = this.props.relaxProps;
    changeCustomerDrawCashInfo('drawCashSum', drawCash);
  };

  /**
   * 提交提现申请
   * @private
   */
  _paymentPass = () => {
    const { drawNext } = this.props.relaxProps;
    if (this.state.canSubmit || !this.state.inputValue) {
      return;
    }
    drawNext(this.state.inputValue);
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 32,
    paddingHorizontal: 16
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10
  },
  tip: {
    width: 20,
    height: 20,
    marginRight: 12
  },
  tipText: {
    fontSize: 12,
    color: '#333'
  },
  avaBox: {
    alignItems: 'center'
  },
  pointerBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: 'hidden'
  },
  pointer: {
    width: 64,
    height: 64
  },
  pointerText: {
    fontSize: 12,
    color: '#000',
    marginTop: 12
  },
  form: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 32
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  title: {
    fontSize: 14,
    color: '#333'
  },
  money: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 54,
    marginLeft: 10,
    position: 'relative'
  },
  unit: {
    width: 18,
    height: 22
  },
  number: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    borderWidth: 0
  },
  cashBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12
  },
  cashMoney: {
    fontSize: 13,
    color: '#999999'
  },
  cashBtn: {
    position: 'absolute',
    right: 0
  },
  cashText: {
    fontSize: 14
  },
  submit: {
    marginTop: 24,
    backgroundColor: '#FF1F4E',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    borderRadius: 18
  },
  submitText: {
    fontSize: 14,
    color: '#fff'
  },
  errorText: {
    fontSize: 12
  }
});
