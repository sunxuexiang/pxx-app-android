import React, { Component } from 'react';
import {
  PixelRatio,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { Relax, msg } from 'plume2';
import WmListView from 'wmkit/list-view/index';
import * as FindArea from 'wmkit/area/area';
import WMEmpty from 'wmkit/empty';

import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import { mainColor } from 'wmkit/styles/index';
const defaultImg = require('../img/defalutShop.png');
@Relax
export default class StoreList extends Component {
  static relaxProps = {
    initialEnd: 'initialEnd',
    keywords: 'keywords',
    companyType: 'companyType',
    provinceIds: 'provinceIds',
    cityIds: 'cityIds'
  };

  render() {
    const { initialEnd } = this.props.relaxProps;
    // 组件刚执行完mount，搜索条件没有注入进来，先不加载ListView，避免先进行一次无条件搜索，再立刻进行一次有条件搜索
    if (!initialEnd) {
      return null;
    }

    const {
      keywords,
      companyType,
      provinceIds,
      cityIds
    } = this.props.relaxProps;
    const allAreaIds = provinceIds.concat(cityIds).toJS();
    const extraData = {};
    return (
      <WmListView
        key="wmListView"
        url="/stores"
        keyProps="storeId"
        params={{
          keywords,
          companyType,
          allAreaIds
        }}
        extraData={extraData}
        renderRow={this._storeInfoRow}
        renderEmpty={() => (
          <WMEmpty
            emptyImg={require('../img/empty.png')}
            desc="没有搜到任何店铺～"
            imgStyle={{width:104,height:104}}
          />
        )}
        onDataReached={() => {}}
      />
    );
  }

  /**
   * 店铺信息
   */
  _storeInfoRow = (storeInfo) => {
    return (
      <TouchableOpacity
        key={storeInfo.storeId}
        activeOpacity={0.8}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'StoreMain',
            storeId: storeInfo.storeId
          })
        }
      >
        <View style={styles.item}>
          <View style={styles.row}>
            <Image
              source={
                storeInfo.storeLogo ? { uri: storeInfo.storeLogo } : defaultImg
              }
              style={styles.img}
            />
          </View>
          <View style={styles.content}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {storeInfo.companyType == 0 && <SelfSalesLabel />}
              <Text
                allowFontScaling={false}
                style={styles.name}
                numberOfLines={1}
              >
                {storeInfo.storeName}
              </Text>
            </View>
            <View style={styles.middle}>
              <Text
                allowFontScaling={false}
                style={styles.title}
                numberOfLines={1}
              >
                {storeInfo.supplierName}
              </Text>
              <View style={styles.rightBox}>
                <TouchableOpacity
                  style={[styles.enterShop, { borderColor: mainColor }]}
                  activeOpacity={0.8}
                  onPress={() =>
                    msg.emit('router: goToNext', {
                      routeName: 'StoreMain',
                      storeId: storeInfo.storeId
                    })
                  }
                >
                  <Text allowFontScaling={false} style={[styles.enterText, { color: mainColor }]}>
                    进店
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.addr}>
              <Image
                style={styles.icon}
                source={require('../img/address.png')}
              />
              <Text style={styles.address} allowFontScaling={false}>
                {FindArea.findCity(storeInfo.cityId)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    marginTop: 12
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 6
  },
  content: {
    marginLeft: 12,
    flex: 1
  },
  name: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    marginLeft: 4
  },
  title: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2
  },
  enterShop: {
    borderWidth: 1,
    borderRadius: 12
  },
  enterText: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 8
  },
  address: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12,
    lineHeight:12
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 4
  },
  addr: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
