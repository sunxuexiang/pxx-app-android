import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { screenWidth, mainColor } from 'wmkit/styles/index';
import moment from 'moment';
import WMEmpty from 'wmkit/empty';
import * as _ from 'wmkit/common/util';
import WmListView from 'wmkit/list-view/index';

import api from 'api';
import { msg } from 'plume2';
import { config } from 'wmkit/config';
import {debounce} from 'lodash';

type IInfoProps = T.IProps & T.IInfoProps;

let today = moment(new Date()).format('YYYY/MM/DD');
let yesterday = moment(new Date())
  .add(-1, 'days')
  .format('YYYY/MM/DD');
let toYear = moment(new Date()).format('YYYY');
let num = 0;

@connect<Partial<IInfoProps>, T.IInfoState>(
  store2Props,
  actions
)
export default class Info extends React.Component<
  Partial<IInfoProps>,
  T.IInfoState
> {
  constructor(props: IInfoProps) {
    super(props);
    this.state = {
      flag: true
    };
  }

  /**

*/
  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={styles.topRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={debounce(() =>
              msg.emit('router: goToNext', {
                routeName: 'PushList',
                messageType: 1
              })
            , 500)}
            style={[styles.topItem, styles.borderLeft]}
          >
            <Image style={styles.icon} source={require('../img/service.png')} />
            <Text style={styles.title} allowFontScaling={false}>
              服务通知
            </Text>
            {main.noticeNum !== 0 && (
              <View style={[styles.round, { backgroundColor: mainColor }]}>
                <Text style={styles.roundText}>{main.noticeNum}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={debounce(() =>
              msg.emit('router: goToNext', {
                routeName: 'PushList',
                messageType: 0
              })
            , 500)}
            style={styles.topItem}
          >
            <Image style={styles.icon} source={require('../img/coupon.png')} />
            <Text style={styles.title} allowFontScaling={false}>
              优惠促销
            </Text>
            {main.preferentialNum !== 0 && (
              <View style={[styles.round, { backgroundColor: mainColor }]}>
                <Text style={styles.roundText}>{main.preferentialNum}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {this.state.flag && (
          <WmListView
            url="/appMessage/page"
            renderRow={this._infoRow}
            onDataReached={this._onDataReached}
            dataPropsName={'context.appMessageVOPage.content'}
            renderEmpty={() => (
              <WMEmpty
                emptyImg={require('../img/list-none.png')}
                desc="暂无消息哦～"
              />
            )}
          />
        )}
      </View>
    );
  }

  _infoRow = (v) => {
    let {
      actions: { action },
      main
    } = this.props;
    let twoWeek = moment()
      .subtract('days', 13)
      .format('YYYY-MM-DD'); //14天前
    let diffDays = moment(v.sendTime).diff(twoWeek, 'days'); //相差几天
    // 如果是两个星期前的日期
    if (diffDays < 0) {
      num++;
    }
    return (
      <View>
        {num === 1 && (
          <View style={styles.twoWeek}>
            <Image source={require('../img/time.png')} style={styles.time} />
            <Text allowFontScaling={false} style={styles.weekText}>两周前的消息</Text>
          </View>
        )}
        <Swipeout
          key={Math.random()}
          buttonWidth={60}
          right={[
            {
              text: '删除',
              onPress: async() => {
                await this._delete(v.appMessageId);
              },
              backgroundColor: mainColor,
              underlayColor: mainColor
            }
          ]}
          backgroundColor="#fff"
          autoClose={true}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={debounce(async () =>{
              await this.readMessage(v.appMessageId, v.isRead);
              _.pageReplace(JSON.parse(v.routeParam));
            }, 500)}
            style={styles.rowItem}
          >
            <Image
              style={styles.icon}
              source={
                v.imgUrl ? { uri: v.imgUrl } : require('../img/notice.png')
              }
            />
            <View style={styles.flex1}>
              <View style={styles.rowContent}>
                <Text
                  style={styles.specTitle}
                  allowFontScaling={false}
                  numberOfLines={1}
                >
                  {v.title}
                </Text>
                <Text style={styles.timeText} allowFontScaling={false}>
                  {this.renderTime(v.sendTime)}
                </Text>
              </View>
              <View style={[styles.rowContent, { marginTop: 6 }]}>
                <Text
                  style={styles.specText}
                  allowFontScaling={false}
                  numberOfLines={1}
                >
                  {v.content}
                </Text>
                {v.isRead === 0 && (
                  <View style={[styles.round, { backgroundColor: mainColor }]}>
                    <Text style={styles.roundText}>1</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </Swipeout>
      </View>
    );
  };

  renderTime = (sendTime) => {
    let time = moment(sendTime).format('YYYY/MM/DD');
    if (time === today) {
      return moment(sendTime).format('HH:mm');
    } else if (time === yesterday) {
      return '昨天';
    } else if (moment(sendTime).format('YYYY') === toYear) {
      return moment(sendTime).format('MM/DD');
    } else {
      return moment(sendTime).format('YY/MM/DD');
    }
  };

  readMessage = async (id, isRead) => {
    if (isRead === 1) {
      return;
    }
    try {
      await api.messageController.setMessageRead(id);
    } catch (e) {}
    this.setState({
      flag: false
    });
    this.setState({
      flag: true
    });
    this.props.actions.init();
  };

  _delete = async (id) => {
    try {
      await api.messageController.deleteById_(id);
    } catch (e) {}
    this.setState({
      flag: false
    });
    this.setState({
      flag: true
    });
    this.props.actions.init();
  };

  _onDataReached=(data)=>{
    let { actions } = this.props;
    num = 0;
    if (data.code !== config.SUCCESS_CODE) {
      return false;
    }
    actions.init();
  }
}

const styles = StyleSheet.create({
  info: {},
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flex1: {
    flex: 1,
    paddingLeft: 12
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff'
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginBottom: 12
  },
  topItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    paddingLeft: 12
  },
  borderLeft: {
    borderRightColor: '#eee',
    borderRightWidth: 1
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  title: {
    marginLeft: 12,
    color: '#333',
    fontSize: 16
  },
  round: {
    marginLeft: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundText: {
    color: '#fff',
    fontSize: 10
  },
  itemStyle: {},
  minWidth: {
    minWidth: 50
  },
  specTitle: {
    width: screenWidth - 142,
    color: '#333',
    fontSize: 14
  },
  specText: {
    flex: 1,
    color: '#666',
    fontSize: 12
  },
  timeText: {
    color: '#666',
    fontSize: 12
  },
  twoWeek: {
    padding: 12,
    marginTop: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  time: {
    width: 16,
    height: 16
  },
  weekText: {
    color: '#999',
    marginLeft: 8
  }
});
