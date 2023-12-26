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
import FormInput from 'wmkit/form/form-input';
import AreaPicker from 'wmkit/picker';
import FormSelect from 'wmkit/form/form-select';
import * as FindArea from 'wmkit/area/area';
import ValidConst from 'wmkit/validate';
import { isAndroid, mainColor, screenWidth, panelColor } from 'wmkit/styles/index';
import * as _ from '../../common/util';
import LinearGradient from 'react-native-linear-gradient';
import { Picker, List} from "@ant-design/react-native";
const LongButton = Button.LongButton;
const SendButton = Button.SendButton;
import moment from 'moment';
import { Const } from 'wmkit/const';

const customerRegisterTypes = [
  {id:0,name:'家用'},
  {id:2,name:'单位'},
  {id:1,name:'商户'},
];

const selectImage = require('wmkit/theme/check.png');
const unSelectImage = require('../img/uncheck.png');
/**
 * 注册
 */
@Relax
export default class Register extends React.Component {
  static relaxProps = {
    toggleVisible: () => {},
    setFieldValue: () => {},
    initPage: () => {},
    sendCode: () => {},
    doRegister: () => {},
    doPerfect: () => {},
    changeCustomerDetailField: () => {},
    getArea: () => {},
    toggleShowAgreement: () => {},
    toggleShowPrivacyPolicyAgreement: () => { },
    toggleEnterprise: () => {},
    onChangeBox: () => { },
    registerPass: 'registerPass',
    registerCode: 'registerCode',
    showRegisterPass: 'showRegisterPass',
    registerAccount: 'registerAccount',
    //显示完善账户信息
    showImproveInfo: 'showImproveInfo',
    //会员基本信息
    customerDetail: 'customerDetail',
    customerEnterprise: 'customerEnterprise',
    iepFlag: 'iepFlag',
    setCustomerEnterprise: () => {},
    images:'images',
    addImage: () => {},
    removeImage: () =>{}
  };
  isClickCenter = false;

