/**
 * Created by feitingting on 2017/8/30.
 */
import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity,
  Image, Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { Relax } from 'plume2';

import * as FindArea from 'wmkit/area/area';
import { noop, AreaPicker, Header, FormInput, FormSelect } from 'wmkit';
import { mainColor } from 'wmkit/styles/index';
import { Provider } from '@ant-design/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as _ from '../../../wmkit/common/util';
@Relax
export default class AddressEdit extends React.Component {
  static relaxProps = {
    address: 'address',
    onChange: noop,
    getArea: noop,
    saveAddress: noop,
    canSubmit: 'canSubmit',
    addressId: 'addressId',
    provinceCity: 'provinceCity',
  };

  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { address, getArea, saveAddress ,canSubmit,addressId,provinceCity} = this.props.relaxProps;
    return (

      <View style={styles.container}>
        <Header title={`${addressId ? '编辑' : '新增'}收货地址`} />
        <Provider>
        <KeyboardAwareScrollView style={{ flex: 1, paddingRight: 12, paddingLeft: 12 }}  keyboardShouldPersistTaps={'always'}>
          <View style={{ flex: 1 }}>
            <FormInput
              // autoFocus={window.keyBoardShow}
              label="收货人"
              placeholder="请输入收货人姓名"
              defaultValue={address.get('consigneeName')}
              onChange={(text) =>
                this.changeValue('consigneeName', text.trim())
              }
              maxLength={15}
            />
            <View
              style={{height:10}}
            />
            <FormInput
              // autoFocus={window.keyBoardShow}
              label="手机号码"
              placeholder="请输入手机号码"
              defaultValue={address.get('consigneeNumber')}
              onChange={(text) =>
                this.changeValue('consigneeNumber', text.trim())
              }
              maxLength={11}
              keyboardType="numeric"
            />
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=> getArea()}
                style={styles.area}
              >
                <Text style={styles.text}>{'请确定授权定位后选择所在地区'}</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.text}>{provinceCity}</Text>
                  <Image source={require('../img/arrow.png')} style={styles.img} />
                </View>

              </TouchableOpacity>
            </View>
            <FormInput
              label="详细地址"
              placeholder="请填写详细地址"
              defaultValue={address.get('deliveryAddress')}
              onChange={(text) =>
                this.changeValue('deliveryAddress', text.trim())
              }
              maxLength={60}
            />
            <View style={styles.items}>
              <Text style={styles.text}>设为默认</Text>
              <Switch
                onTintColor={mainColor}
                thumbTintColor={true ? '#fff' : '#f4f3f4'}
                value={address.get('isDefaltAddress') == 1}
                onValueChange={() => {
                  this.changeDefault(
                    'isDefaltAddress',
                    address.get('isDefaltAddress')
                  );
                }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        </Provider>
        <SafeAreaView>
        <View style={styles.bottom}>
          <View style={styles.btnbox}>
            <TouchableOpacity onPress={() => canSubmit?saveAddress(addressId || -1):{}}>
              <LinearGradient
                  colors={[mainColor, mainColor]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={[styles.buttonBox, { backgroundColor: mainColor }]}
              >
                <Text style={{ color: '#fff', fontSize: 14 }}>保存</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
      </View>
    );
  }

  /**
   * 改变store中对应的值input
   */
  changeValue = (key, value) => {
    const { onChange } = this.props.relaxProps;
    onChange(key, value);
  };

  /**
   * 改变store中对应的值checkbox
   */
  changeDefault = (key, value) => {
    if (value === 1) {
      value = 0;
    } else {
      value = 1;
    }
    this.props.relaxProps.onChange(key, value);
  };
}

const isAndroid = Platform.OS == 'android';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: isAndroid ? 0 : _.isIphoneX() ? 35 : 20,
    backgroundColor: '#fff'
  },
  item: {
    height: 46
  },
  items: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14
  },
  input: {
    color: '#333',
    fontSize: 14,
    textAlign: 'right',
    flex: 1
  },
  area:{
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  img: {
    width: 18,
    height: 18,
    tintColor: '#333'
  },
  bottom: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    backgroundColor: '#fff',
    paddingTop: 10
  },
  btnbox: {
    position: 'relative',
    padding: 12,
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    flexDirection: 'row'
  }
});
