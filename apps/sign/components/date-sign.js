import React from 'react';
import { Relax } from 'plume2';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { isAndroid, screenWidth, mainColor } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import LinearGradient from 'react-native-linear-gradient';
/**
 * 签到内容
 */
@Relax
export default class DateSign extends React.Component {
  static relaxProps = {
    userInfo: 'userInfo',
    signPoint: 'signPoint',
    signRecordList: 'signRecordList',
    // 签到是否可以获取积分
    pointsFlag: 'pointsFlag',
    // 签到是否可以获取成长值
    growthFlag: 'growthFlag',
    growthValue: 'growthValue',
    signFlag: 'signFlag',
    dayNumArr: 'dayNumArr',
    sign: noop,
    // 成长值总开关
    growthValueIsOpen: 'growthValueIsOpen',
    // 积分总开关
    pointsIsOpen: 'pointsIsOpen'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      userInfo,
      signPoint,
      pointsFlag,
      sign,
      signFlag,
      growthValue,
      growthFlag,
      growthValueIsOpen,
      pointsIsOpen
    } = this.props.relaxProps;
    return (
      <View style={styles.box}>
        {/* <Image source={require('../img/img1.png')} style={styles.bd} />
        {!signFlag ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.leftImg, { paddingLeft: 24, paddingRight: 30 }]}
            onPress={() => sign()}
          >
            <Image source={require('../img/img2.png')} style={styles.submain} />
          </TouchableOpacity>
        ) : (
          <View style={styles.grayBtn}>
            <Text style={styles.grayText} allowFontScaling={false}>
              已签到
            </Text>
          </View>
        )} */}
        <LinearGradient
          colors={['#FFEEDB', '#FFDFC7']}
          style={styles.main}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.bgWrap}>
            {pointsIsOpen && pointsFlag && growthValueIsOpen && growthFlag ? (
              <Text style={[styles.info, { color: mainColor }]} allowFontScaling={false}>
                今日签到可以获得{' '}
                <Text
                  style={{ color: mainColor, fontSize: 24, fontWeight: 'bold' }}
                >
                  {signPoint}
                </Text>{' '}
                积分{' '}
                <Text
                  style={{ color: mainColor, fontSize: 24, fontWeight: 'bold' }}
                >
                  {growthValue}
                </Text>{' '}
                成长值
              </Text>
            ) : pointsIsOpen && pointsFlag ? (
              <Text style={[styles.info, { color: mainColor }]} allowFontScaling={false}>
                今日签到可以获得{' '}
                <Text
                  style={{ color: mainColor, fontSize: 24, fontWeight: 'bold' }}
                >
                  {signPoint}
                </Text>{' '}
                积分
              </Text>
            ) : growthValueIsOpen && growthFlag ? (
              <Text style={[styles.info, { color: mainColor }]} allowFontScaling={false}>
                今日签到可以获得{' '}
                <Text
                  style={{ color: mainColor, fontSize: 24, fontWeight: 'bold' }}
                >
                  {growthValue}
                </Text>{' '}
                成长值
              </Text>
            ) : null}
          </View>
          <View style={[styles.group, !pointsFlag && styles.mTop]}>
            <Text style={styles.sunday} allowFontScaling={false}>
              周一
            </Text>
            <Text style={styles.sunday} allowFontScaling={false}>
              周二
            </Text>
            <Text style={styles.sunday} allowFontScaling={false}>
              周三
            </Text>
            <Text style={styles.sunday} allowFontScaling={false}>
              周四
            </Text>
            <Text style={styles.sunday} allowFontScaling={false}>
              周五
            </Text>
            <Text style={styles.sunday} allowFontScaling={false}>
              周六
            </Text>
            <Text style={styles.sunday} allowFontScaling={false}>
              周日
            </Text>
          </View>
          <View style={styles.container}>{this.getItems()}</View>
          {!signFlag ? (
            <TouchableOpacity activeOpacity={0.8} onPress={() => sign()}>
              <LinearGradient
                colors={[mainColor, mainColor]}
                style={styles.btnSign}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text style={styles.signText} allowFontScaling={false}>
                  立即签到
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <LinearGradient
              colors={['#e6e6e6', '#ccc']}
              style={styles.btnSign}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={styles.signText} allowFontScaling={false}>
                已签到
              </Text>
            </LinearGradient>
          )}
        </LinearGradient>
      </View>
    );
  }

  getItems = () => {
    let today = new Date(Date.now());
    today = new Date(today.setDate(1));
    let firstWeekDay = today.getDay();
    firstWeekDay == 0 ? (firstWeekDay = 7) : null;
    let days = this.getCountDays();

    const {
      dayNumArr,
      pointsIsOpen,
      pointsFlag,
      signPoint
    } = this.props.relaxProps;

    const results = [];
    for (let j = 1; j < firstWeekDay; j++) {
      results.push(<View key={j + 100} style={[styles.group2]} />);
    }
    for (let i = 1; i <= days; i++) {
      results.push(
        dayNumArr && dayNumArr.indexOf(i) != -1 ? (
          <LinearGradient
            colors={[mainColor, '#fff']}
            style={styles.selectGroup}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 1, y: 0.3 }}
          >
            {pointsIsOpen && pointsFlag && (
              <Text style={styles.selectNum5} allowFontScaling={false}>
                {signPoint}
              </Text>
            )}
            <Text style={styles.selectNum5} allowFontScaling={false}>
              已签
            </Text>
          </LinearGradient>
        ) : (
          <View key={i} style={[styles.group1]}>
            <Image source={require('../img/img6.png')} style={styles.icon} />
            <Text style={[styles.num5]}>{i < 10 ? '0' + i : i}</Text>
          </View>
        )
      );
    }
    return results;
  };

  getCountDays = () => {
    // let curDate = new Date();
    // /* 获取当前月份 */
    // let curMonth = curDate.getMonth();
    // //生成实际的月份: 由于curMonth会比实际月份小1, 故需加1
    // curDate.setMonth(curMonth + 1);
    // /* 将日期设置为0 */
    // curDate.setDate(0);
    // /* 返回当月的天数 */
    // return curDate.getDate();

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let lastDay = new Date(year, month, 0).getDate();
    return lastDay;
  };
}

