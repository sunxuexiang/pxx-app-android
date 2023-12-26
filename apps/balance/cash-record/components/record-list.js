import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { msg, Relax } from 'plume2';
import * as _ from 'wmkit/common/util';
import { noop } from 'wmkit/noop';
import WMEmpty from 'wmkit/empty';
import * as WMkit from 'wmkit/kit';
import WmListView from 'wmkit/list-view/index';
import { Confirm } from 'wmkit/modal/confirm';
import { mainColor } from '@/wmkit/styles';

@Relax
export default class RecordList extends React.Component {
  static relaxProps = {
    form: 'form',
    initialEnd: 'initialEnd',
    dealData: noop,
    cancelDrawCash: noop
  };

  render() {
    const { dealData, initialEnd, form } = this.props.relaxProps;

    const listViewProps = {
      loadingStyle:{marginTop:200},
      url: '/draw/cash/page',
      params: form.toJS(),
      isPagination: true,
      renderRow: (item) => this.cashRecordItem(item),
      onDataReached: dealData,
      renderEmpty: () => (
        <WMEmpty
          tipStyle={{ fontSize: 14, color: '#999' }}
          imgStyle={{ width: 104, height: 104 }}
          emptyImg={require('../img/list-none.png')}
          desc="您暂时还没有提现申请哦"
        />
      ),
      keyProps: 'drawCashId',
      extraData: { toRefresh: initialEnd }
    };

    return (
      <SafeAreaView style={styles.container}>
        <WmListView noMoreStyle={{backgroundColor:'#f5f5f5'}} {...listViewProps} />
      </SafeAreaView>
    );
  }


  /**
   * 渲染提现列表
   * @param drawCash
   * @returns {*}
   */
  cashRecordItem = (drawCash) => {
    // 提现记录的状态
    let statusTxt = '';
    if (drawCash.customerOperateStatus == 1) {
      statusTxt = '已取消';
      statusClass = styles.typeSuccess;
    } else if (drawCash.customerOperateStatus == 0) {
      if (drawCash.auditStatus == 0) {
        statusTxt = '待审核';
        statusClass = [styles.typeLoading, { color: mainColor }];
      } else if (drawCash.auditStatus == 1) {
        statusTxt = '已打回';
        statusClass = styles.typeError;
      } else if (drawCash.auditStatus == 2 && drawCash.drawCashStatus == 2) {
        statusTxt = '已完成';
        statusClass = styles.typeSuccess;
      } else if (drawCash.auditStatus == 2 && drawCash.drawCashStatus == 1) {
        statusTxt = '待审核';
        statusClass = [styles.typeLoading, { color: mainColor }];
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.ViewBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.row}
            onPress={() => {
              if (!WMkit.isLoginOrNotOpen()) {
                msg.emit('loginModal:toggleVisible', {
                  callBack: () => {
                    msg.emit('router: goToNext', {
                      routeName: 'CashDetail',
                      drawCashId: drawCash.drawCashId
                    });
                  }
                });
              } else {
                msg.emit('router: goToNext', {
                  routeName: 'CashDetail',
                  drawCashId: drawCash.drawCashId
                });
              }
            }}
          >
            <View style={styles.upBox}>
              <Text allowFontScaling={false} style={styles.money}>
                <Text allowFontScaling={false} style={{fontSize:12}}>¥</Text> {drawCash.drawCashSum.toFixed(2)}
              </Text>
              <Text allowFontScaling={false} style={styles.order}>
                {drawCash.drawCashNo}
              </Text>
              <Text allowFontScaling={false} style={styles.date}>
                {_.formatDate(drawCash.applyTime)}
              </Text>
            </View>
            <View style={styles.centerBox}>
              <Text allowFontScaling={false} style={statusClass}>
                {statusTxt}
              </Text>
              {drawCash.customerOperateStatus == 0 &&
              drawCash.auditStatus == 0 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.cancelBtn}
                  onPress={() => this._cancelDrawCash(drawCash.drawCashId)}
                >
                  <Text allowFontScaling={false} style={styles.btnText}>
                    取消申请
                  </Text>
                </TouchableOpacity>
             )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /**
   * 取消提现申请
   */
  _cancelDrawCash = (drawCashId) => {
    const { cancelDrawCash } = this.props.relaxProps;
    Confirm({
      text: '是否确认取消当前提现申请',
      cancelText: '再想想',
      okText: '确认',
      okFn: async () => {
        cancelDrawCash(drawCashId);
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 6,
  },
  ViewBox: {
    // borderTopWidth: 2,
    // borderTopColor: '#000',
    // borderLeftWidth: 1 / PixelRatio.get(),
    // borderLeftColor: '#DCDEE1',
    // borderRightWidth: 1 / PixelRatio.get(),
    // borderRightColor: '#DCDEE1',
    flexDirection: 'column',
    marginTop: 12,
    backgroundColor:'#fff',
    borderRadius:8,
    flex: 1,
  },
  cash: {
    width: 200,
    height: 195,
    marginTop: 85
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:12,
    paddingVertical:14,
    flex:1
  },
  upBox: {

    flexDirection: 'column',
  },
  order: {
    fontSize: 12,
    color: '#999'
  },
  audit: {
    fontSize: 12,
    color: '#999'
  },
  centerBox: {
    flexDirection: 'column',
    alignItems:'flex-end'
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop:5
  },
  money: {
    fontSize: 16,
    color: '#333'
  },
  grayLine: {
    marginLeft: 12,
    marginRight: 8,
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb'
  },
  downBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
    marginTop: 7,
    marginBottom: 10
  },
  cancelBtn: {
    width:64,
    height:24,
    borderRadius:12,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#e6e6e6',
    alignItems:'center',
    justifyContent:'center',
    marginTop:18
  },
  btnText: {
    fontSize: 10,
    color: '#333'
  },
  typeLoading:{
    fontSize: 12,
  },
  typeError:{
    color: '#ff0022',
    fontSize: 12,
  },
  typeSuccess:{
    color: '#999',
    fontSize: 12,
  },
});
