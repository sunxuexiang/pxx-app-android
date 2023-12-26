import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';

import { GrouponCenterVO } from '../../../web-api/GrouponCenterController';
import { screenWidth, priceColor, mainColor } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';
import { BaseResponseFollowListResponse } from '../../../web-api/CustomerDeliveryAddressBaseController';
type IGoodsListProps = T.IProps & T.IGoodsListProps;

@connect<Partial<IGoodsListProps>, T.IGoodsListState>(
  store2Props,
  actions
)
export default class GoodsList extends React.Component<
  Partial<IGoodsListProps>,
  T.IGoodsListState
> {
  constructor(props: IGoodsListProps) {
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
      url: '/groupon/center/list',
      params: {
        sticky: true
      },
      dataPropsName: 'context.grouponCenterVOList.content',
      isPagination: true,
      renderRow: (item) => this._renderRow(item),
      // onDataReached: this.props.actions.dealData,
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/list-none.png')}
          desc="暂时没有拼团"
        />
      ),
      columnWrapperStyle: styles.bigBox,
      keyProps: 'goodsId'
      // extraData: { toRefresh: initialEnd }
    };
    return <WmListView {...listViewProps}/>;
  }

  _renderRow = (row: GrouponCenterVO) => {
    return (
      <TouchableOpacity
        style={styles.goodsContainer}
        activeOpacity={0.8}
        onPress={() =>
          msg.emit('router: goToNext', {
            routeName: 'SpellGroupDetail',
            skuId: row.goodsInfoId
          })
        }
      >
        <View style={styles.imgContainer}>
          <Image
            source={
              row.goodsImg ? { uri: row.goodsImg } : require('../img/none.png')
            }
            style={styles.imgContainer}
            resizeMode="stretch"
          />
          <LinearGradient style={styles.leftIcon}
            colors={[mainColor, mainColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text allowFontScaling={false} style={styles.iconText}>
              {row.grouponNum}
              人团
            </Text>
          </LinearGradient>
        </View>
        <View style={styles.goodsInfo}>
          <Text allowFontScaling={false} numberOfLines={2} style={styles.goodsName}>
            {row.goodsName}
          </Text>
          <Text allowFontScaling={false} style={styles.already}>
            <Text allowFontScaling={false} style={[styles.already, {color: priceColor}]}>
              {row.alreadyGrouponNum}
            </Text>
            人已成团
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text allowFontScaling={false} style={[styles.price, { color: priceColor }]}>
                <Text allowFontScaling={false} style={[styles.price, { color: priceColor, fontSize: 12}]}>¥</Text>
                {_.addZero(row.grouponPrice)}
              </Text>
              {!!row.marketPrice && (
                <Text allowFontScaling={false} style={styles.linePirce}>{`单买 ¥${_.addZero(
                  row.marketPrice
                )}`}</Text>
              )}
            </View>
            <LinearGradient
              colors={[mainColor, mainColor]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.btn}
            >
              <TouchableOpacity
                onPress={() => {}}
              >
                <Text allowFontScaling={false} style={styles.btnText}>
                  去开团
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* <LinearGradient
            colors={['#f91a53FF', '#ff5240FF']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0.5, y: 1 }}
          >
            <View style={styles.pin}>
              <Text allowFontScaling={false} style={styles.pinText}>拼</Text>
            </View>
          </LinearGradient> */}
        </View>
      </TouchableOpacity>
    );
  };
}
const styles = StyleSheet.create({
  goodsList: {
    //paddingHorizontal: 9,
    marginTop: 10,
    flexDirection: 'row'
  },
  goodsContainer: {
    width: screenWidth - 24,
    marginHorizontal: 12,
    marginBottom: 12
  },
  imgContainer: {
    width: screenWidth - 24,
    height: screenWidth * 0.5173,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  leftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 16,
    height: 20,
    paddingHorizontal: 12,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden'
  },
  iconText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500'
  },
  bigBox: {
    paddingLeft: 5,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  goodsInfo: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    overflow: 'hidden'
  },
  goodsName: {
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(0,0,0,0.8)'
  },
  price: {
    fontSize: 18,
    fontWeight: '500'
  },
  linePirce: {
    marginTop: 4,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 10
  },
  already: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.4)',
    textAlign: 'right',
    paddingTop: 8,
    paddingBottom: 4
  },
  pin: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pinText: {
    fontSize: 13,
    lineHeight: 31,
    color: '#fff'
  },
  btn: {
    width: 68,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 12
  }
});
