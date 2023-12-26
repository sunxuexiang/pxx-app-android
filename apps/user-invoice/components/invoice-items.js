/**
 * Created by hht on 2017/9/19.
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  StyleSheet
} from 'react-native';
import { Relax } from 'plume2';
import Lightbox from 'react-native-lightbox';

import WMImage from 'wmkit/image/index';
import FormInput from 'wmkit/form/form-input';
import { noop } from 'wmkit/noop';
import WmUpload from 'wmkit/upload';

import { screenWidth } from 'wmkit/styles/index';

const businessExample = require('../img/id5.jpg');
const taxerExample = require('../img/id8.jpg');

@Relax
export default class InvoiceItems extends React.Component {
  static relaxProps = {
    invoiceBean: 'invoice',
    setValue: noop,
    addImg: noop,
    editStatus: 'editStatus'
  };

  constructor(props) {
    super(props);
  }

  render() {
    let { invoiceBean, editStatus } = this.props.relaxProps;
    let businessImage = invoiceBean.get('businessLicenseImg');
    let indentiImage = invoiceBean.get('taxpayerIdentificationImg');

    let checkState = invoiceBean.get('checkState');

    let cannotEdit = false;
    if (!checkState && checkState !== 0) {
      checkState = 3;
    } else {
      if (
        checkState == 0 ||
        ((checkState == 1 || checkState == 2) && !editStatus)
      ) {
        //待审核 || 审核之后的未编辑状态
        cannotEdit = true;
      }
    }

    let businessImageFlag = true,
      indentiImageFlag = true;

    if (!businessImage) {
      businessImage = businessExample;
      businessImageFlag = false;
    } else {
      businessImage = eval('(' + businessImage + ')')[0]['url'];
    }
    if (!indentiImage) {
      indentiImage = taxerExample;
      indentiImageFlag = false;
    } else {
      indentiImage = eval('(' + indentiImage + ')')[0]['url'];
    }

    return (
      <View style={{ flex: 1 }}>
        <FormInput
          autoFocus={window.keyBoardShow}
          label="单位全称"
          placeholder="请输入正确的单位全称"
          maxLength={50}
          defaultValue={invoiceBean.get('companyName')}
          onChange={(text) => this._setValue('companyName', text)}
          disabled={cannotEdit}
          rightStyle={{ marginLeft: 12 }}
          rightTextStyle={{ color: '#333'}}
        />
        <FormInput
          label="纳税人识别号"
          placeholder="请输入正确的纳税人识别号"
          maxLength={20}
          defaultValue={invoiceBean.get('taxpayerNumber')}
          onChange={(text) => this._setValue('taxpayerNumber', text)}
          disabled={cannotEdit}
          rightStyle={{ marginLeft: 12 }}
          rightTextStyle={{ color: '#333'}}
        />
        <FormInput
          label="注册电话"
          placeholder="请输入正确的注册电话"
          maxLength={20}
          defaultValue={invoiceBean.get('companyPhone')}
          onChange={(text) => this._setValue('companyPhone', text)}
          disabled={cannotEdit}
          keyboardType="numeric"
          rightStyle={{ marginLeft: 12 }}
          rightTextStyle={{ color: '#333'}}
        />
        <FormInput
          label="注册地址"
          placeholder="请输入正确的注册地址"
          maxLength={60}
          defaultValue={invoiceBean.get('companyAddress')}
          onChange={(text) => this._setValue('companyAddress', text)}
          disabled={cannotEdit}
          rightStyle={{ marginLeft: 12 }}
          rightTextStyle={{ color: '#333'}}
        />
        {cannotEdit ? (
          <FormInput
            label="银行基本户号"
            defaultValue={this._bankNoForView(invoiceBean.get('bankNo'))}
            disabled={cannotEdit}
            rightStyle={{ marginLeft: 12 }}
            rightTextStyle={{ color: '#333'}}
            />
        ) : (
          <FormInput
            label="银行基本户号"
            keyboardType="numeric"
            placeholder="请输入正确的银行基本户号"
            maxLength={30}
            defaultValue={invoiceBean.get('bankNo')}
            onChange={(text) => this._setValue('bankNo', text)}
            disabled={cannotEdit}
            rightStyle={{ marginLeft: 12 }}
            rightTextStyle={{ color: '#333'}}
            />
        )}
        <FormInput
          label="开户行"
          placeholder="请输入正确的开户行"
          maxLength={50}
          defaultValue={invoiceBean.get('bankName')}
          onChange={(text) => this._setValue('bankName', text)}
          disabled={cannotEdit}
          rightStyle={{ marginLeft: 12 }}
          rightTextStyle={{ color: '#333'}}
        />

        <View style={styles.imageForm}>
          <Text style={styles.text} allowFontScaling={false}>
            营业执照复印件
          </Text>

          <View style={styles.uploadDom}>
            {businessImageFlag ? (
              <TouchableOpacity activeOpacity={0.8} style={styles.imgBox}>
                <WMImage src={businessImage} zoom={true} style={styles.image} />
                {!cannotEdit && (
                  <TouchableOpacity
                    style={styles.close}
                    onPress={() => this._removeImage('businessLicenseImg')}
                  >
                    <Text allowFontScaling={false} style={styles.cha}>
                      ×
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ) : (
              <View />
              // <Lightbox
              //   springConfig={{ tension: 15, friction: 7 }}
              //   swipeToDismiss={false}
              //   underlayColor="white"
              //   backgroundColor="rgba(0,0,0,0.6)"
              //   renderContent={() => this._renderCarousel(businessImage)}
              // >
              //   <View activeOpacity={0.8} style={styles.imgBox}>
              //     <Image style={styles.image} source={businessImage} />
              //     <View style={styles.shadow}>
              //       <Text style={styles.example} allowFontScaling={false}>
              //         示例
              //       </Text>
              //     </View>
              //   </View>
              // </Lightbox>
            )}
            {cannotEdit || businessImageFlag ? null : (
              <View style={styles.upload}>
                <WmUpload
                  beforeUpload={() => this.props.disableBtn()}
                  onChange={(url) => this._uploadBusinessImage(url)}
                />
              </View>
            )}
          </View>
          <Text style={styles.textComment} allowFontScaling={false}>
            仅支持jpg、jpeg、png、gif文件，仅限上传1张，大小不超过2M
          </Text>
        </View>

        <View style={styles.imageForm}>
          <Text style={styles.text} allowFontScaling={false}>
            一般纳税人资格复印件
          </Text>
          <View style={styles.uploadDom}>
            {indentiImageFlag ? (
              <TouchableOpacity activeOpacity={0.8} style={styles.imgBox}>
                <WMImage src={indentiImage} zoom={true} style={styles.image} />
                {!cannotEdit && (
                  <TouchableOpacity
                    style={styles.close}
                    onPress={() =>
                      this._removeImage('taxpayerIdentificationImg')
                    }
                  >
                    <Text allowFontScaling={false} style={styles.cha}>
                      ×
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ) : (
              <View />
              // <Lightbox
              //   springConfig={{ tension: 15, friction: 7 }}
              //   swipeToDismiss={false}
              //   underlayColor="white"
              //   backgroundColor="rgba(0,0,0,0.6)"
              //   renderContent={() => this._renderCarousel(indentiImage)}
              // >
              //   <View activeOpacity={0.8} style={styles.imgBox}>
              //     <Image style={styles.image} source={indentiImage} />
              //     <View style={styles.shadow}>
              //       <Text style={styles.example} allowFontScaling={false}>
              //         示例
              //       </Text>
              //     </View>
              //   </View>
              // </Lightbox>
            )}
            {cannotEdit || indentiImageFlag ? null : (
              <View style={styles.upload}>
                <WmUpload
                  beforeUpload={() => this.props.disableBtn()}
                  onChange={(url) => this._uploadIndentiImage(url)}
                />
              </View>
            )}
          </View>
          <Text style={styles.textComment} allowFontScaling={false}>
            仅支持jpg、jpeg、png、gif文件，仅限上传1张，大小不超过2M
          </Text>
        </View>
      </View>
    );
  }

  _renderCarousel = (imageSource) => (
    <Image
      style={{ flex: 1, width: screenWidth, height: screenWidth }}
      resizeMode="contain"
      source={imageSource}
    />
  );

  /**
   * 银行卡展示时控制格式
   * @param bankNo
   * @returns {any}
   * @private
   */
  _bankNoForView = (bankNo) => {
    if (!bankNo) return bankNo;
    let res = '';
    const flag = true;
    while (flag) {
      if (bankNo.length < 4) {
        res += bankNo;
        break;
      }
      res += bankNo.substring(0, 4) + ' ';
      bankNo = bankNo.substring(4, bankNo.length);
    }
    return res;
  };

  /**
   * 图片上传方法 -- 营业执照
   * @param loadResult
   * @param imageBase64
   * @private
   */
  _uploadBusinessImage = (url) => {
    if (url) {
      let { addImg } = this.props.relaxProps;
      addImg(url, 'businessLicenseImg');
      this.props.disableBtn();
    }
  };

  /**
   * 图片上传方法 -- 纳税人
   * @param loadResult
   * @param imageBase64
   * @private
   */
  _uploadIndentiImage = (url) => {
    if (url) {
      let { addImg } = this.props.relaxProps;
      addImg(url, 'taxpayerIdentificationImg');
      this.props.disableBtn();
    }
  };

  /**
   * 表单值统一存入方法
   * @param key
   * @param value
   * @private
   */
  _setValue = (key, value) => {
    this.props.relaxProps.setValue(key, value);
  };

  /**
   * 删除用户已经上传的图片
   * @param imageType
   * @private
   */
  _removeImage = (imageType) => {
    this.props.relaxProps.setValue(imageType, null);
  };
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12
  },
  imageForm: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    flexDirection: 'column',
    justifyContent: 'space-between'
    // padding: 12
  },
  uploadDom: {
    // marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 8
  },
  upload: {
    marginLeft: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    paddingVertical: 17
  },
  textComment: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12,
    marginTop: 14,
    marginBottom: 14
  },
  input: {
    color: '#939495',
    fontSize: 14,
    textAlign: 'right',
    flex: 1
  },
  image: {
    width: 55,
    height: 55,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  },
  addImg: {
    width: 14.5,
    height: 14.5
  },
  imgBox: {
    width: 56,
    height: 56
    // marginLeft: 10
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
  example: {
    fontSize: 12,
    color: '#ffffff'
  },
  close: {
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
  cha: {
    color: '#ffffff',
    fontSize: 12
  }
});
