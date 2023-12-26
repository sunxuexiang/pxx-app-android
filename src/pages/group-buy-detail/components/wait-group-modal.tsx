import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';
import { msg } from 'plume2';
import moment from 'moment';
import CountDown from 'wmkit/count-down';
import * as T from '../types';
import { GrouponInstanceWithCustomerInfoVO } from '../../../web-api/GrouponBaseController';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import WmListView from 'wmkit/list-view/index';
import { mainColor } from 'wmkit/styles/index';

type IWaitGroupModalProps = T.IProps & T.IWaitGroupModalProps;

@connect<Partial<IWaitGroupModalProps>, T.IWaitGroupModalState>(
  store2Props,
  actions
)
export default class WaitGroupModal extends React.Component<
  Partial<IWaitGroupModalProps>,
  T.IWaitGroupModalState
> {
  constructor(props: IWaitGroupModalProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      activity,

      goods,

      notice,

      otherGroup
    } = this.props;

    const listViewProps = {
      url: '/groupon/instance/page',
      params: {
        grouponActivityId: activity.activityInfo.grouponActivityId
      },
      dataPropsName: 'context.grouponInstanceVOS.content',
      isPagination: true,
      renderRow: (item: GrouponInstanceWithCustomerInfoVO) => {
        const endTime = moment(item.endTime);
        return (
          <View style={styles.info} key={item.grouponNo}>
            <View style={styles.leftPointer}>
              <Image
                style={styles.avatar}
                source={
                  item.headimgurl
                    ? { uri: item.headimgurl }
                    : require('../img/default-img.png')
                }
              />
              <Text allowFontScaling={false} style={styles.name}>{item.customerName}</Text>
            </View>
            <View style={styles.rightPointer}>
              <View>
                <Text allowFontScaling={false} style={styles.num}>
                  还差
                  <Text allowFontScaling={false} style={[styles.num, {color: mainColor}]}>
                    {item.grouponNum - item.joinNum}人
                  </Text>
                  成团
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text allowFontScaling={false} style={styles.time}>距结束</Text>
                  <CountDown
                    timerName="GroupBuyDetail"
                    showTimeDays={true}
                    allowFontScaling={false}
                    numberOfLines={1}
                    //倒计时结束，刷新页面
                    endHandle={() => {
                      //刷新拼团详情
                      msg.emit('router: refreshRoute', {
                        routeName: 'GroupBuyDetail'
                      });
                    }}
                    timeTextStyle={[styles.time, styles.timeText, {color: mainColor}]}
                    timeOffset={moment
                      .duration(endTime.diff(goods.serverTime))
                      .asSeconds()
                      .toFixed(0)}
                  />
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.btn, {backgroundColor: mainColor}]}
                onPress={() => action.modalJoinGroup(item.grouponNo)}
              >
                <Text allowFontScaling={false} style={styles.btnText}>立刻参团</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      },
      keyProps: 'grouponNo'
      // extraData: { toRefresh: initialEnd }
    };

    return (
      <View style={styles.mask}>
        <View style={styles.modal}>
          <ImageBackground
            style={styles.bg}
            source={require('../img/head1.png')}
          />
          <WmListView style={{ backgroundColor: '#fff' }} {...listViewProps} />
        </View>
        <TouchableOpacity
          style={styles.btnClose}
          activeOpacity={0.8}
          onPress={() => action.toggleWaitGroupModal()}
        >
          <Image style={styles.close} source={require('../img/close.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: 342,
    height: 412
  },
  bg: {
    height: 87
  },
  info: {
    marginTop: 21,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 11,
    paddingRight: 20
  },
  leftPointer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightPointer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  name: {
    marginLeft: 11,
    fontSize: 14,
    lineHeight: 16
  },
  btn: {
    marginLeft: 12,
    width: 63,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11
  },
  btnText: {
    fontSize: 10,
    color: '#fff'
  },
  num: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'right'
  },
  time: {
    fontSize: 10,
    color: '#999999',
    textAlign: 'right'
  },
  btnClose: {
    marginTop: 25
  },
  close: {
    width: 43,
    height: 43
  },
  timeText: {
    marginLeft: 5
  }
});
