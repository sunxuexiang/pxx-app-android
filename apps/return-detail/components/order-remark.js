/**
 * Created by hht on 2017/8/30.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio, ScrollView } from 'react-native';
import { Relax } from 'plume2';

import WMImage from 'wmkit/image/index';

@Relax
export default class OrderRemark extends Component {
  static relaxProps = {
    detail: 'detail'
  };

  render() {
    const { detail } = this.props.relaxProps;
    const returnWay = detail.get('returnWay')
      ? detail.get('returnWay').toJS()
      : {};
    const returnReason = detail.get('returnReason')
      ? detail.get('returnReason').toJS()
      : {};
    const returnType = detail.get('returnType');

    // 附件
    const attachments = [];
    detail.get('images') &&
      detail.get('images').map((v) => {
        return attachments.push({ image: JSON.parse(v).url });
      });

    return (
      <View style={styles.container}>
        <View style={styles.remarkItem}>
          <Text allowFontScaling={false} style={styles.text}>
            退货原因
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            {
              Object.getOwnPropertyNames(returnReason).map(
                (key) => returnReason[key]
              )[0]
            }
          </Text>
        </View>
        {/**退货才有退货方式**/
        returnType == 'RETURN' ? (
          <View style={styles.remarkItem}>
            <Text allowFontScaling={false} style={styles.text}>
              退货方式
            </Text>
            <Text allowFontScaling={false} style={styles.text}>
              {
                Object.getOwnPropertyNames(returnWay).map(
                  (key) => returnWay[key]
                )[0]
              }
            </Text>
          </View>
        ) : null}

        <View style={styles.remarkItem}>
          <Text allowFontScaling={false} style={styles.text}>
            退货说明
          </Text>
          <Text allowFontScaling={false} style={styles.reason}>
            {detail.get('description')}
          </Text>
        </View>
        <View style={styles.backItem}>
          <View style={styles.backTitle}>
            <Text allowFontScaling={false} style={styles.text}>
              退单附件
            </Text>
          </View>
          <ScrollView horizontal={true} style={styles.backImages}>
            {attachments.length > 0 ? (
              attachments.map((v, index) => {
                return (
                  <View style={styles.image}>
                  <WMImage
                    zoom
                    key={index}
                    style={[styles.image,{borderWidth:0}]}
                    src={v.image}
                  />
                  </View>
                
                );
              })
            ) : (
              <Text allowFontScaling={false} style={{ color: '#8b8b8b' }}>
                无
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8
    // borderTopWidth: 1 / PixelRatio.get(),
    // borderTopColor: '#ebebeb'
  },
  remarkItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    alignItems: 'flex-start'
  },
  backItem: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    padding: 10
  },
  backTitle: {
    height: 30,
    justifyContent: 'center'
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 12,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#dddddd'
  },
  backImages: {
    flexDirection: 'row'
  },
  center: {
    justifyContent: 'center'
  },
  reason: {
    color: '#333',
    flex: 1,
    fontSize: 12,
    marginLeft: 20,
    lineHeight: 16,
    textAlign: 'right'
  },
  text: {
    color: '#333',
    fontSize: 12
  }
});
