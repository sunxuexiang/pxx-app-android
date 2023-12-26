import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Relax } from 'plume2';

import FormItem from 'wmkit/form/form-item';
import * as _ from 'wmkit/common/util';
import { mainColor } from 'wmkit/styles/index';

@Relax
export default class Form extends React.Component {
  static relaxProps = {
    drawCashDetail: 'drawCashDetail',
    headImgUrl: 'headImgUrl'
  };

  render() {
    const { drawCashDetail, headImgUrl } = this.props.relaxProps;
    let statusTxt = '';
    if (drawCashDetail.get('customerOperateStatus') == 1) {
      statusTxt = '已取消';
    } else if (drawCashDetail.get('customerOperateStatus') == 0) {
      if (drawCashDetail.get('auditStatus') == 0) {
        statusTxt = '待审核';
      } else if (drawCashDetail.get('auditStatus') == 1) {
        statusTxt = '已打回';
      } else if (
        drawCashDetail.get('auditStatus') == 2 &&
        drawCashDetail.get('drawCashStatus') == 2
      ) {
        statusTxt = '已完成';
      } else if (
        drawCashDetail.get('auditStatus') == 2 &&
        drawCashDetail.get('drawCashStatus') == 1
      ) {
        statusTxt = '待审核';
      }
    }
    const drawCashChannel =
      drawCashDetail.get('drawCashChannel') == 0 ? '微信钱包' : '支付宝';
    const drawCashSum = _.fmoney(drawCashDetail.get('drawCashSum'), 2);
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        iosautomaticallyAdjustContentInsets={false}
        alwaysBounceVertical={false}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.row}>
            <FormItem
              itemStyle={{borderBottomWidth:0}}
              labelName="提现状态"
              placeholder={statusTxt}
              textStyle={{ color: mainColor}}
            />
          </View>
          <FormItem
            itemStyle={{borderBottomWidth:0}}
            labelName="提现方式"
            placeholder={drawCashChannel}
            textStyle={{ color: '#333' }}
          />
          <FormItem
            itemStyle={{borderBottomWidth:0}}
            labelName="提现单号"
            placeholder={drawCashDetail.get('drawCashNo')}
            textStyle={{ color: '#333' }}
          />
          <FormItem
            itemStyle={{borderBottomWidth:0}}
            labelName="申请时间"
            placeholder={_.formatDate(drawCashDetail.get('applyTime'))}
            textStyle={{ color: '#333' }}
          />
          <FormItem
            itemStyle={{borderBottomWidth:0}}
            labelName="提现账户"
            style={styles.centerBox}
            placeholder={
              <View style={styles.rowFlex}>
                <Text allowFontScaling={false} style={styles.text}>
                  {drawCashDetail.get('drawCashAccountName')}
                </Text>
                <Image
                  style={styles.img}
                  source={
                    headImgUrl
                      ? { uri: headImgUrl }
                      : require('../img/default-img.png')
                  }
                />
              </View>
            }
          />
          <FormItem
            itemStyle={{borderBottomWidth:0}}
            labelName="提现金额"
            placeholder={`¥${drawCashSum}`}
            textStyle={{ color: '#333' }}
          />
          <FormItem
            itemStyle={{borderBottomWidth:0}}
            labelName="申请备注"
            placeholder={
              drawCashDetail.get('drawCashRemark')
                ? drawCashDetail.get('drawCashRemark')
                : '无'
            }
            textStyle={{ color: '#333' }}
          />
          {drawCashDetail.get('auditStatus') == 1 && (
            <FormItem
              itemStyle={{borderBottomWidth:0}}
              labelName="驳回原因"
              placeholder={drawCashDetail.get('rejectReason') || '无'}
            />
          )}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row:{
    paddingVertical:12
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  centerBox: {
    alignItems: 'center'
  },
  text: {
    color: '#333',
    marginRight: 5
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
});
