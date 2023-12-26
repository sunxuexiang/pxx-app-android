import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Relax } from 'plume2';

import { List, Map } from 'immutable';
import { noop } from 'wmkit/noop';
import * as _ from 'wmkit/common/util'; // added by scx
import { mainColor, screenWidth } from 'wmkit/styles/index';

/**
 * 商品品牌规格筛选项
 */
@Relax
export default class Cate extends React.Component {
  static relaxProps = {
    closeShade: noop,
    handleFilterChange: noop,
    brandExpanded: 'brandExpanded',
    specsExpanded: 'specsExpanded',
    brands: 'brands',
    selectedBrandIds: 'selectedBrandIds',
    specs: 'specs',
    specDetails: 'specDetails',
    selectedSpecDetails: 'selectedSpecDetails',
    selectSelfCompany: 'selectSelfCompany'
  };

  state = {
    // 是否已选中自营
    selectSelfCompany: false,
    // 已选中品牌编号列表
    selectedBrandIds: List(),
    // 已选中的规格值map，key为规格的编号specId
    selectedSpecDetails: Map(),
    brandExpanded: false,
    specsExpanded: Map()
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      selectSelfCompany: nextProps.relaxProps.selectSelfCompany,
      selectedBrandIds: nextProps.relaxProps.selectedBrandIds,
      selectedSpecDetails: nextProps.relaxProps.selectedSpecDetails,
      brandExpanded: nextProps.relaxProps.brandExpanded,
      specsExpanded: nextProps.relaxProps.specsExpanded
    });
  }

  render() {
    if (this.props.hide) {
      return null;
    }

    let { closeShade, brands, specs, specDetails } = this.props.relaxProps;
    brands = brands || [];
    specs = (specs && specs.toJS()) || [];
    specDetails = (specDetails && specDetails.toJS()) || [];
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
            {brands.length > 0 && (
              <View style={styles.filterItem}>
                <View style={styles.row}>
                  <Text allowFontScaling={false} style={styles.title}>
                    品牌
                  </Text>
                  {brands.length > 9 && (
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
                  {brands.map((v, index) => {
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

            {/*根据结果聚合出的规格项名称*/}
            {specs.length > 0 &&
              specs.map((spec) => {
                const specId = spec.specId.toString();
                const details = specDetails[specId] || [];
                // 此规格筛选项是否已展开
                const specExpanded =
                  this.state.specsExpanded.get(specId) || false;

                const selectedDetails = this.state.selectedSpecDetails.get(
                  specId
                );

                return (
                  <View style={styles.filterItem} key={specId}>
                    <View style={styles.row}>
                      <Text allowFontScaling={false} style={styles.title}>
                        {spec.specName}
                      </Text>
                      {details.length > 9 && (
                        <TouchableOpacity
                          activeOpacity={0.6}
                          style={{ padding: 10, marginRight: -10 }}
                          onPress={() => {
                            let specsExpanded = this.state.specsExpanded;
                            specsExpanded = specsExpanded.set(
                              specId,
                              !specExpanded
                            );
                            this.setState({ specsExpanded });
                          }}
                        >
                          <Image
                            source={require('../img/down.png')}
                            style={specExpanded ? styles.arrowUp : styles.arrow}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={styles.sortCon}>
                      {details.map((detail, detailIndex) => {
                        if (!specExpanded && detailIndex >= 9) {
                          return null;
                        }

                        // 已选中规格值的索引
                        const selectedIndex = selectedDetails
                          ? selectedDetails.findIndex(
                              (name) => name == detail.detailName.trim()
                            )
                          : -1;
                        // 索引大于-1代表已选中
                        const selected = selectedIndex > -1;

                        return selected ? (
                          <TouchableOpacity
                            key={`${specId}_${detail.specDetailId}_1`}
                            style={[
                              styles.sortItem,
                              { borderColor: mainColor }
                            ]}
                            activeOpacity={0.8}
                            onPress={() =>
                              this._handleClickSpec(detail, selectedIndex)
                            }
                          >
                            <Text
                              numberOfLines={1}
                              style={[styles.sortText, { color: mainColor }]}
                              allowFontScaling={false}
                            >
                              {detail.detailName}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            key={`${specId}_${detail.specDetailId}_0`}
                            style={styles.sortItem}
                            activeOpacity={0.8}
                            onPress={() =>
                              this._handleClickSpec(detail, selectedIndex)
                            }
                          >
                            <Text
                              numberOfLines={1}
                              style={styles.sortText}
                              allowFontScaling={false}
                            >
                              {detail.detailName}
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
              style={styles.reset}
              activeOpacity={0.8}
              onPress={() => this._handleReset()}
            >
              <Text allowFontScaling={false} style={styles.resetText}>
                重置
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sure}
              activeOpacity={0.8}
              onPress={() => {
                closeShade();
                this._handleConfirm();
              }}
            >
              <Text allowFontScaling={false} style={styles.whiteText}>
                确定
              </Text>
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
   * 处理点击规格值
   * @param specDetail 规格值对象
   * @param selectedIndex 在已选中规格值列表中的位置
   * @private
   */
  _handleClickSpec = (specDetail, selectedIndex) => {
    const { selectedSpecDetails } = this.state;

    const specId = specDetail.specId.toString();
    let details = selectedSpecDetails.get(specId) || List();

    // selectedIndex等于-1时，该规格值没有选中，添加到选中队列，否则删除
    details =
      selectedIndex > -1
        ? details.delete(selectedIndex)
        : details.push(specDetail.detailName.trim());

    this.setState({
      selectedSpecDetails: selectedSpecDetails.set(specId, details)
    });
  };

  /**
   * 清空搜索条件
   * @private
   */
  _handleReset = () => {
    this.setState({
      selectSelfCompany: false,
      selectedBrandIds: List(),
      selectedSpecDetails: Map(),
      brandExpanded: Map(),
      specsExpanded: Map()
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
      this.state.selectedSpecDetails,
      this.state.brandExpanded,
      this.state.specsExpanded
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
    backgroundColor: mainColor,
    height: 48
  },
  reset: {
    backgroundColor: '#b2dcfc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    height: 48
  },
  resetText: {
    color: mainColor,
    fontSize: 16
  },
  sure: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteText: {
    fontSize: 16,
    color: '#ffffff'
  }
});
