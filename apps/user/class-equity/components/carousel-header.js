/**
 * react-native-snap-carousel
 * https://github.com/archriss/react-native-snap-carousel/blob/master/doc/PROPS_METHODS_AND_GETTERS.md
 */
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import { msg, Relax } from 'plume2';

import { noop } from 'wmkit/noop';
import * as _ from '../../../../wmkit/common/util'; // added by scx
import { isAndroid, mainColor, screenWidth } from 'wmkit/styles/index';

@Relax
export default class CarouselHeader extends React.Component {
  static relaxProps = {
    headerGradeList: 'headerGradeList',
    levelInfo: 'levelInfo',
    isLastOne: 'isLastOne',
    atPresentEquityNum: 'atPresentEquityNum',
    dispatchAtPresentEquityNum: noop
  };

  render() {
    const {
      isLastOne,
      levelInfo,
      headerGradeList,
      atPresentEquityNum,
      dispatchAtPresentEquityNum
    } = this.props.relaxProps;
    if (atPresentEquityNum == null) {
      return null;
    }
    const headerGradeArr = headerGradeList.toJS();
    return (
      <View>
        <ImageBackground style={styles.bg} source={require('../img/bg.png')}>
          <SafeAreaView style={styles.headerBox}>
            <TouchableOpacity
              style={styles.goBack}
              activeOpacity={0.8}
              onPress={() => msg.emit('router: back')}
            >
              <Image style={styles.back} source={require('../img/back.png')} />
            </TouchableOpacity>
            <Text allowFontScaling={false} style={styles.headerTitle}>
              等级权益
            </Text>
            <Carousel
              data={headerGradeArr}
              firstItem={atPresentEquityNum} //要显示的第一个项的索引
              renderItem={(e) => this._renderItem(e)}
              sliderWidth={screenWidth}
              itemWidth={screenWidth / 3.8}
              inactiveSlideOpacity={1} //应用于非活动幻灯片的不透明效果的值
              inactiveSlideScale={1} //应用于非活动幻灯片的scale值
              onSnapToItem={(data) => dispatchAtPresentEquityNum(data)}
            />
          </SafeAreaView>
        </ImageBackground>
        <ImageBackground
          style={styles.levelTextBox}
          source={require('../img/bg-white.png')}
        >
          <Text
            style={styles.levelText}
            numberOfLines={1}
            allowFontScaling={false}
          >
            当前等级为
            <Text style={{ color: mainColor }}>
              {levelInfo.get('atPresentLevelName')}
            </Text>
          </Text>
          {!isLastOne && (
            <Text
              style={styles.levelTips}
              numberOfLines={1}
              allowFontScaling={false}
            >
              距离下个等级
              <Text style={{ color: mainColor }}>{levelInfo.get('nextLevelName')}</Text>
              还需要
              <Text style={styles.color2}>
                {levelInfo.get('needGrowthValue') > 0
                  ? levelInfo.get('needGrowthValue')
                  : 1}
              </Text>
              成长值
            </Text>
          )}
        </ImageBackground>
      </View>
    );
  }

  _renderItem({ item, index }) {
    const { atPresentEquityNum } = this.props.relaxProps;
    return (
      <View
        style={[styles.box, atPresentEquityNum != index && styles.scaleBox]}
        key={index}
      >
        <View style={styles.boxItem}>
          <Image style={styles.img} source={{ uri: item.rankBadgeImg }} />
          <Text style={styles.title} numberOfLines={1} allowFontScaling={false}>
            {item.customerLevelName}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    width: screenWidth,
    height: screenWidth * 0.4533,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  headerBox: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'center',
    ..._.ifIphoneX(
      {
        top: 40
      },
      {
        top: isAndroid ? 10 : 30
      }
    )
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
  back: {
    width: 10,
    height: 19
  },
  container: {
    backgroundColor: '#fff'
  },
  levelTextBox: {
    width: screenWidth,
    height: screenWidth * 0.1467,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  levelText: {
    color: '#333',
    fontSize: 14
  },
  levelTips: {
    marginTop: 5,
    color: '#333',
    fontSize: 12
  },
  color2: {
    color: '#cea664'
  },
  title: {
    color: '#fff',
    fontSize: 10,
    marginTop: 5,
    paddingHorizontal: 5
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 82,
    height: 82,
    borderWidth: 5,
    borderRadius: 41,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  boxItem: {
    width: 77,
    height: 77,
    borderRadius: 38.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1a964'
  },
  img: {
    width: 28,
    height: 28,
    resizeMode: 'contain'
  },
  scaleBox: {
    transform: [{ scale: 0.79 }],
    opacity: 0.8
  }
});
