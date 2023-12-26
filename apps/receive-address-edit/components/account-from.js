import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  PixelRatio,
  Switch,
  Keyboard
} from 'react-native';
import { Relax } from 'plume2';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
import { noop } from '../../../wmkit';
import { SafeAreaView } from 'react-native-safe-area-context';

@Relax
export default class AccountFrom extends React.Component {
  static relaxProps = {
    address: 'address',
    onChange: noop,
    getArea: noop,
    saveAddress: noop,
    canSubmit: 'canSubmit',
    addressId: 'addressId',
    provinceCity: 'provinceCity',
  };

  render() {
    const {
      address, getArea, saveAddress ,canSubmit,addressId,provinceCity
    } = this.props.relaxProps;
    return (
      <View>
        <View style={styles.loginBox}>
          <View style={styles.inputItem}>
          <Text style={styles.titleText}>收货人</Text>
            <TextInput
              maxLength={15}
              keyboardType="default"
              style={styles.input}
              placeholder="请输入收货人姓名"
              placeholderTextColor="#999"
              underlineColorAndroid="transparent"
              value={address.get('consigneeName')}
              onChangeText={ (text) =>
                this.changeValue('consigneeName', text.trim())
              }
            />
          </View>
        </View>

        <View style={styles.loginBox}>
          <View style={styles.inputItem}>
          <Text style={styles.titleText}>手机号码</Text>
            <TextInput
              maxLength={11}
              keyboardType="numeric"
              style={styles.input}
              placeholder="请输入手机号码"
              autoCapitalize="none"
              placeholderTextColor="#999"
              value={address.get('consigneeNumber')}
              underlineColorAndroid="transparent"
              onChangeText={
                (text) => this.changeValue('consigneeNumber', text.trim())
              }
              returnKeyType="done"
            />
          </View>
        </View>

        <View style={styles.loginBoxTmp}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=> {
              Keyboard.dismiss();
              getArea();
            }}
            style={styles.area}
          >
            <Text style={styles.titleText}>所在地区</Text>
            {!provinceCity && <Text style={[styles.text,{paddingLeft:10}]}>{'请确定授权定位后选择所在地区'}</Text>}
            <Text style={{color:'#333',paddingLeft:10}}>{provinceCity}</Text>
            <View style={{flexDirection:'row',position:'absolute',right:0}}>
              <Image source={require('../img/arrow.png')} style={styles.img} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.loginBox}>
          <View style={styles.inputItem}>
          <Text style={styles.titleText}>详细地址</Text>
            <TextInput
              maxLength={60}
              keyboardType="default"
              style={styles.input}
              placeholder="请填写详细地址"
              autoCapitalize="none"
              placeholderTextColor="#999"
              defaultValue={address.get('deliveryAddress')}
              underlineColorAndroid="transparent"
              onChangeText={
                (text) => this.changeValue('deliveryAddress', text.trim())
              }
              returnKeyType="done"
            />
          </View>
        </View>

        <View style={styles.loginBoxTmp}>
          <View style={styles.items}>
            <Text>设为默认</Text>
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
        <SafeAreaView>
          <TouchableOpacity  onPress={() => canSubmit?saveAddress(addressId || -1):{}}>
            <LinearGradient
              colors={[mainColor, mainColor]}
              style={[
                styles.btn, { backgroundColor: mainColor }
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.whiteText
                ]}
              >
                保存
              </Text>
            </LinearGradient>
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  content: {
    marginTop: 40,
    paddingLeft: 40,
    paddingRight: 40
  },
  loginBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth - 20
  },
  loginBoxTmp: {
    width: screenWidth - 40,
    marginLeft: 10
  },
  inputItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    flex: 1,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#e5e5e5',
    paddingLeft:10
  },
  intIcon: {
    width: 20,
    height: 20
  },
  input: {
    color: '#333',
    fontSize: 14,
    flex: 1,
    paddingVertical: 0,
    paddingLeft: 10
  },
  forget: {
    marginLeft: 20
  },
  text: {
    color: '#999',
    fontSize: 14
  },
  titleText: {
    width:60
  },
  btn: {
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  whiteText: {
    color: '#fff',
    fontSize: 16
  },
  icon: {
    width: 17,
    height: 17,
    marginRight: 15
  },
  imgEyes: {
    width: 20,
    height: 20
  },
  area:{
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    position:'relative'
  },
  img: {
    width: 18,
    height: 18,
    tintColor: '#999',
  },
  items: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});
