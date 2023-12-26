import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PixelRatio,
  Modal
} from 'react-native';
import { msg } from 'plume2';

import { screenHeight, screenWidth, mainColor, isAndroid } from 'wmkit/styles/index';
import Check from 'wmkit/check';
import * as _ from '../../../../wmkit/common/util'; // added by scx
import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

type IGoodsShareProps = T.IProps & T.IGoodsShareProps;

@connect<Partial<IGoodsShareProps>, T.IGoodsShareState>(
  store2Props,
  actions
)
export default class GoodsShare extends React.Component<
  Partial<IGoodsShareProps>,
  T.IGoodsShareState
> {
  constructor(props: IGoodsShareProps) {
    super(props);
  }

  /**

   */
  render() {
    let {
      actions: { action },
      main
    } = this.props;
    // 社交电商相关内容显示与否
    const social = true;

    return (
      main.goodsShareVisible && (
        <View style={styles.slideMenu}>
          <TouchableOpacity
            style={[styles.mask]}
            onPress={() => action.toggleGoodsShare(true)}
            activeOpacity={0.8}
          />
          <View style={styles.menuContainer}>
            <View style={styles.container}>
              <View>
                <View style={[styles.header, social && styles.socialHeader]}>
                  {social ? (
                    <View style={styles.socialText}>
                      <Text style={[styles.socialTitle, { color: mainColor }]} allowFontScaling={false}>
                        <Text style={styles.unit}>赚</Text>{' '}
                        <Text style={styles.unit}>￥</Text>
                        {_.addZero(main.checkedSku.distributionCommission)}
                      </Text>
                      <Text style={styles.socialTips} allowFontScaling={false}>
                        好友通过你分享的链接购买商此商品，你就能赚
                        <Text style={styles.unit}>
                          {_.addZero(main.checkedSku.distributionCommission)}
                        </Text>
                        的利润~
                      </Text>
                    </View>
                  ) : (
                    <Text allowFontScaling={false} style={styles.title}>
                      分享给好友
                    </Text>
                  )}
                </View>
                <View style={styles.shareBox}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => this._shareGoods()}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={require('../img/photo-album.png')}
                      style={styles.icon}
                      activeOpacity={0.8}
                    />
                    <Text allowFontScaling={false} style={styles.navtext}>
                      图文分享
                    </Text>
                  </TouchableOpacity>
                </View>
                {social && (
                  <View style={styles.socialShare}>
                    <Check
                      checked={main.addSelfShop}
                      onCheck={(value) => action.changeAddSelfShop(value)}
                    />
                    <Text style={styles.shareText} allowFontScaling={false}>
                      分享此商品后添加至我的店铺
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => action.toggleGoodsShare(true)}
                  style={styles.btn}
                  activeOpacity={0.8}
                >
                  <Text allowFontScaling={false} style={styles.btntext}>
                    取消分享
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )
    );
  }

  /**
   * 图文分享
   */
  _shareGoods = async () => {
    let {
      actions: { action },
      main
    } = this.props;
    //底部tab栏隐藏
    msg.emit('app:bottomVisible', {
      key: 'MaterialCircle',
      visible: false
    });
    //如果是分销员，弹出店铺外分享的弹框,并携带相关参数
    await action.toggleImgShare();
  };
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  slideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1000
  },
  mask: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    width: screenWidth,
    height: isAndroid ? screenHeight - 25 : screenHeight
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 12
  },
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  header: {
    height: 40,
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
    color: '#333'
  },
  btn: {
    height: 36,
    width: screenWidth - 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,102,0,0.06)',
    borderRadius: 18,
    // borderTopColor: '#ececec',
    // borderTopWidth: 1 / PixelRatio.get(),
    ..._.ifIphoneX(
      {
        marginBottom: 24
      },
      {
        marginBottom: 10
      }
    )
  },
  btntext: {
    color: '#ff6600',
    fontSize: 14
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  shareBox: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  item: {
    width: (screenWidth - 20) / 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  navtext: {
    color: '#363636',
    fontSize: 14
  },
  socialHeader: {
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  socialText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialTitle: {
    fontSize: 24,
    fontWeight: '500'
  },
  socialTips: {
    marginTop: 15,
    color: '#333',
    fontSize: 12
  },
  socialShare: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  shareText: {
    color: '#999',
    fontSize: 12,
    marginLeft: 10
  },
  unit: {
    color: '#ff6600',
    fontSize: 12
  }
});
