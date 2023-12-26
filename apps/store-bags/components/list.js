import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax, msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import WMImage from 'wmkit/image/index';

import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import { screenWidth } from 'wmkit/styles/index';
import Price from '../../../wmkit/price';

@Relax
export default class List extends React.Component {
  static relaxProps = {
    goodsList: 'goodsList'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { goodsList } = this.props.relaxProps;
    // let noneStock = true;
    return (
      <View style={styles.bigBox}>
        {goodsList.map((goodsInfo, index) => {
          // 库存等于0或者起订量大于剩余库存
          const invalid = goodsInfo.get('stock') <= 0;
          return (
            <View key={index}>
              <TouchableOpacity
                key={1}
                activeOpacity={0.6}
                style={styles.bigView}
                onPress={() =>
                  !invalid &&
                  msg.emit('router: goToNext', {
                    routeName: 'StoreBagsGoodsDetail',
                    skuId: goodsInfo.get('goodsInfoId')
                  })
                }
              >
                <WMImage
                  style={styles.bigImg}
                  src={goodsInfo.get('goodsInfoImg')}
                />
                <View style={styles.wrapper}>
                  <View style={styles.tagCon}>
                    {goodsInfo.get('companyType') == 0 && <SelfSalesLabel />}

                    <Text
                      style={[styles.title, invalid && { color: '#999' }]}
                      allowFontSacling={false}
                      numberOfLines={1}
                    >
                      {goodsInfo.get('goodsInfoName')}
                    </Text>
                  </View>
                  <Text
                    style={styles.gec}
                    allowFontSacling={false}
                    numberOfLines={1}
                  >
                    {goodsInfo.get('specText')}
                  </Text>
                  <View style={styles.rowFlex}>
                    <View style={styles.tagCon}>
                      <Price
                          buyPoint={goodsInfo.get('buyPoint')}
                          price={goodsInfo.get('salePrice')}
                      />
                      {invalid && (
                        <View style={styles.lack}>
                          <Text
                            allowFontScaling={false}
                            style={styles.lackText}
                          >
                            缺货
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigBox: {
    paddingLeft: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  bigView: {
    width: (screenWidth - 30) / 2,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#ebebeb'
  },
  bigImg: {
    width: (screenWidth - 30) / 2 - 2,
    height: (screenWidth - 30) / 2 - 2
  },
  lack: {
    width: 35,
    height: 15,
    marginLeft: 5,
    backgroundColor: '#cccccc',
    borderRadius: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lackText: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  wrapper: {
    padding: 10,
    width: (screenWidth - 30) / 2 - 22,
  },
  title: {
    color: '#000',
    fontSize: 14
  },
  gec: {
    color: '#999999',
    fontSize: 13,
    marginTop: 5,
    height: 15
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  tagCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20
  }
});
