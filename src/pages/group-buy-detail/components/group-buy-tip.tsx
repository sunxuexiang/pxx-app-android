import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { msg } from 'plume2';
import { store2Props } from '../selectors';
import { screenWidth } from 'wmkit/styles/index';
import { isAndroid } from 'wmkit/styles/index';
import moment from 'moment';
import ValidConst from 'wmkit/validate';
import * as _ from '../../../../wmkit/common/util'; // added by scx 

type IGroupBuyTipProps = T.IProps & T.IGroupBuyTipProps;

@connect<Partial<IGroupBuyTipProps>, T.IGroupBuyTipState>(
  store2Props,
  actions
)
export default class GroupBuyTip extends React.Component<
  Partial<IGroupBuyTipProps>,
  T.IGroupBuyTipState
> {
  timer: any;
  constructor(props: IGroupBuyTipProps) {
    super(props);
  }

  // componentDidMount() {
  //   //获取最近的待成团实例
  //   let activityId = this.props.activity.activityInfo.grouponActivityId;
  //   this.timer = setInterval(() => {
  //     this.props.actions.getGrouponLatestInstanceByActivityId(activityId);
  //   }, 3000);
  //   msg.on('group-buy-detail:clearNotice', this._clearNoticeTimer);
  // }

  componentWillUnmount() {
    msg.emit('group-buy-detail:clearNotice');
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

    //获取的团实例是否是在当前团之后开的
    // let after =
    //   notice.grouponInst.grouponInstance &&
    //   moment(notice.grouponInst.grouponInstance.createTime).isAfter(
    //     moment.now()
    //   );
    const regex = ValidConst.phone;
    let showName;

    if (Object.keys(notice.grouponInst).length > 0) {
      let customerName = notice.grouponInst.customerName;
      //如果是手机号形式，需要隐藏中间四位
      if (regex.test(notice.grouponInst.customerName)) {
        showName =
          customerName.substr(0, 3) + '****' + customerName.substr(7, 4);
      } else {
        showName = customerName;
      }
    }

    return (
      Object.keys(notice.grouponInst).length > 0 && (
        <TouchableOpacity
          style={styles.groupBuyTip}
          activeOpacity={0.8}
          onPress={
            () => {
              //先清定时器
              if (this.timer) {
                clearInterval(this.timer);
              }
              msg.emit('router: goToNext', {
                routeName: 'GroupBuyDetail',
                grouponNo: notice.grouponInst.grouponInstance.grouponNo
              });
            }
            // msg.emit('router: replace', {
            //   routeName: 'GroupBuyDetail',
            //   grouponNo: notice.grouponInst.grouponInstance.grouponNo
            // })
          }
        >
          <View style={styles.tipBtn}>
            <Image source={require('../img/laba.png')} style={styles.laba} />
            <Text allowFontScaling={false} style={styles.tipText}>{showName} 邀请你来参团</Text>
          </View>
        </TouchableOpacity>
      )
    );
  }

  _clearNoticeTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };
}

const styles = StyleSheet.create({
  groupBuyTip: {
    width: screenWidth,
    justifyContent: 'center',
    paddingLeft: 12,
    position: 'absolute',
    ..._.ifIphoneX(
      {
        top: 80
      },
      {
        top: isAndroid ? 50 : 60
      }
    ),
    zIndex: 999
  },
  tipBtn: {
    width: 159,
    height: 23,
    borderWidth: 2,
    flexDirection: 'row',
    borderColor: '#FF1F4E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  },
  laba: {
    width: 12,
    height: 10,
    marginRight: 5
  },
  tipText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#FF1F4E'
  }
});
