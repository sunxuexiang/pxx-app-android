/**
 * Created by feitingting on 2017/9/8.
 */
import React from 'react';
import { PixelRatio, StyleSheet, Text, View } from 'react-native';
import { Relax } from 'plume2';
import FormInput from 'wmkit/form/form-input';
import { PhysiquePicker, FormSelect, noop } from 'wmkit';
import { isAndroid, screenWidth } from '../../../../wmkit/styles/index';
import * as _ from '../../../../wmkit/common/util';
import EnterpriseFile from './enterprise-file';


@Relax
export default class DetailForm extends React.Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    toggleEnterprise: noop,
    setEnterpriseFieldValue: noop,
    showEnterprise: 'showEnterprise',
    enterpriseInfoVO: 'enterpriseInfoVO',
    doEnterpriseSubmit: noop,
    enterpriseCheckState: 'enterpriseCheckState',
    enterpriseCheckTip: 'enterpriseCheckTip',
    registerLimitType: 'registerLimitType',
    openFlag: 'openFlag'
  };

  render() {
    const {
      enterpriseInfoVO,
      setEnterpriseFieldValue,
      enterpriseCheckState,
      registerLimitType,
      openFlag,
    } = this.props.relaxProps;

    let businessNatureName = enterpriseInfoVO.get('businessNatureType') === 1 ? '政府机关/事业单位' :
      enterpriseInfoVO.get('businessNatureType') === 2 ? '国营' :
        enterpriseInfoVO.get('businessNatureType') === 3 ? '私营' :
          enterpriseInfoVO.get('businessNatureType') === 4 ? '中外合资' :
            enterpriseInfoVO.get('businessNatureType') === 5 ? '外资' :
              enterpriseInfoVO.get('businessNatureType') === 6 ? '其他' : '请选择';
    let disabledFlag = enterpriseCheckState === 1;

    let disabledStyle = disabledFlag ? { color: 'grey' } : {};

    return (
      <View>

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
          value={enterpriseInfoVO.get('businessNatureType') ? enterpriseInfoVO.get('businessNatureType') : null}
          title={'请选择'}
          disabled={disabledFlag}
          onChange={(val) => setEnterpriseFieldValue({
            field: 'businessNatureType',
            value: val
          })}
        >
          <FormSelect
            request={true}
            label="公司性质"
            style={disabledStyle}
            disabled={disabledFlag}
            placeholder={`${businessNatureName ? businessNatureName : '请选择'}`}
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
            setEnterpriseFieldValue({ field: 'socialCreditCode', value })
          }
        />

        <EnterpriseFile />

        {
          openFlag === 1 ?

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
            /> : null
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    width: '100%',
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
    width: '90%',
    flex: 1
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
  input: {
    color: '#333',
    fontSize: 14,
    textAlign: 'left',
    flex: 1
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  registerLink: {
    paddingVertical: 12,
    flexDirection: 'row',
    height: 50
  },
  smallText: {
    fontSize: 10,
    color: '#999'
  },
  imgEyes: {
    width: 22,
    height: 22,
    marginLeft: 10,
    tintColor: '#000'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15
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
  secondText: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 60
  },
  tip: {
    color: '#999',
    fontSize: 12
  }
});