  state = {
    chooseRegisterType:0
  };

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
      sendCode,
      doRegister,
      showImproveInfo,
      customerDetail,
      changeCustomerDetailField,
      getArea,
      doPerfect,
      toggleVisible,
      initPage,
      registerAccount,
      toggleShowAgreement,
      iepFlag,
      toggleEnterprise,
      customerEnterprise,
      setCustomerEnterprise,
      toggleShowPrivacyPolicyAgreement,
      onChangeBox
    } = this.props.relaxProps;
    const {chooseRegisterType} = this.state;

    let provinceId = customerDetail.get('provinceId');
    let cityId = customerDetail.get('cityId');
    let areaId = customerDetail.get('areaId');
    const customer = customerDetail.toJS();
    //拼接省市区
    let area = provinceId
      ? cityId
        ? [provinceId.toString(), cityId.toString(), areaId.toString()]
        : [provinceId.toString()]
      : null;
    //拼接省市区名字
    let areaName = FindArea.addressInfo(provinceId, cityId, areaId);
    const { IsCheck } = this.props
    // 性别
    let genderName =
      customer.gender === 0 ? '女' : customer.gender == 1 ? '男' : '请选择';

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
          !showImproveInfo ? (
            <View>
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
                      请使用有效手机号注册
                    </Text>
                    <View style={styles.item}>
                      <Image
                        style={styles.intIcon}
                        source={require('../img/phone.png')}
                      />
                      <TextInput
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
                          onClick={() => sendCode(registerAccount)}
                          disableBdColor={{ borderColor: 'transparent' }}
                          btnTextStyle={{ color: mainColor }}
                          btnStyle={styles.btnStyle}
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
                        secureTextEntry={showRegisterPass ? false : true}
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
                          style={[styles.imgEyes, showRegisterPass ? {tintColor: mainColor} : {}]}
                          source={
                            showRegisterPass
                              ? require('wmkit/theme/open-eyes.png')
                              : require('../img/close-eyes.png')
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.itemTwo}>
                      <View style={styles.spec}>
                        <Text allowFontScaling={false} style={{ color: '#333' }}>
                          会员类型
                        </Text>
                        <ScrollView
                          horizontal={true}
                          alwaysBounceHorizontal={false}
                          contentContainerStyle={styles.rowFlex}
                        >
                          {customerRegisterTypes.map((type)=>{
                            return(
                              <View style={styles.specBox} key={type.id}>
                                <TouchableOpacity
                                  key={type.id}
                                  style={[
                                    styles.specItem,
                                    chooseRegisterType == type.id
                                      ? { borderColor: mainColor, backgroundColor: panelColor }
                                      : styles.invalidItem
                                  ]}
                                  onPress={() =>
                                    this._changeRegisterType(
                                      chooseRegisterType == type.id
                                        ? null
                                        : type.id
                                    )}
                                  activeOpacity={0.8}
                                >
                                  <Text
                                    style={[
                                      styles.specText,
                                      chooseRegisterType == type.id
                                        ? { color: mainColor }
                                        : styles.invalidText
                                    ]}
                                    allowFontScaling={false}
                                  >
                                    {type.name}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                        </ScrollView>
                      </View>
                    </View>

                    <View style={styles.itemTwo}>
                      <FormInput
                        label="推荐业务员"
                        placeholder="请输入业务员工号"
                        defaultValue={customerEnterprise.get('employeeCode')}
                        maxLength={40}
                        onChange={(value) =>
                          setCustomerEnterprise({ filed: 'employeeCode', value: value })
                        }/>
                    </View>

                    {/* <View style={styles.itemTwo}>
                      <View style={styles.spec}>
                        <Text allowFontScaling={false} style={{ color: '#333' }}>
                          推荐业务员
                        </Text>
                        <Text allowFontScaling={false} style={styles.greyBolck}></Text>
                      </View>
                    </View> */}
                    <View style={styles.registerLink}>
                      <TouchableOpacity
                        style={styles.checkOut}
                        onPress={() =>  onChangeBox()}
                        activeOpacity={0.8}
                      >
                        <Image style={[styles.isCheck, IsCheck ? {tintColor: mainColor} : {}]} source={IsCheck ? selectImage : unSelectImage}></Image>
                      </TouchableOpacity>
                      <Text allowFontScaling={false} style={styles.smallText}>
                        我已阅读并同意
                      </Text>
                      <TouchableOpacity onPress={() => toggleShowAgreement()}>
                        <Text
                          allowFontScaling={false}
                          style={[styles.smallText, { color: mainColor }]}
                        >
                          《会员注册协议》
                        </Text>
                      </TouchableOpacity>
                      <Text
                        allowFontScaling={false}
                        style={[styles.smallText]}
                      >
                        和
                      </Text>
                      <TouchableOpacity
                        onPress={() => toggleShowPrivacyPolicyAgreement()}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[styles.smallText, { color: mainColor }]}
                        >
                          《隐私政策》
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </KeyboardAwareScrollView>
              <View style={{marginBottom: 15,marginHorizontal: 15}}>
                <TouchableOpacity onPress={() => doRegister()}>
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
                {iepFlag && (
                  <TouchableOpacity
                    style={{
                      paddingRight: 0,
                      width: 60,
                      marginTop: 20
                    }}
                    onPress={() => {
                      toggleEnterprise();
                    }}
                  >
                    <Text style={{ color: mainColor }}>企业注册</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <KeyboardAwareScrollView
              alwaysBounceVertical={false}
              style={styles.moreContainer}
            >
              <View
                onStartShouldSetResponderCapture={() => {
                  // 内层view后捕获事件;
                  this.isClickCenter = true;
                }}
              >
                <View style={styles.header}>
                  <Image style={styles.img} source={require('../img/fill.png')} />
                  <Text allowFontScaling={false} style={[styles.text, {marginTop: 12}]}>
                    您还需完善账户信息
                  </Text>
                  <Text allowFontScaling={false} style={styles.text}>
                    才可正常访问商品信息
                  </Text>
                </View>
                <View style={styles.container}>
                  <FormInput
                    autoFocus={window.keyBoardShow}
                    label="称呼"
                    required
                    placeholder="请填写您的称呼或您公司的名称"
                    defaultValue={customer.customerName}
                    onChange={(value) =>
                      changeCustomerDetailField({
                        field: 'customerName',
                        value
                      })
                    }
                  />
                  <DatePicker
                    mode="date"
                    minDate={new Date('1900-01-01')}
                    maxDate={new Date()}
                    value={
                      customer.birthDay ? new Date(customer.birthDay) : null
                    }
                    onChange={(date) => {
                      changeCustomerDetailField({
                        field: 'birthDay',
                        value: moment(date).format(Const.DATE_FORMAT)
                      });
                    }}
                    extra={
                      customer.birthDay
                        ? new Date(customer.birthDay)
                        : '暂时保密'
                    }
                  >
                    <FormSelect
                      label="生日"
                      placeholder={`${
                        customer.birthDay ? customer.birthDay : '暂时保密'
                      }`}
                    />
                  </DatePicker>
                  <Picker
                    data={[
                      { value: 1, label: '男' },
                      { value: 0, label: '女' }
                    ]}
                    cols={1}
                    title=""
                    value={customer.gender}
                    onChange={(value) => {
                      changeCustomerDetailField({ field: 'gender', value: value[0] });
                    }}
                  >
                    <FormSelect
                      label="性别"
                      placeholder={`${genderName ? genderName : '暂时保密'}`}
                    />
                  </Picker>
                  <AreaPicker
                    ref={(ref) => (this.areaPicker = ref)}
                    value={area}
                    title={'选择地址'}
                    onChange={(value) => getArea(value)}
                  >
                    <FormSelect
                      label="所在地区"
                      placeholder={`${areaName ? areaName : '请选择所在地区'}`}
                    />
                  </AreaPicker>
                  <FormInput
                    label="详细地址"
                    placeholder="请填写您的详细地址"
                    maxLength={60}
                    defaultValue={customer.customerAddress}
                    onChange={(value) =>
                      changeCustomerDetailField({
                        field: 'customerAddress',
                        value
                      })
                    }
                  />
                  <FormInput
                    label="联系人"
                    required
                    placeholder="请填写一位常用联系人"
                    defaultValue={customer.contactName}
                    onChange={(value) =>
                      changeCustomerDetailField({ field: 'contactName', value })
                    }
                  />
                  <FormInput
                    label="联系人电话"
                    required
                    placeholder="请填写联系人常用手机号"
                    defaultValue={customer.contactPhone}
                    maxLength={11}
                    keyboardType="numeric"
                    onChange={(value) =>
                      changeCustomerDetailField({
                        field: 'contactPhone',
                        value
                      })
                    }
                  />
                </View>
              </View>
              <LongButton text="提交" onClick={() => doPerfect()} />
            </KeyboardAwareScrollView>
          )
        }

        {/*关闭登录弹窗*/}
        <View style={styles.closeBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              toggleVisible({ visible: false });
              initPage();
            }}
          >
            <Image source={require('../img/close.png')} style={styles.close} />
          </TouchableOpacity>
        </View>
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

  /**
   * 上传附件
   */
  _uploadImage = (url) => {
    const { addImage } = this.props.relaxProps;
    if (url) {
      addImage(url);
    }
  };

  _renderCarousel = (imageSource) => (
    <Image
      style={{ flex: 1, width: screenWidth, height: screenWidth }}
      resizeMode="contain"
      source={imageSource}
    />
  );

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

  /**
   * 选择注册类型
   * @param id
   * @private
   */
  _changeRegisterType = (id) => {
    const { setCustomerEnterprise } = this.props.relaxProps;
    if(id != null){
      setCustomerEnterprise({filed:'customerRegisterType',value:id});
      this.setState({'chooseRegisterType':id});
    }
  };


  /**
   * 删除附件
   */
  removeImage = (index) => {
    const { removeImage } = this.props.relaxProps;
    removeImage(index);
  };
}

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingHorizontal: 20
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
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  close: {
    width: 16,
    height: 16
  },
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    width: screenWidth - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemTwo: {
    borderBottomColor: '#ebebeb'
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
    height: 20,
    marginRight: 6
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
  toLoginRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  arrow: {
    width: 12,
    height: 12
  },
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.4)',
    marginTop:3.5
  },
  imgEyes: {
    width: 22,
    height: 22,
    marginLeft: 10
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 36,
    paddingHorizontal: 12
  },
  img: {
    width: 48,
    height: 48
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    lineHeight: 22
  },
  tip: {
    color: '#999',
    fontSize: 12
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
  },
  checkOut: {
    width: 42,
    height: 39,
    paddingHorizontal: 13,
    paddingTop:13,
    marginHorizontal: -15,
    marginHorizontal: -8,
  },
  defaultSelect: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  isCheck: {
    width: 16,
    height: 16,
  },
  specBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#ebebeb',
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 7
  },
  invalidItem: {
    backgroundColor: '#ebebeb'
  },
  specText: {
    color: '#333',
    fontSize: 11
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  invalidText: {
    color: '#999'
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:25
  },
  text1: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 0,
    marginBottom: 8
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
  chooseItems: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 15,
    backgroundColor: '#ffffff'
  },
  bottom: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb'
  },
  pic: {
    width: 50,
    height: 50
  },
  cha: {
    color: '#ffffff',
    fontSize: 12
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
  greyBolck:{
    marginLeft:30,
    width:100,
    height:20,
    backgroundColor:'rgba(238,238,238,0.5)'
  }
});
