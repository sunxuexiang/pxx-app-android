import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Const } from 'wmkit/const';
import { noop } from 'wmkit/noop';

import * as _ from '../../../../wmkit/common/util'; // added by scx
import { Relax, msg } from 'plume2';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { isAndroid, mainColor } from 'wmkit/styles/index';

@Relax
export default class Header extends React.Component {
  static relaxProps = {
    changeLayer: noop,
    pointsValue: 'pointsValue',
    willExpirePointsData: 'willExpirePointsData'
  };

  render() {
    const {
      changeLayer,
      pointsValue,
      willExpirePointsData
    } = this.props.relaxProps;
    return (
      <LinearGradient
        colors={[mainColor, mainColor]}
        style={styles.container}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <SafeAreaView style={styles.box}>
          <View style={styles.growthValue}>
            <Text style={styles.growthLabel}>当前积分</Text>
            <TouchableOpacity
              style={styles.ruleBox}
              activeOpacity={0.8}
              onPress={() => changeLayer()}
            >
              <Text style={styles.rule} allowFontScaling={false}>
                积分规则
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={styles.growthText}
            allowFontScaling={false}
            numberOfLines={1}
          >
            {pointsValue}
          </Text>
          {/*<TouchableOpacity*/}
            {/*style={styles.pointBtn}*/}
            {/*activeOpacity={0.8}*/}
            {/*onPress={() => {*/}
              {/*msg.emit('router: goToNext', { routeName: 'PointsMall' });*/}
            {/*}}*/}
          {/*>*/}
            {/*<Image source={require('../img/gift.png')} style={styles.gift} />*/}
            {/*<Text style={[styles.btnText, { color: mainColor }]} allowFontScaling={false}>*/}
              {/*积分商城*/}
            {/*</Text>*/}
          {/*</TouchableOpacity>*/}
          {willExpirePointsData.get('pointsExpireStatus') == 1 &&
            willExpirePointsData.get('willExpirePoints') > 0 && (
              <Text style={{ color: '#fff',fontSize:12 }}>
                您有
                {willExpirePointsData.get('willExpirePoints')}
                积分，将于
                {moment(willExpirePointsData.get('pointsExpireDate')).format(
                  Const.DATE_FORMAT
                )}
                过期，请提前使用
              </Text>
            )}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 148,
    borderRadius: 8,
    flexDirection: 'column',
    marginHorizontal: 12
  },
  box: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'column'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  goBack: {
    position: 'absolute',
    padding: 10,
    left: 5,
    ..._.ifIphoneX(
      {
        top: 30
      },
      {
        top: isAndroid ? 0 : 20
      }
    )
  },
  ruleBox: {
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 8,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rule: {
    color: '#fff',
    fontSize: 12
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  levelBox: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(178,14,46,0.9)',
    borderRadius: 8.5
  },
  LevelImg: {
    width: 11,
    height: 11
  },
  levelText: {
    marginLeft: 2.5,
    fontSize: 10,
    color: '#e4c137'
  },
  growthValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    // marginBottom: 30
  },
  growthLabel: {
    color: '#fff',
    fontSize: 12
  },
  growthText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold'
  },
  value: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  valueText: {
    fontSize: 10,
    color: '#fff'
  },
  ProgressBar: {
    position: 'absolute',
    left: 30,
    bottom: 20,
    alignSelf: 'stretch',
    width: '100%'
  },
  pointBtn: {
    marginVertical: 16,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  gift: {
    width: 16,
    height: 16,
    marginRight: 8
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
