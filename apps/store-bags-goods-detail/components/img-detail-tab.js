import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { Relax } from 'plume2';
import { mainColor } from 'wmkit/styles/index';

const isAndroid = Platform.OS === 'android';

@Relax
export default class ImgDetailTap extends React.Component {
  static relaxProps = {
    storeGoodsTabs: 'storeGoodsTabs',
    tabKey: 'tabKey',
    changeTabKey: () => {}
  };

  render() {
    const { storeGoodsTabs, tabKey } = this.props.relaxProps;
    return (
      <View style={styles.TabCon}>
        <View style={styles.TouchNav}>
          {/*扩大点击范围*/}
          <TouchableOpacity
            style={styles.ItemTouch}
            activeOpacity={0.8}
            onPress={() => this._changeTabKey(-1)}
          >
            <View style={[styles.tab, tabKey == -1 && { borderBottomColor: mainColor }]}>
              <Text
                style={[styles.tabText, tabKey == -1 && { color: mainColor }]}
                allowFontScaling={false}
              >
                商品详情
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {storeGoodsTabs.size > 0 &&
          storeGoodsTabs.map((storeGoodsTab) => {
            return (
              <View style={styles.TouchNav} key={storeGoodsTab.get('tabId')}>
                {/*扩大点击范围*/}
                <TouchableOpacity
                  style={styles.ItemTouch}
                  activeOpacity={0.8}
                  onPress={() => this._changeTabKey(storeGoodsTab.get('tabId'))}
                >
                  <View
                    style={[
                      styles.tab,
                      tabKey == storeGoodsTab.get('tabId') && { borderBottomColor: mainColor }
                    ]}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        tabKey == storeGoodsTab.get('tabId') &&
                        {color: mainColor}
                      ]}
                      allowFontScaling={false}
                    >
                      {storeGoodsTab.get('tabName')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    );
  }

  _changeTabKey = (index) => {
    const { changeTabKey } = this.props.relaxProps;
    changeTabKey(index);
  };
}

const styles = StyleSheet.create({
  TabCon: {
    backgroundColor: '#fff',
    height: 40,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  TouchNav: {
    height: 38,
    justifyContent: 'center'
  },
  ItemTouch: {
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',
    borderRightWidth: 15,
    borderRightColor: 'transparent'
  },
  tab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingLeft: 8,
    paddingRight: 8
  },
  tabText: {
    color: '#333',
    fontSize: 12,
    paddingTop: isAndroid ? 10 : 12,
    paddingBottom: isAndroid ? 10 : 12
  }
});
