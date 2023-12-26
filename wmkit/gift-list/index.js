import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import WMImage from 'wmkit/image/index';
import LinearGradient from 'react-native-linear-gradient';
import Price from '../biz/cartprice'
export default class GiftList extends Component {
  render() {
    const { gifts, shipMode } = this.props;
    return (
      <View style={styles.container}>
        {gifts.map((item, index) => (
           item.num != 0 && <View style={styles.item} key={index}>
            <View>
              <WMImage style={styles.img} src={item.pic&&`${item.pic}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_100,h_100`} />
            </View>
            <View style={styles.content}>
              <View style={styles.titleBox}>
                <View style={styles.label}>
                  <LinearGradient
                    colors={['#e94600', '#ffeb3c']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.tagGift}
                  >
                    <Text style={styles.tagText} allowFontSacling={false}>
                      赠品
                    </Text>
                  </LinearGradient>
                </View>
                <Text
                  style={styles.title}
                  allowFontSacling={false}
                  numberOfLines={1}
                >
                  {item.skuName}
                </Text>
              </View>
              <Text
                style={styles.gec}
                allowFontSacling={false}
                numberOfLines={1}
              >
                {item.specDetails ? item.specDetails : ''}
              </Text>
              <View style={styles.bottom}>
                {!shipMode?<Price price='0.00'/>:null}
                <Text allowFontSacling={false} style={styles.grey}>
                  ×{shipMode ? item.itemNum : item.num}
                  {item.unit ? item.unit : ''}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingRight: 12,
    paddingLeft: 12,
    marginLeft: 12,
    marginRight: 12,
    // paddingTop: 16,
    paddingBottom: 0,
    borderRadius: 6,
    overflow: 'hidden'
  },
  img: {
    width: 80,
    height: 80
  },
  item: {
    marginBottom: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 12,
    height: 80
  },
  titleBox: {
    flexDirection: 'row'
  },
  label: {
    left: 0
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12,
    lineHeight: 16,
    // marginBottom: 4,
    flexWrap: 'wrap'
  },
  gec: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 10
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'space-between'
  },
  price: {
    fontSize: 15,
    flex: 1
  },
  blueText: {
    color: '#3d85cc',
    fontSize: 14,
    backgroundColor: '#cb4255'
  },
  grey: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.8)'
  },
  tagGift: {
    backgroundColor: '#ff7e90',
    width: 28,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2
  },
  tagText: {
    color: '#fff',
    fontSize: 10
  }
});
