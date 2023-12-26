import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import * as T from '../types';
import { Tabs, Badge } from '@ant-design/react-native';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { mainColor } from '../../../../wmkit/styles/index';
import WMImage from 'wmkit/image/index';
import WmListView from 'wmkit/list-view/index';
import WMEmpty from 'wmkit/empty';
import { Const } from 'wmkit/const';

import { msg } from 'plume2';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
type INavProps = T.IProps & T.INavProps;

@connect<Partial<INavProps>, T.INavState>(
  store2Props,
  actions
)
export default class Nav extends React.Component<
Partial<INavProps>,
T.INavState
> {
  constructor(props: INavProps) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    const tabs = [
      { title: `待评价 ${main.queryGoodsTobeEvaluateNum}`, key: 0 },
      { title: `服务评价 ${main.queryStoreTobeEvaluateNum}`, key: 1 },
      { title: `已评价 ${main.evaluateNum}`, key: 2 }
    ];

    if (!main.isReady) {
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {tabs.map((tabItem) => {
            return (
              <TouchableOpacity
                key={tabItem.key}
                style={[
                  styles.nav
                ]}
                onPress={() =>
                  action.commonChange('main.queryType', tabItem.key)
                }
              >
                <Text
                  style={[
                    styles.item,
                    main.queryType === tabItem.key && { color: mainColor }
                  ]}
                  allowFontScaling={false}
                >
                  {tabItem.title}
                </Text>
                {main.queryType === tabItem.key && <View style={[styles.line, { borderColor: mainColor }]} />}
              </TouchableOpacity>
            );
          })}
        </View>
        {/*<Tabs*/}
        {/*tabs={tabs}*/}
        {/*initialPage={main.queryType}*/}
        {/*page={main.queryType}*/}
        {/*onTabClick={(*/}
        {/*tab,*/}
        {/*index //tab改变的时候回调*/}
        {/*) => action.commonChange('main.queryType', index)}*/}
        {/*tabBarUnderlineStyle={{*/}
        {/*borderColor: '#FF1F4E',*/}
        {/*borderWidth: 1,*/}
        {/*width: 10*/}
        {/*}}*/}
        {/*tabBarActiveTextColor={'#FF1F4E'}*/}
        {/*tabBarInactiveTextColor={'#666666'}*/}
        {/*>*/}
        {main.queryType == 0 && (
          <WmListView
            loadingStyle={{marginTop:200}}
            url="/goodsTobeEvaluate/pageGoodsTobeEvaluate"
            renderRow={this._infoGoodsRow}
            dataPropsName={'context.goodsTobeEvaluateVOPage.content'}
            noMoreStyle={{ backgroundColor: '#f5f5f5' }}
            renderEmpty={() => (
              <WMEmpty
                emptyImg={require('../img/list-none.png')}
                imgStyle={{width:104,height:104}}
                desc="还没有人评论哦"
              />
            )}
          />
        )}
        {main.queryType == 1 && (
          <WmListView
            loadingStyle={{marginTop:200}}
            url="/storeTobeEvaluate/pageStoreTobeEvaluate"
            renderRow={this._infoStoreRow}
            dataPropsName={'context.storeTobeEvaluateVOPage.content'}
            noMoreStyle={{ backgroundColor: '#f5f5f5' }}
            renderEmpty={() => (
              <WMEmpty
                emptyImg={require('../img/list-none.png')}
                imgStyle={{width:104,height:104}}
                desc="暂无评价信息哦"
              />
            )}
          />
        )}
        {main.queryType == 2 && (
          <WmListView
            loadingStyle={{marginTop:200}}
            url="/goodsEvaluate/page"
            renderRow={this._infoGoodsRow}
            dataPropsName={'context.goodsEvaluateVOPage.content'}
            noMoreStyle={{ backgroundColor: '#f5f5f5' }}
            renderEmpty={() => (
              <WMEmpty
                emptyImg={require('../img/list-none.png')}
                imgStyle={{width:104,height:104}}
                desc="暂无评价信息哦"
              />
            )}
          />
        )}
        {/*</Tabs>*/}
      </View>
    );
  }

  /**
   * 评价信息
   */
  _infoGoodsRow = (info) => {
    let { main } = this.props;
    const { queryType } = main;
    return (
      <View style={styles.evaluateContainer}>
        <View>
          <WMImage style={styles.leftImage} src={info.goodsImg} />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.goodName} numberOfLines={2}>
            {info.goodsInfoName}
          </Text>
          <Text style={styles.goodIntro}>
            {queryType == 0 ? info.goodsSubtitle : info.goodsSubtitle}
          </Text>
          <View style={styles.row}>
            <Text style={styles.buyTime}>
              购买时间:
              {moment(info.buyTime).format(Const.DATE_FORMAT)}
            </Text>
            {queryType === 0 ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  //跳转到编辑评价页
                  msg.emit('router: goToNext', {
                    routeName: 'EvaluateSubmit',
                    queryType, //评价类型
                    goodInfo: {
                      //选中的商品信息  名称 图片 id等。。。。
                      skuId: info.goodsInfoId,
                      storeId: info.storeId,
                      tid: info.orderNo
                    }
                  });
                }}
              >
                <LinearGradient
                  colors={[mainColor, mainColor]}
                  style={styles.bottom}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                >
                  <Text style={styles.btn}>评价/晒单</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.bottom1}
                onPress={() => {
                  //跳转到编辑评价页
                  msg.emit('router: goToNext', {
                    routeName: 'EvaluateSubmit',
                    queryType, //评价类型
                    goodInfo: {
                      //选中的商品信息  名称 图片 id等。。。。
                      skuId: info.goodsInfoId,
                      storeId: info.storeId,
                      tid: info.orderNo
                    }
                  });
                }}
              >
                <Text style={styles.btn1}>查看评价</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  /**
   * 评价信息
   */
  _infoStoreRow = (info) => {
    return (
      <View style={styles.evaluateContainer}>
        <View>
          <WMImage style={styles.leftImage} src={info.storeLogo} />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.goodName} numberOfLines={2}>
            {info.storeName}
          </Text>
          <View style={styles.row}>
            <Text style={styles.buyTime}>
              购买时间:
              {moment(info.buyTime).format(Const.DATE_FORMAT)}
            </Text>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                //跳转到编辑评价页
                msg.emit('router: goToNext', {
                  routeName: 'EvaluateSubmit',
                  queryType: 1, //评价类型
                  goodInfo: {
                    //选中的商品信息  名称 图片 id等。。。。
                    skuId: info.goodsInfoId,
                    storeId: info.storeId,
                    tid: info.orderNo
                  }
                });
              }}
            >
              <LinearGradient
                colors={[mainColor, mainColor]}
                style={styles.bottom}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text style={styles.btn}>{'评价'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabContainer: {
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    color: '#333333',
    paddingHorizontal: 8
  },
  nav: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    flexGrow: 1,
    position: 'relative'
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: '#fff'
  },
  noGood: {
    flexDirection: 'column',
    marginTop: 30,
    alignItems: 'center'
  },
  evaluateContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 6
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1
  },
  leftImage: {
    width: 80,
    height: 80,
    borderRadius: 6
  },
  rightContent: {
    // width: Dimensions.get('window').width - 130,
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    justifyContent: 'space-between'
  },
  goodName: {
    color: '#333',
    fontSize: 12
  },
  goodIntro: {
    marginTop: 12,
    fontSize: 12,
    color: '#898989',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buyTime: {
    marginTop: 10,
    fontSize: 12,
    color: '#999'
  },
  bottom: {
    alignSelf: 'flex-end',
    height: 24,
    width: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    color: '#fff',
    fontSize: 10
  },
  bottom1: {
    alignSelf: 'flex-end',
    height: 24,
    width: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#e6e6e6',
    borderWidth: 1
  },
  btn1: {
    color: '#333',
    fontSize: 10
  },
  line: {
    borderBottomWidth: 1,
    width: 24,
    position: 'absolute',
    bottom: 2
  }
});