const styles = StyleSheet.create({
  box: {
    marginTop: -100
  },
  submain: {
    marginLeft: 22,
    width: 113,
    height: 45,
    marginBottom: isAndroid ? 10 : 22
  },
  main: {
    flexDirection: 'column',
    marginHorizontal: 12,
    width: screenWidth - 24,
    minHeight: 378,
    paddingVertical: 16,
    paddingLeft: 12,
    borderRadius: 8
    // shadowOffset: { width: 0, height: 0 },
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // borderBottomLeftRadius: 80,
    // borderBottomRightRadius: 8
  },
  bgWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  info: {
    fontSize: 14
  },
  group: {
    flexDirection: 'row',
    marginBottom: 8
  },
  sunday: {
    color: '#985B31',
    fontSize: 12,
    width: screenWidth * 0.112,
    textAlign: 'center',
    marginRight: 6
  },
  container: {
    flexDirection: 'row',
    marginBottom: 4,
    flexWrap: 'wrap'
  },
  group1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#fff',
    width: screenWidth * 0.11,
    height: screenWidth * 0.11,
    marginRight: 6,
    marginBottom: 6
  },
  group2: {
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'transparent',
    width: screenWidth * 0.112,
    height: screenWidth * 0.112,
    marginRight: 6,
    marginBottom: 6
  },
  selectGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: 'transparent',
    width: screenWidth * 0.112,
    height: screenWidth * 0.112,
    marginRight: 6,
    marginBottom: 6
  },
  icon: {
    width: 12,
    height: 12,
    marginBottom: 2
  },
  icon1: {
    width: 20,
    height: 19,
    marginBottom: 7
  },
  num5: {
    color: '#985B31',
    fontSize: 10
  },
  selectNum5: {
    color: '#fff',
    fontSize: 10
  },
  mTop: {
    marginTop: 39
  },
  btnSign: {
    width: screenWidth - 48,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  signText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: "500"
  }
});

