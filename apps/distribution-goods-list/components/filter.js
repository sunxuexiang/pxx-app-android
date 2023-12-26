import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  PixelRatio
} from 'react-native';
import { Relax } from 'plume2';

import { List, Map } from 'immutable';
import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx
import { mainColor, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';

/**
 * 商品品牌,属性筛选项
 */
@Relax
export default class Cate extends React.Component {
  static relaxProps = {
    closeShade: noop,
    handleFilterChange: noop,
    brandExpanded: 'brandExpanded',
    expandProp: 'expandProp',
    brandList: 'brandList',
    selectedBrandIds: 'selectedBrandIds',
    selectSelfCompany: 'selectSelfCompany',
    goodsProps: 'goodsProps'
  };

  state = {
    // 是否已选中自营
    selectSelfCompany: false,
    // 已选中品牌编号列表
    selectedBrandIds: List(),
    goodsProps: List(),
    brandExpanded: false,
    expandProp: Map()
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      selectSelfCompany: nextProps.relaxProps.selectSelfCompany,
      selectedBrandIds: nextProps.relaxProps.selectedBrandIds,
      goodsProps: nextProps.relaxProps.goodsProps,
      brandExpanded: nextProps.relaxProps.brandExpanded,
      expandProp: nextProps.relaxProps.expandProp
    });
  }

  render() {
    if (this.props.hide) {
      return null;
    }

    let { closeShade, brandList } = this.props.relaxProps;
    let goodsProps = this.state.goodsProps;

    brandList = (brandList && brandList.toJS()) || [];
    goodsProps = (goodsProps && goodsProps.toJS()) || [];
    const brandExpanded = this.state.brandExpanded;

    return (
      <View style={[styles.shadow, styles.right]}>
        <View style={styles.shadowTouchable}>
          <TouchableWithoutFeedback onPress={closeShade}>
            <View style={styles.shadowTouchable} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={[
            styles.filterCon,
            {
              paddingBottom: 0
            }
          ]}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.filterItem}>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.title}>
                  商城服务
                </Text>
              </View>
              <View style={styles.sortCon}>
                <TouchableOpacity
                  style={[
                    styles.sortItem,
                    this.state.selectSelfCompany && { borderColor: mainColor }
                  ]}
                  activeOpacity={0.8}
                  onPress={this._handleClickService}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.sortText,
                      this.state.selectSelfCompany && { color: mainColor }
                    ]}
                    allowFontScaling={false}
                  >
                    自营商品
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/*品牌*/}
            {brandList.length > 0 && (
              <View style={styles.filterItem}>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.title}>
                    品牌
                  </Text>
                  {brandList.length > 9 && (
                    <TouchableOpacity
                      style={{ padding: 10, marginRight: -10 }}
                      activeOpacity={0.6}
                      onPress={() =>
                        this.setState({ brandExpanded: !brandExpanded })
                      }
                    >
                      <Image
                        source={require('../img/down.png')}
                        style={brandExpanded ? styles.arrowUp : styles.arrow}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.sortCon}>
                  {brandList.map((v, index) => {
                    if (!brandExpanded && index >= 9) {
                      return null;
                    }

                    // 在已选中品牌编号列表中的索引
                    const selectedIndex = this.state.selectedBrandIds.findIndex(
                      (brandId) => brandId == v.brandId
                    );
                    // 索引大于-1代表已选中
                    const selected = selectedIndex > -1;

                    return selected ? (
                      <TouchableOpacity
                        key={`${v.brandId}_1`}
                        style={[styles.sortItem, { borderColor: mainColor }]}
                        activeOpacity={0.8}
                        onPress={() => this._handleClickBrand(v, selectedIndex)}
                      >
                        <Text
                          numberOfLines={1}
                          style={[styles.sortText, { color: mainColor }]}
                          allowFontScaling={false}
                        >
                          {v.brandName}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        key={`${v.brandId}_0`}
                        style={styles.sortItem}
                        activeOpacity={0.8}
                        onPress={() => this._handleClickBrand(v, selectedIndex)}
                      >
                        <Text
                          numberOfLines={1}
                          style={styles.sortText}
                          allowFontScaling={false}
                        >
                          {v.brandName}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/*属性名称与属性值*/}
            {goodsProps.map((prop) => {
              const propId = prop.propId.toString();
              const details = prop.goodsPropDetails || [];

              // 此属性筛选项是否已展开
              const propExpand = this.state.expandProp.get(propId) || false;

              return (
                <View style={styles.filterItem} key={propId}>
                  <View style={styles.row}>
                    <Text allowFontScaling={false} style={styles.title}>
                      {prop.propName}
                    </Text>
                    {details.length > 9 && (
                      <TouchableOpacity
                        activeOpacity={0.6}
                        style={{ padding: 10, marginRight: -10 }}
                        onPress={() => {
                          let expandProp = this.state.expandProp;
                          expandProp = expandProp.set(propId, !propExpand);
                          this.setState({ expandProp });
                        }}
                      >
                        <Image
                          source={require('../img/down.png')}
                          style={propExpand ? styles.arrowUp : styles.arrow}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.sortCon}>
                    {details.map((detail, detailIndex) => {
                      if (!propExpand && detailIndex >= 9) {
                        return null;
                      }

                      const { detailId, detailName, checked } = detail;

                      return checked ? (
                        <TouchableOpacity
                          key={`${propId}_${detailId}_1`}
                          style={[styles.sortItem, { borderColor: mainColor }]}
                          activeOpacity={0.8}
                          onPress={() =>
                            this._handleClickProp(propId, detailId, false)
                          }
                        >
                          <Text
                            numberOfLines={1}
                            style={[styles.sortText, { color: mainColor }]}
                            allowFontScaling={false}
                          >
                            {detailName}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          key={`${propId}_${detailId}_0`}
                          style={styles.sortItem}
                          activeOpacity={0.8}
                          onPress={() =>
                            this._handleClickProp(propId, detailId, true)
                          }
                        >
                          <Text
                            numberOfLines={1}
                            style={styles.sortText}
                            allowFontScaling={false}
                          >
                            {detailName}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.btnCon}>
            <TouchableOpacity
              style={[styles.reset, { borderColor: mainColor }]}
              activeOpacity={0.8}
              onPress={() => this._handleReset()}
            >
              <Text allowFontScaling={false} style={[styles.resetText, { color: mainColor }]}>
                重置
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                closeShade();
                this._handleConfirm();
              }}
            >
              <LinearGradient
                colors={[mainColor, mainColor]}
                style={styles.sure}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text allowFontScaling={false} style={styles.whiteText}>
                  确定
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 处理点击商城服务
   * @private
   */
  _handleClickService = () => {
    let { selectSelfCompany } = this.state;
    this.setState({
      selectSelfCompany: !selectSelfCompany
    });
  };

  /**
   * 处理点击品牌
   * @param brand 品牌对象
   * @param selectedIndex 在已选中品牌编号列表中的位置
   * @private
   */
  _handleClickBrand = (brand, selectedIndex) => {
    let { selectedBrandIds } = this.state;

    // selectedIndex等于-1时，该品牌没有选中，添加到选中队列，否则删除
    selectedBrandIds =
      selectedIndex > -1
        ? selectedBrandIds.delete(selectedIndex)
        : selectedBrandIds.push(brand.brandId);

    this.setState({
      selectedBrandIds: selectedBrandIds
    });
  };

  /**
   * 处理点击属性值
   */
  _handleClickProp = (propId, detailId, checked) => {
    let { goodsProps } = this.state;
    if (goodsProps && goodsProps.size > 0) {
      const index = goodsProps.findIndex(
        (prop) => prop.get('propId') == propId
      );
      if (index > -1) {
        const goodsPropDetails = goodsProps.get(index).get('goodsPropDetails');
        if (goodsPropDetails && goodsPropDetails.size > 0) {
          if (detailId != null) {
            const detailIndex = goodsPropDetails.findIndex(
              (detail) => detail.get('detailId') == detailId
            );
            if (detailIndex > -1) {
              goodsProps = goodsProps.setIn(
                [index, 'goodsPropDetails', detailIndex, 'checked'],
                checked
              );
              this.setState({ goodsProps: goodsProps });
            }
          }
        }
      }
    }
  };

  /**
   * 清空搜索条件
   * @private
   */
  _handleReset = () => {
    // 清空选中属性
    let { goodsProps } = this.state;
    if (goodsProps && goodsProps.size > 0) {
      goodsProps = goodsProps.map((v) => {
        let details = v.get('goodsPropDetails');
        if (details && details.size > 0) {
          details = details.map((detail) => {
            return detail.get('checked')
              ? detail.set('checked', false)
              : detail;
          });
          v = v.set('goodsPropDetails', details);
        }
        return v;
      });
    }

    this.setState({
      selectSelfCompany: false,
      selectedBrandIds: List(),
      goodsProps: goodsProps,
      brandExpanded: Map(),
      expandProp: Map()
    });
  };

  /**
   * 点击确认按钮
   * @private
   */
  _handleConfirm = () => {
    let { handleFilterChange } = this.props.relaxProps;
    handleFilterChange(
      this.state.selectSelfCompany,
      this.state.selectedBrandIds,
      this.state.goodsProps,
      this.state.brandExpanded,
      this.state.expandProp
    );
  };
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    height: '100%'
  },
  shadowTouchable: {
    flex: 1,
    height: '100%'
  },
  filterCon: {
    backgroundColor: '#fff',
    width: screenWidth * 0.8,
    height: '100%',
    ..._.ifIphoneX(
      {
        paddingTop: 30
      },
      { paddingTop: 20 }
    )
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    color: '#666',
    fontSize: 13
  },
  filterItem: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5
  },
  arrow: {
    width: 10,
    height: 5
  },
  arrowUp: {
    width: 10,
    height: 5,
    transform: [{ rotate: '180deg' }]
  },
  sortCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  sortItem: {
    backgroundColor: '#fafafa',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
    width: (screenWidth * 0.8 - 40) / 3,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  sortText: {
    color: '#333',
    fontSize: 12
  },
  btnCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 16
  },
  reset: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1 / PixelRatio.get(),
    width: 130,
    height: 36,
    borderRadius: 18
  },
  resetText: {
    fontSize: 14
  },
  sure: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 36,
    borderRadius: 18
  },
  whiteText: {
    fontSize: 14,
    color: '#ffffff'
  }
});
