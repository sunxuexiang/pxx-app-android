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
import WMEmpty from 'wmkit/empty';
import Check from 'wmkit/check';
import * as FindArea from 'wmkit/area/area';
import { noop } from 'wmkit/noop';
import WmListView from 'wmkit/list-view/index';

import SelfSalesLabel from 'wmkit/biz/selfsales-label';
import { mainColor } from 'wmkit/styles/index';
const storeStatus = {
  '1': '已关店',
  '2': '已过期',
  '3': '不存在'
};

@Relax
export default class StoreList extends Component {
  static relaxProps = {
    isEdit: 'isEdit',
    handleDataReached: noop,
    checkedStoreIds: 'checkedStoreIds',
    setCheckedStore: noop,
    toRefresh: 'toRefresh',
    initToRefresh: noop
  };

  render() {
    const { handleDataReached, initToRefresh } = this.props.relaxProps;
    const { isEdit } = this.props;

    return (
      <WmListView
        key="wmListView"
        keyProps="storeId"
        url="/store/storeFollows"
        style={isEdit && { marginBottom: 50 }}
        renderRow={this._renderRow}
        renderEmpty={() => (
          <WMEmpty
            emptyImg={require('../img/empty.png')}
            desc="您还没有关注任何店铺~"
          />
        )}
        onDataReached={handleDataReached}
        toRefresh={(_init) => initToRefresh(_init)}
      />
    );
  }

  /**
   * 跳转至店铺首页
   * @private
   */
  _goStore = (storeId) => {
    msg.emit('router: goToNext', { routeName: 'StoreMain', storeId });
  };

  /**
   * 行显示
   * @returns {*}
   * @private
   */
  _renderRow = (item) => {
    const { isEdit, checkedStoreIds } = this.props.relaxProps;
    const checked = checkedStoreIds.find((storeId) => storeId == item.storeId);
    //直辖市的时候，显示省份名称
    let cityName;
    if (
      item.provinceId == '110000' ||
      item.provinceId == '120000' ||
      item.provinceId == '310000' ||
      item.provinceId == '500000'
    ) {
      cityName = FindArea.findProviceName(item.provinceId);
    } else {
      cityName = FindArea.findCity(item.cityId);
    }
    return (
      <View key={item.storeId}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            isEdit ||
            item.storeResponseState == '1' ||
            item.storeResponseState == '2'
              ? noop()
              : this._goStore(item.storeId)
          }
        >
          <View style={styles.item}>
            <View style={styles.row} key={item.storeId}>
              {isEdit && (
                <View style={{ marginLeft: 10 }}>
                  <Check
                    checked={checked}
                    onCheck={() => this._clickItem(item.storeId, checked)}
                  />
                </View>
              )}
              <View>
                <Image
                  source={
                    item.storeLogo
                      ? { uri: item.storeLogo }
                      : require('../img/defalutShop.png')
                  }
                  style={styles.img}
                />
                {item.storeResponseState == 0 ? null : (
                  <View style={styles.imgShadow}>
                    <Text style={styles.whitetText} allowFontScaling={false}>
                      店铺
                    </Text>
                    <Text style={styles.whitetText} allowFontScaling={false}>
                      {storeStatus[item.storeResponseState]}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.row}>
                {item.companyType == 0 && <SelfSalesLabel />}
                <Text
                  allowFontScaling={false}
                  style={styles.name}
                  numberOfLines={1}
                >
                  {item.storeName}
                </Text>
              </View>

              <Text
                allowFontScaling={false}
                style={styles.title}
                numberOfLines={1}
              >
                {item.supplierName}
              </Text>
              <View style={styles.row}>
                <Image
                  source={require('../img/address.png')}
                  style={styles.addressIcon}
                />
                <Text style={styles.address} allowFontScaling={false}>
                  {cityName}
                </Text>
              </View>
            </View>
            <View style={styles.rightBox}>
              {//编辑状态或者非编辑状态且店铺为过期或关店时，不展示按钮
              !isEdit &&
                item.storeResponseState != '1' &&
                item.storeResponseState != '2' && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this._goStore(item.storeId)}
                  >
                    <View style={[styles.enterShop, { borderColor: mainColor }]}>
                      <Text allowFontScaling={false} style={[styles.enterText, { color: mainColor }]}>
                        进店
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _clickItem = (id, checked) => {
    let { checkedStoreIds, setCheckedStore } = this.props.relaxProps;
    if (checked) {
      checkedStoreIds = checkedStoreIds.filter((storeId) => storeId != id);
    } else {
      checkedStoreIds = checkedStoreIds.push(id);
    }
    setCheckedStore(checkedStoreIds);
  };
}

const styles = StyleSheet.create({
  item: {
    paddingTop: 12,
    paddingRight: 12,
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff'
  },
  img: {
    width: 64,
    height: 64,
    marginLeft: 10,
    borderRadius: 6
  },
  content: {
    paddingHorizontal: 12,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    color: '#333333',
    fontSize: 14
  },
  title: {
    color: '#999999',
    fontSize: 12,
    marginVertical: 4
  },
  rightBox: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 90
  },
  enterShop: {
    borderWidth: 1 / PixelRatio.get(),
    width: 40,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  enterText: {
    fontSize: 12
  },
  addressIcon: {
    width: 12,
    height: 12,
    marginRight: 4
  },
  address: {
    color: '#999999',
    fontSize: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgShadow: {
    position: 'absolute',
    left: 10,
    top: 0,
    width: 64,
    height: 64,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whitetText: {
    color: '#ffffff',
    fontSize: 13,
    lineHeight: 18
  }
});
