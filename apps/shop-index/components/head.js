import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import * as _ from 'wmkit/common/util';
import * as _ from '../../../wmkit/common/util'; // added by scx 
import { Relax, msg } from 'plume2';
import { isAndroid, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';

@Relax
export default class Head extends React.Component {
  static relaxProps = {
    customerInfo: 'customerInfo',
    settingInfo: 'settingInfo'
  };

  render() {
    const { customerInfo, settingInfo } = this.props.relaxProps;
    let customerName = customerInfo.size > 0 ? customerInfo.get('customerName') : '';
    if(customerName.length == 11 && customerName.indexOf("****") != -1){
      customerName = customerName.substring(6);
    }
    return (
      <ImageBackground
        style={styles.container}
        source={require('../img/shop-head-bg.png')}
      >
        <View style={styles.rowEnd}>
          <View style={styles.rowItem}>
            <View style={styles.imgBox}>
              <Image
                style={styles.defaultImg}
                source={
                  customerInfo.get('headImg')
                    ? { uri: customerInfo.get('headImg') }
                    : require('../img/default-img.png')
                }
              />
            </View>
            <View style={styles.nameBox}>
              <Text style={styles.levelText} allowFontScaling={false}>
                {customerName}的
                {settingInfo && settingInfo.get('shopName')}
              </Text>
              <LinearGradient
                colors={['#c9a263', '#e8be69']}
                style={styles.linearGradient}
                start={{ x: 1, y: 1 }}
                end={{ x: 0.5, y: 1 }}
              >
                <Text style={styles.lineText} allowFontScaling={false}>
                  {customerInfo && customerInfo.get('distributorLevelName')}
                </Text>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.editBtnGroup}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.editBtn}
              onPress={() => {
                msg.emit('router: goToNext', { routeName: 'ShopEdit' });
              }}
            >
              <Image source={require('../img/edit.png')} style={styles.img} />
              <Text style={styles.editBtnText} allowFontScaling={false}>
                编辑
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.editBtn}
              onPress={() => {
                msg.emit('router: goToNext', { routeName: 'ShopGoods' });
              }}
            >
              <Image source={require('../img/choose.png')} style={styles.img} />
              <Text style={styles.editBtnText} allowFontScaling={false}>
                选品
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.backBox}
          activeOpacity={0.8}
          onPress={() => {
            msg.emit('router: back');
          }}
        >
          <Image source={require('../img/back.png')} style={styles.back} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    ..._.ifIphoneX(
      {
        height: screenWidth * 0.307 + 35
      },
      {
        height: screenWidth * 0.307
      }
    ),
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20
  },
  imgBox: {
    width: 56,
    height: 56,
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 28,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  defaultImg: {
    width: 56,
    height: 56,
    resizeMode: 'contain'
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowEnd: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingLeft: 12
  },
  nameBox: {
    alignItems: 'flex-start'
  },
  levelText: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 5
  },
  lineText: {
    fontSize: 9,
    color: '#000'
  },
  editBtnGroup: {
    flexDirection: 'row'
  },
  editBtn: {
    paddingHorizontal: 20,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ebebeb'
  },
  editBtnText: {
    fontSize: 12,
    color: '#fff'
  },
  img: {
    width: 20,
    height: 20,
    marginBottom: 8
  },
  backBox: {
    height: isAndroid ? 50 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 12,
    backgroundColor: 'transparent',
    ..._.ifIphoneX(
      {
        top: 35
      },
      {
        top: isAndroid ? 2 : 15
      }
    )
  },
  back: {
    width: 10,
    height: 19
  }
});
