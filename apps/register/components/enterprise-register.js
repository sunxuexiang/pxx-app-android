import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  PixelRatio,
  TouchableOpacity,
  Image,
  Keyboard,
  ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Relax, msg } from 'plume2';
import * as Button from 'wmkit/button';
import {
  FormInput,
  FormSelectReq,
  ValidConst,
  PhysiquePicker,
  WMImage,
  WmUpload,
  noop,
  FormSelect
} from 'wmkit';
import { isAndroid, mainColor, screenWidth } from 'styles';
import * as _ from 'wmkit/common/util';
// import EnterpriseFile from './enterprise-file';
import Lightbox from 'react-native-lightbox';
import LinearGradient from 'react-native-linear-gradient';

const LongButton = Button.LongButton;
const SendButton = Button.SendButton;
@Relax
export default class EnterpriseRegister extends React.Component {
  static relaxProps = {
    setFieldValue: () => {},
    sendEnterpriseRegisterCode: () => {},
    toggleEnterprise: () => {},
    toggleBackEnterprise: () => {},
    setEnterpriseFieldValue: () => {},
    doEnterpriseRegister: () => {},
    registerPass: 'registerPass',
    registerCode: 'registerCode',
    showRegisterPass: 'showRegisterPass',
    registerAccount: 'registerAccount',
    //显示企业账户信息
    showEnterpriseMoreInfo: 'showEnterpriseMoreInfo',
    enterpriseInfoVO: 'enterpriseInfoVO',
    toggleShowEnterpriseAgreement: () => {},
    doEnterpriseSubmit: () => {},
    enterpriseCheckState: 'enterpriseCheckState',
    enterpriseCheckTip: 'enterpriseCheckTip',
    toggleBackLogin: () => {},
    registerLimitType: 'registerLimitType',
    openFlag: 'openFlag',
    addImage: () => {},
    removeImage: () => {},
    images: 'images'
  };
  isClickCenter = false;
  /**
   * 点击空白隐藏键盘
   * @private
   */
  _dismissKeyboard = () => {
    setTimeout(() => {
      if (!this.isClickCenter) {
        Keyboard.dismiss();
      }
    }, 100); // 延时100毫秒等待事件传递完成;
  };

