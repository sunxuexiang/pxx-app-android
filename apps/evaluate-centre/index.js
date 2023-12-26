import React from 'react';
import {
  View,
  Text, TouchableOpacity, ScrollView
} from 'react-native';
import Header from 'wmkit/header';
import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';

import styles from "./style"

const img = "https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/201902221648454162.jpg"

export default class EvaluateCentre extends React.Component {

  render() {
    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    return (
      <View style={styles.container}>
        <Header title="评价中心" renderLeft={noop} />
        {/* 头部table */}
        <View style={styles.headTable}>
          <TouchableOpacity style={styles.tableTitleSelect}>
            <Text allowFontScaling={false} style={styles.itemSelect}>待评价 &nbsp;&nbsp;12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tableTitle}>
            <Text allowFontScaling={false} style={styles.item}>已评价 &nbsp;&nbsp;333</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tableTitle}>
            <Text allowFontScaling={false} style={styles.item}>待评价 &nbsp;&nbsp;333</Text>
          </TouchableOpacity>
        </View>
        {/* 类表 */}
        <ScrollView>

          {
            data.map((item) => {

              return (
                <View style={styles.list} key={item}>
                  <View style={styles.listLeft}>
                    <WMImage style={styles.img} src={img} />
                  </View>
                  <View style={styles.listRightDetail}>
                    <View style={styles.specificationText}>
                      <Text allowFontScaling={false} numberOfLines={1}> 沙滩条纹短裤沙滩条纹短裤沙滩条纹短裤沙滩条纹短裤沙滩条纹短裤沙滩条纹短裤</Text>
                    </View>
                    <View style={styles.specification}>
                      <Text allowFontScaling={false} style={styles.specification}>12</Text><Text  allowFontScaling={false} style={styles.specification}>12</Text><Text allowFontScaling={false} style={styles.specification}>12</Text>
                    </View>
                    <View style={styles.btnView}>
                      <TouchableOpacity style={styles.evaluateBtn}><Text allowFontScaling={false}>评价/晒单</Text></TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            })
          }





        </ScrollView>
      </View >
    )
  }
}

