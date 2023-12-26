import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Relax } from 'plume2';
import { FormInput, WMImage, WmUpload, Button, noop, _, FormSelect } from 'wmkit';
import { isAndroid, mainColor, screenWidth } from 'wmkit/styles';
import Lightbox from 'react-native-lightbox';
import { fromJS } from 'immutable';
import { Picker, Provider } from '@ant-design/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const regiterTypeName = {
  1: '商户',
  2: '单位',
};

const customerTagName = {
  0: '零食店',
  1: '便利店',
  2: '商超',
  3: '二批商',
  4: '水果零售店',
  5: '连锁系统',
  6: '炒货店',
};


const LongButton = Button.LongButton;

@Relax
export default class EnterpriseApprovalInfo extends React.Component {
  static relaxProps = {
    //显示企业账户信息
    showEnterprise: 'showEnterprise',
    addImage: noop,
    removeImage: noop,
    images: 'images',
    form: 'form',
    modifyCustomerEnterprise: noop,
    setFormInfo: noop,
  };


  render() {
    const {
      setFormInfo,
      images,
      form,
      modifyCustomerEnterprise,
    } = this.props.relaxProps;

    const formInfo = fromJS(form);
    const disabledFlag = formInfo && formInfo.get('enterpriseStatusXyy') === 1;
    //由于不能默认选中1所以这里做了减操作
    const customerRegisterType = formInfo.get('customerRegisterType') ? formInfo.get('customerRegisterType') : 1;
    const customerTag = formInfo.get('customerTag') != null && formInfo.get('customerTag') != undefined ? parseInt(formInfo.get('customerTag')) : 0;

    let disabledStyle = disabledFlag ? { color: 'grey' } : {};
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 24, backgroundColor: '#fff' }}>
              <View>
                <Picker
                  data={[
                    { value: 1, label: '商户' },
                    { value: 2, label: '单位' },
                  ]}
                  cols={1}
                  title=""
                  disabled={disabledFlag}
                  // ref={(ref) => (this.areaPicker = ref)}
                  value={customerRegisterType}
                  onChange={(value) => this._setForm(value)}
                >
                  <FormSelect
                    label="会员类型"
                    required
                    placeholder={regiterTypeName[customerRegisterType] ? regiterTypeName[customerRegisterType] : '请选择'}
                  />
                </Picker>
              </View>
              {customerRegisterType === 1 &&
              <View>
                <Picker
                  data={[
                    { value: 0, label: '零食店' },
                    { value: 1, label: '便利店' },
                    { value: 2, label: '商超' },
                    { value: 3, label: '二批商' },
                    { value: 4, label: '水果零售店' },
                    { value: 5, label: '连锁系统' },
                    { value: 6, label: '炒货店' },
                  ]}
                  cols={1}
                  title=""
                  disabled={disabledFlag}
                  onChange={(value) => setFormInfo({ filed: 'customerTag', value: value[0] })}
                >
                  <FormSelect
                    required
                    label="会员标签"
                    placeholder={customerTagName[customerTag]}
                  />
                </Picker>
              </View>
              }
              <FormInput
                label="企业名称"
                placeholder="请输入企业名称"
                disabled={disabledFlag}
                style={disabledStyle}
                required
                defaultValue={formInfo.get('enterpriseName')}
                maxLength={40}
                onChange={(value) =>
                  setFormInfo({ filed: 'enterpriseName', value: value })
                }
              />

              <FormInput
                label="企业统一社会信用代码"
                placeholder="即纳税人识别号（税号）"
                maxLength={30}
                required
                disabled={disabledFlag}
                style={disabledStyle}
                defaultValue={formInfo.get('socialCreditCode')}
                onChange={(value) =>
                  setFormInfo({ filed: 'socialCreditCode', value: value })
                }
              />

              <View style={styles.box}>
                <Text allowFontScaling={false} style={styles.text1}>
                  <Text style={{ color: mainColor }}>{'*'}</Text>营业执照
                </Text>
                <ScrollView
                  contentContainerStyle={{ paddingVertical: 20, paddingLeft: (screenWidth / 2 - 50) }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={styles.row}
                >
                  {images.toArray().map((v, index) => {
                    return (
                      <View>
                        {v != '' ? (
                          <View key={v} style={{ marginRight: 10, borderColor: '#ebebeb' }}>
                            <WMImage
                              key={Math.random()}
                              resizeMode="contain"
                              style={styles.pic}
                              zoom
                              src={v}
                            />

                            {
                              formInfo.get('enterpriseStatusXyy') !== 1 && <TouchableOpacity
                                style={styles.close1}
                                onPress={() => this.removeImage(index)}
                              >
                                <Text allowFontScaling={false} style={styles.cha}>
                                  ×
                                </Text>
                              </TouchableOpacity>
                            }

                          </View>
                        ) : (
                          <WmUpload
                            beforeUpload={() => this._disableBtn()}
                            onChange={(url) => this._uploadImage(url)}
                          />
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
                      <Image style={[styles.image, { tintColor: mainColor }]} source={require('../img/ask-01.png')}/>
                    </View>
                  </Lightbox>
                  <Text style={styles.tipsBottomText}>
                    &nbsp;&nbsp;仅支持jpg、jpeg、png、gif文件，最多上传1张，大小不超过5M
                  </Text>
                </View>

              </View>
            </View>
            {formInfo.get('enterpriseStatusXyy') !== 1 &&
            // <LongButton btnStyle={{borderRadius:25}} text="提交" onClick={() => modifyCustomerEnterprise()}/>
            <SafeAreaView style={styles.bottom}>
              <TouchableOpacity onPress={() => modifyCustomerEnterprise()}>
                <View
                  style={[styles.buttonBox, { backgroundColor: mainColor }]}
                >
                  <Text style={{ color: '#fff', fontSize: 14 }}>提交</Text>
                </View>
              </TouchableOpacity>
            </SafeAreaView>
            }
          </KeyboardAvoidingView>
        </View>
      </Provider>
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

  _setForm = (value) => {
    const { setFormInfo } = this.props.relaxProps;
    setFormInfo({ filed: 'customerRegisterType', value: parseInt(value[0]) });
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
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  tipsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    paddingHorizontal: 30,
  },


  container: {
    width: '90%',
    flex: 1,
  },
  moreContainer: {
    ..._.ifIphoneX(
      {
        marginTop: 85,
      },
      {
        marginTop: isAndroid ? 50 : 70,
      },
    ),
    width: '100%',
    flex: 1,
  },
  closeBox: {
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 30,
      },
      {
        top: isAndroid ? 0 : 20,
      },
    ),
    left: 0,
    padding: 20,
  },
  close: {
    width: 16,
    height: 16,
  },
  back: {
    width: 25,
    height: 25,
  },
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    justifyContent: 'space-between',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 16,
    ..._.ifIphoneX(
      {
        marginTop: 85,
      },
      {
        marginTop: isAndroid ? 50 : 70,
      },
    ),
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    color: '#333',
    fontSize: 14,
    textAlign: 'left',
    flex: 1,
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  registerLink: {
    paddingVertical: 12,
    flexDirection: 'row',
    height: 50,
  },
  smallText: {
    fontSize: 10,
    color: '#999',
  },
  imgEyes: {
    width: 22,
    height: 22,
    marginLeft: 10,
    tintColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 33,
  },
  img: {
    width: 45.5,
    height: 57.5,
  },
  text: {
    color: '#333333',
    fontSize: 17,
    lineHeight: 20,
    marginLeft: 50,
    marginBottom: 8,
  },
  text1: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 20,
    marginLeft: -10,
    marginBottom: 8,
  },
  textSelect: {
    color: '#333333',
    fontSize: 15,
  },
  secondText: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 60,
  },
  tip: {
    color: '#999',
    fontSize: 12,
  },
  box: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#ebebeb',
    borderTopColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    padding: 10,
    marginBottom: 10,
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
    justifyContent: 'center',
  },
  deleteIcon: {
    tintColor: '#999',
    width: 10,
    height: 10,
    transform: [{ rotate: '45deg' }],
  },
  pic: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
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
    fontSize: 12,
  },
  example: {
    fontSize: 12,
    color: '#ffffff',
  },
  imgBox: {
    width: 15,
    height: 15,
  },
  shadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsBottom: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  tipsBottomText: {
    fontSize: 11,
    color:'rgba(0,0,0,0.5)'
  },
  close1: {
    width: 13,
    height: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6.5,
    // position: 'absolute',
    left: 38,
    top: -55,
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18
  },
  bottom: {
    padding: 12
  }
});