  render() {
    const {
      setFieldValue,
      showRegisterPass,
      sendEnterpriseRegisterCode,
      doEnterpriseRegister,
      toggleBackEnterprise,
      registerAccount,
      toggleShowEnterpriseAgreement,
      showEnterpriseMoreInfo,
      enterpriseInfoVO,
      setEnterpriseFieldValue,
      doEnterpriseSubmit,
      enterpriseCheckState,
      enterpriseCheckTip,
      toggleEnterprise,
      registerLimitType,
      openFlag,
      toggleBackLogin,
      images
    } = this.props.relaxProps;
    let businessNatureName =
      enterpriseInfoVO.get('businessNatureType') === 1
        ? '政府机关/事业单位'
        : enterpriseInfoVO.get('businessNatureType') === 2
        ? '国营'
        : enterpriseInfoVO.get('businessNatureType') === 3
        ? '私营'
        : enterpriseInfoVO.get('businessNatureType') === 4
        ? '中外合资'
        : enterpriseInfoVO.get('businessNatureType') === 5
        ? '外资'
        : enterpriseInfoVO.get('businessNatureType') === 6
        ? '其他'
        : '请选择';

    let disabledFlag = enterpriseCheckState === 1;

    let tipFlag = enterpriseCheckState === 1 || enterpriseCheckState === 3;
    let tipMessage = disabledFlag
      ? '您提交的账户信息正在审核中，请耐心等待。'
      : '您提交的账户信息审核未通过！';
    let disabledStyle = disabledFlag ? { color: 'grey' } : {};
    return (
      <View
        style={styles.containerBox}
        onStartShouldSetResponderCapture={() => {
          this.isClickCenter = false;
          this._dismissKeyboard();
          return false;
        }}
      >
        {
          //注册完成后是否需要完善信息,或者登录后判断是否需要完善信息
          !showEnterpriseMoreInfo ? (
            <KeyboardAwareScrollView
              alwaysBounceVertical={false}
              style={styles.container}
            >
              <View
                onStartShouldSetResponderCapture={() => {
                  // 内层view后捕获事件;
                  this.isClickCenter = true;
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.title} allowFontScaling={false}>
                    企业用户注册
                  </Text>
                  <View style={styles.item}>
                    <Image
                      style={styles.intIcon}
                      source={require('../img/phone.png')}
                    />
                    <TextInput
                      autoFocus={window.keyBoardShow}
                      style={styles.input}
                      placeholder="请输入您的手机号码"
                      keyboardType="numeric"
                      maxLength={11}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#999"
                      onChangeText={(value) =>
                        setFieldValue({
                          field: 'registerAccount',
                          value: value
                        })
                      }
                    />
                  </View>
                  <View style={styles.item}>
                    <Image
                      style={styles.intIcon}
                      source={require('../img/code.png')}
                    />
                    <View style={styles.rightBox}>
                      <TextInput
                        style={styles.input}
                        placeholderTextColor="#999"
                        placeholder="请输入验证码"
                        keyboardType="numeric"
                        maxLength={6}
                        underlineColorAndroid="transparent"
                        onChangeText={(value) =>
                          setFieldValue({ field: 'registerCode', value: value })
                        }
                      />
                      <SendButton
                        clickValid={() => this._sendCode(registerAccount)}
                        resetWhenError
                        time={60}
                        disableBdColor={{ borderColor: 'transparent' }}
                        btnTextStyle={{ color: mainColor }}
                        btnStyle={styles.btnStyle}
                        onClick={() =>
                          sendEnterpriseRegisterCode(registerAccount)
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.item}>
                    <Image
                      style={styles.intIcon}
                      source={require('../img/pass.png')}
                    />
                    <TextInput
                      style={styles.input}
                      secureTextEntry={!showRegisterPass}
                      maxLength={16}
                      keyboardType="ascii-capable"
                      returnKeyType="done"
                      restrict="a-zA-Z0-9"
                      placeholder="请输入6-16位字母或数字密码"
                      autoCapitalize="none"
                      placeholderTextColor="#999"
                      underlineColorAndroid="transparent"
                      onChangeText={(value) =>
                        setFieldValue({ field: 'registerPass', value: value })
                      }
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setFieldValue({
                          field: 'showRegisterPass',
                          value: !showRegisterPass
                        })
                      }
                    >
                      <Image
                        style={styles.imgEyes}
                        source={
                          showRegisterPass
                            ? require('wmkit/theme/open-eyes.png')
                            : require('../img/close-eyes.png')
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.registerLink}>
                    <Text allowFontScaling={false} style={styles.smallText}>
                      点击注册代表您已阅读并接受
                    </Text>
                    <TouchableOpacity
                      onPress={() => toggleShowEnterpriseAgreement()}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[styles.smallText, { color: mainColor }]}
                      >
                        《企业用户注册协议》
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => doEnterpriseRegister()}>
                    <LinearGradient
                      colors={[mainColor, mainColor]}
                      style={[styles.btn, { backgroundColor: mainColor }]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                    >
                      <Text allowFontScaling={false} style={[styles.whiteText]}>
                        注册
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          ) : (
            <KeyboardAwareScrollView
              alwaysBounceVertical={false}
              style={styles.moreContainer}
            >
              {tipFlag && (
                <View style={styles.tipsBox}>
                  <Image
                    source={require('../img/tip-01.jpg')}
                    style={{
                      height: 30,
                      width: 30,
                      marginBottom: 20,
                      marginTop: 20
                    }}
                  />
                  <View style={{ marginBottom: 10, marginLeft: 10 }}>
                    <Text>{tipMessage}</Text>
                  </View>
                  {!disabledFlag && (
                    <View style={{ alignItems: 'center' }}>
                      <Text className="text-img">
                        {'原因是:' + enterpriseCheckTip}
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        请您修改公司信息后重新提交
                      </Text>
                    </View>
                  )}
                </View>
              )}

              <View
                onStartShouldSetResponderCapture={() => {
                  // 内层view后捕获事件;
                  this.isClickCenter = true;
                }}
              >
                <View style={styles.header}>
                  <View style={{ width: screenWidth / 2 }}>
                    <Text allowFontScaling={false} style={styles.text}>
                      企业用户注册
                    </Text>
                    <Text allowFontScaling={false} style={styles.secondText}>
                      填写公司信息
                    </Text>
                  </View>
                </View>

                <PhysiquePicker
                  ref={(ref) => (this.areaPicker = ref)}
                  value={
                    enterpriseInfoVO.get('businessNatureType')
                      ? enterpriseInfoVO.get('businessNatureType')
                      : null
                  }
                  title={'请选择'}
                  disabled={disabledFlag}
                  onChange={(val) =>
                    setEnterpriseFieldValue({
                      field: 'businessNatureType',
                      value: val
                    })
                  }
                >
                  <FormSelect
                    label="公司性质"
                    style={disabledStyle}
                    disabled={disabledFlag}
                    placeholder={`${
                      businessNatureName ? businessNatureName : '请选择'
                    }`}
                  />
                </PhysiquePicker>

                <FormInput
                  label="公司名称"
                  required
                  placeholder="请按营业执照填写"
                  disabled={disabledFlag}
                  style={disabledStyle}
                  defaultValue={enterpriseInfoVO.get('enterpriseName')}
                  onChange={(value) =>
                    setEnterpriseFieldValue({ field: 'enterpriseName', value })
                  }
                />

                <FormInput
                  label="统一社会信用代码"
                  required
                  placeholder="即纳税人识别号（税号）"
                  maxLength={60}
                  disabled={disabledFlag}
                  style={disabledStyle}
                  defaultValue={enterpriseInfoVO.get('socialCreditCode')}
                  onChange={(value) =>
                    setEnterpriseFieldValue({
                      field: 'socialCreditCode',
                      value
                    })
                  }
                />

                <View style={styles.box}>
                  <Text allowFontScaling={false} style={styles.text1}>
                    <Text style={{ color: 'red' }}>*</Text>
                    上传营业执照
                  </Text>
                  <ScrollView
                    contentContainerStyle={{
                      paddingVertical: 20,
                      paddingLeft: 140
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={styles.row}
                  >
                    {images.toArray().map((v, index) => {
                      return (
                        <View
                          key={v}
                          style={{ marginRight: 10, borderColor: '#ebebeb' }}
                        >
                          <WMImage
                            key={Math.random()}
                            resizeMode="contain"
                            style={styles.pic}
                            zoom
                            src={v}
                          />

                          {enterpriseCheckState !== 1 && (
                            <TouchableOpacity
                              style={styles.close1}
                              onPress={() => this.removeImage(index)}
                            >
                              <Text allowFontScaling={false} style={styles.cha}>
                                ×
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}

                    {images.count() < 1 ? (
                      <WmUpload
                        beforeUpload={() => this._disableBtn()}
                        onChange={(url) => this._uploadImage(url)}
                      />
                    ) : null}
                  </ScrollView>

                  <View style={styles.tipsBottom}>
                    <Lightbox
                      springConfig={{ tension: 15, friction: 7 }}
                      swipeToDismiss={false}
                      underlayColor="white"
                      backgroundColor="rgba(0,0,0,0.6)"
                      renderContent={() =>
                        this._renderCarousel(require('../img/demo-01.jpeg'))
                      }
                    >
                      <View activeOpacity={0.8} style={styles.imgBox}>
                        <Image
                          style={styles.image}
                          source={require('../img/ask-01.png')}
                        />
                      </View>
                    </Lightbox>
                    <Text style={styles.tipsBottomText}>
                      &nbsp;&nbsp;仅支持jpg、jpeg、png、gif文件，最多上传1张，大小不超过2M
                    </Text>
                  </View>
                </View>

                {openFlag === 1 ? (
                  <FormInput
                    label="邀请码"
                    required={registerLimitType === 1}
                    placeholder="请输入您获得的邀请码"
                    disabled={disabledFlag}
                    style={disabledStyle}
                    defaultValue={enterpriseInfoVO.get('inviteCode')}
                    onChange={(value) =>
                      setEnterpriseFieldValue({ field: 'inviteCode', value })
                    }
                  />
                ) : null}
              </View>
              {enterpriseCheckState !== 1 && (
                <LongButton text="注册" onClick={() => doEnterpriseSubmit()} />
              )}
            </KeyboardAwareScrollView>
          )
        }

        {/*第1步的返回弹窗*/}

        {!showEnterpriseMoreInfo && (
          <TouchableOpacity
            style={styles.closeBox}
            activeOpacity={0.8}
            onPress={() => {
              debugger
              toggleEnterprise(false);
            }}
          >
            <Image source={require('../img/back-02.png')} style={styles.back} />
          </TouchableOpacity>
        )}

        {/*第2步的返回弹窗*/}

        {showEnterpriseMoreInfo &&
        enterpriseCheckState !== 1 &&
        enterpriseCheckState !== 3 ? (
          <TouchableOpacity
            style={styles.closeBox}
            activeOpacity={0.8}
            onPress={() => {
              toggleBackEnterprise();
            }}
          >
            <Image source={require('../img/back-02.png')} style={styles.back} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.closeBox}
            activeOpacity={0.8}
            onPress={() => {
              toggleBackLogin();
            }}
          >
            <Image source={require('../img/back-02.png')} style={styles.back} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  /**
   * 禁用/启用 提交按钮
   * @private
   */
  _disableBtn = () => {
    // this.setState({
    //   disabled: !this.state.disabled
    // });
  };

  _renderCarousel = (imageSource) => (
    <Image
      style={{ flex: 1, width: screenWidth, height: screenWidth }}
      resizeMode="contain"
      source={imageSource}
    />
  );

  /**
   * 上传附件
   */
  _uploadImage = (url) => {
    const { addImage } = this.props.relaxProps;
    if (url) {
      addImage(url);
    }
  };

  /**
   * 删除附件
   */
  removeImage = (index) => {
    const { removeImage } = this.props.relaxProps;
    removeImage(index);
  };

  _sendCode = (mobile) => {
    const regex = ValidConst.phone;
    if (mobile == '') {
      msg.emit('app:tip', '手机号不能为空');
      return false;
    } else if (!regex.test(mobile)) {
      msg.emit('app:tip', '手机号格式有误');
      return false;
    } else {
      return true;
    }
  };
}

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  tipsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    paddingHorizontal: 30
  },

  container: {
    width: screenWidth - 40
  },
  moreContainer: {
    ..._.ifIphoneX(
      {
        marginTop: 85
      },
      {
        marginTop: isAndroid ? 50 : 70
      }
    ),
    width: '100%',
    flex: 1
  },
  closeBox: {
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 30
      },
      {
        top: isAndroid ? 0 : 20
      }
    ),
    left: 0,
    padding: 20
  },
  close: {
    width: 16,
    height: 16
  },
  back: {
    width: 25,
    height: 25
  },
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: '#000',
    fontSize: 16,
    ..._.ifIphoneX(
      {
        marginTop: 85
      },
      {
        marginTop: isAndroid ? 50 : 70
      }
    ),
    marginBottom: 20,
    textAlign: 'center'
  },
  intIcon: {
    width: 20,
    height: 20
  },
  input: {
    color: '#333',
    fontSize: 14,
    textAlign: 'left',
    flex: 1
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 4
  },
  registerLink: {
    paddingVertical: 12,
    flexDirection: 'row'
  },
  smallText: {
    fontSize: 10,
    color: '#999'
  },
  imgEyes: {
    width: 22,
    height: 22,
    marginLeft: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 33
  },
  img: {
    width: 45.5,
    height: 57.5
  },
  text: {
    color: '#333333',
    fontSize: 17,
    lineHeight: 20,
    marginLeft: 50,
    marginBottom: 8
  },
  text1: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 0,
    marginBottom: 8
  },
  secondText: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 60
  },
  tip: {
    color: '#999',
    fontSize: 12
  },
  box: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#ebebeb',
    borderTopColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    padding: 10,
    marginBottom: 10
  },
  deletePic: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#eee',
    position: 'absolute',
    top: -10,
    right: -10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteIcon: {
    tintColor: '#999',
    width: 10,
    height: 10,
    transform: [{ rotate: '45deg' }]
  },
  pic: {
    width: 50,
    height: 50
  },
  row: {
    flexDirection: 'row'
  },
  image: {
    height: 15,
    width: 15,
    marginRight: 12,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#dddddd'
  },
  cha: {
    color: '#ffffff',
    fontSize: 12
  },
  example: {
    fontSize: 12,
    color: '#ffffff'
  },
  imgBox: {
    width: 15,
    height: 15
  },
  shadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tipsBottom: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tipsBottomText: {
    fontSize: 11
  },
  close1: {
    width: 13,
    height: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6.5,
    position: 'absolute',
    right: 2,
    top: 2
  },
  btnStyle: {
    paddingLeft: 8,
    borderColor: 'transparent',
    borderLeftWidth: 1 / PixelRatio.get(),
    paddingRight: 0,
    marginLeft: 0
  },
  btn: {
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  whiteText: {
    color: '#fff',
    fontSize: 16
  }
});
