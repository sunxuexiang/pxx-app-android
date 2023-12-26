import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  PixelRatio,
  TouchableOpacity,
  Image,
  Keyboard, ScrollView,
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
import * as _ from 'wmkit/common/util';
import LinearGradient from 'react-native-linear-gradient';
import { Picker, List } from "@ant-design/react-native";
import WmUpload from 'wmkit/upload';
import WMImage from 'wmkit/image';
import Lightbox from 'react-native-lightbox';
const LongButton = Button.LongButton;
const SendButton = Button.SendButton;

const customerRegisterTypes = [
  {id:0,name:'家用'},
  {id:2,name:'单位'},
  {id:1,name:'商户'}
];

const customerTagName = {
  0:'零食店',
  1:'便利店',
  2:'商超',
  3:'二批商',
  4:'水果零售店',
  5:'连锁系统',
  6:'炒货店',
};


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
    toggleEnterprise: () => {},
    registerPass: 'registerPass',
    registerCode: 'registerCode',
    showRegisterPass: 'showRegisterPass',
    registerAccount: 'registerAccount',
    //显示完善账户信息
    showImproveInfo: 'showImproveInfo',
    //会员基本信息
    customerDetail: 'customerDetail',
    iepFlag: 'iepFlag',
    customerEnterprise: 'customerEnterprise',
    setCustomerEnterprise: () => {},
    images: 'images',
    addImage: () => {},
    removeImage: () =>{}
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

  state = {
    chooseRegisterType:0
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
      images
    } = this.props.relaxProps;
    const customerName = customerDetail.get('customerName');
    const customerAddress = customerDetail.get('customerAddress');
    const contactName = customerDetail.get('contactName');
    const contactPhone = customerDetail.get('contactPhone');
    let provinceId = customerDetail.get('provinceId');
    let cityId = customerDetail.get('cityId');
    let areaId = customerDetail.get('areaId');
    //拼接省市区
    let area = provinceId
      ? cityId
        ? [provinceId.toString(), cityId.toString(), areaId.toString()]
        : [provinceId.toString()]
      : null;
    //拼接省市区名字
    let areaName = FindArea.addressInfo(provinceId, cityId, areaId);
    const {chooseRegisterType} = this.state;
    const customerTag = customerEnterprise.get('customerTag') != null && customerEnterprise.get('customerTag') != undefined
      ? parseInt(customerEnterprise.get('customerTag')): 0;


    console.log('===================== images : ',images.toArray());
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
                      <TouchableOpacity onPress={() => toggleShowAgreement()}>
                        <Text
                          allowFontScaling={false}
                          style={[styles.smallText, { color: mainColor }]}
                        >
                          《会员注册协议》
                        </Text>
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
                                    style={
                                      styles.specText,
                                      chooseRegisterType == type.id
                                        ? [styles.checkedText, { color: mainColor }]
                                        : [styles.checkedText,styles.invalidText]
                                    }
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
                    {/*{chooseRegisterType != 0 &&
                    <View>
                      <View style={styles.itemTwo}>
                        {chooseRegisterType == 1 &&
                        <List>
                          <Picker
                            data={[
                              {value:0,label:'零食店'},
                              {value:1,label:'便利店'},
                              {value:2,label:'商超'},
                              {value:3,label:'二批商'},
                              {value:4,label:'水果零售店'},
                              {value:5,label:'连锁系统'},
                              {value:6,label:'炒货店'}
                            ]}
                            title=""
                            cols={1}
                            ref={(ref) => (this.areaPicker = ref)}
                            value={customerTag}
                            onChange={(value) => setCustomerEnterprise({filed:'customerTag',value:value[0]})}
                          >
                            <FormSelect
                              label="会员标签"
                              placeholder={customerTagName[customerTag]}
                            />
                          </Picker>
                        </List>
                        }
                      </View>
                      <View style={styles.itemTwo}>
                        <FormInput
                          label="企业名称"
                          placeholder="请填写企业名称"
                          defaultValue={customerEnterprise.get('enterpriseName')}
                          maxLength={40}
                          onChange={(value) =>
                            setCustomerEnterprise({ filed: 'enterpriseName', value: value })
                          }/>
                      </View>
                      <View>
                        <FormInput
                          label="企业统一社会信用代码"
                          placeholder="即纳税人识别号（税号）"
                          maxLength={30}
                          defaultValue={customerEnterprise.get('socialCreditCode')}
                          onChange={(value) =>
                            setCustomerEnterprise({ filed: 'socialCreditCode', value:value })
                          }
                        />
                      </View>
                      <View style={styles.box}>
                        <Text allowFontScaling={false} style={styles.text1}>
                          营业执照
                        </Text>
                        <ScrollView
                          contentContainerStyle={{ paddingVertical: 20,paddingLeft:140 }}
                          showsHorizontalScrollIndicator={false}
                          horizontal={true}
                          style={styles.row}
                        >
                          {images.toArray().map((v, index) => {
                            return (
                              <View key={v} style={{ marginRight: 10, borderColor: '#ebebeb' }}>
                                <WMImage
                                  key={Math.random()}
                                  resizeMode="contain"
                                  style={styles.pic}
                                  zoom={true}
                                  src={v}
                                />
                                {
                                  customerEnterprise.get('enterpriseStatusXyy') !== 1 && <TouchableOpacity
                                    style={styles.close1}
                                    onPress={() => this.removeImage(index)}
                                  >
                                    <Text allowFontScaling={false} style={styles.cha}>
                                      ×
                                    </Text>
                                  </TouchableOpacity>
                                }

                              </View>
                            );
                          })}

                          {images.count() < 1? (
                            <WmUpload
                              beforeUpload={() => this._disableBtn()}
                              onChange={(url) => this._uploadImage(url)}
                            />
                          ) : null}
                        </ScrollView>

                        <View
                          style={styles.tipsBottom}
                        >
                          <Lightbox
                            springConfig={{ tension: 15, friction: 7 }}
                            swipeToDismiss={false}
                            underlayColor="white"
                            backgroundColor="rgba(0,0,0,0.6)"
                            renderContent={() => this._renderCarousel(require('../img/demo-01.jpeg'))}
                          >
                            <View activeOpacity={0.8} style={styles.imgBox}>
                              <Image style={styles.image} source={require('../img/ask-01.png')} />
                            </View>
                          </Lightbox>
                          <Text style={styles.tipsBottomText}>
                            &nbsp;&nbsp;仅支持jpg、jpeg、png、gif文件，最多上传1张，大小不超过5M
                          </Text>
                        </View>
                      </View>
                    </View>}*/}
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
                  <Image
                    style={styles.img}
                    source={require('../img/fill.png')}
                  />
                  <View style={{ width: screenWidth / 2 }}>
                    <Text allowFontScaling={false} style={styles.text}>
                      您还需完善账户信息才可正常访问商品信息
                    </Text>
                  </View>
                </View>
                <FormInput
                  label="称呼/公司名称"
                  required
                  placeholder="请填写您的称呼或您公司的名称"
                  defaultValue={customerName}
                  onChange={(value) =>
                    changeCustomerDetailField({ field: 'customerName', value })
                  }
                />
                <AreaPicker
                  ref={(ref) => (this.areaPicker = ref)}
                  value={area}
                  title={'选择地址'}
                  onChange={(val) => getArea(val)}
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
                  defaultValue={customerAddress}
                  onChange={(value) =>
                    changeCustomerDetailField({
                      field: 'customerAddress',
                      value
                    })
                  }
                />
                <FormInput
                  label="常用联系人"
                  required
                  placeholder="请填写一位常用联系人"
                  defaultValue={contactName}
                  onChange={(value) =>
                    changeCustomerDetailField({ field: 'contactName', value })
                  }
                />
                <FormInput
                  label="常用联系人手机号"
                  required
                  placeholder="请填写联系人常用手机号"
                  defaultValue={contactPhone}
                  maxLength={11}
                  keyboardType="numeric"
                  onChange={(value) =>
                    changeCustomerDetailField({ field: 'contactPhone', value })
                  }
                />
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
              msg.emit('router: goToNext', {
                routeName: 'Login'
              });
              // toggleVisible({ visible: false });
              // initPage();
            }}
          >
            <Image source={require('../img/close.png')} style={styles.close} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 15
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
  itemTwo: {
    borderBottomColor: '#ebebeb'
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:25
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
  invalidText: {
    color: '#999'
  },
  cha: {
    color: '#ffffff',
    fontSize: 12
  },
  pic: {
    width: 50,
    height: 50
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
    top: 2,
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
  text1: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 20,
    marginLeft: 0,
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center'
  },
  tipsBottom:{
    flexDirection: 'row',
    alignItems:'center'

  },
  tipsBottomText:{
    fontSize:11
  }
});
