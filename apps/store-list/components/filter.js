import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  PixelRatio,
  Image
} from 'react-native';
import { Relax } from 'plume2';
import { fromJS } from 'immutable';
import * as FindArea from 'wmkit/area/area';
import { noop } from 'wmkit/noop';

import * as _ from '../../../wmkit/common/util'; // added by scx
import { mainColor, screenWidth } from 'wmkit/styles/index';
import LinearGradient from 'react-native-linear-gradient';

@Relax
export default class Cate extends React.Component {
  static relaxProps = {
    visible: 'visible',
    changeCompanyType: noop,
    changeProvOption: noop,
    changeCityOption: noop,
    clickFilter: noop
  };

  UNSAFE_componentWillMount() {
    const initProvinces = FindArea.findProvinceCity();
    this.setState({
      selProvinceId: '',
      companyType: null,
      searchProvinces: initProvinces,
      initProvinces: initProvinces //保留一份原始的未选中的地区信息
    });
  }

  render() {
    if (!this.props.relaxProps.visible) {
      return null;
    }

    let { selProvinceId, companyType, searchProvinces } = this.state;
    searchProvinces = searchProvinces.map((prov) => {
      //当前省份是否选中全部
      if (prov.get('checked')) {
        return prov.set('highLight', true);
      }
      //当前省份下有地市被选中
      if (prov.get('children').some((city) => city.get('checked'))) {
        return prov.set('highLight', true);
      }
      return prov;
    });

    return (
      <View style={[styles.shadow, styles.right]}>
        <View style={styles.shadowTouchable}>
          <TouchableWithoutFeedback onPress={this._closeFilter}>
            <View style={styles.shadowTouchable} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.filterCon}>
          <View style={{ flex: 1 }}>
            <View style={styles.filterItem}>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.title}>
                  店铺类型
                </Text>
              </View>
              <View style={styles.sortCon}>
                <TouchableOpacity
                  style={[
                    styles.sortItem,
                    { borderColor: mainColor },
                    companyType == 0 && { borderColor: mainColor }
                  ]}
                  activeOpacity={0.8}
                  onPress={() => this._changeCompanyType(companyType)}
                >
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.sortText,
                      companyType == 0 && { color: mainColor }
                    ]}
                    allowFontScaling={false}
                  >
                    自营店铺
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.filterItem, { paddingTop: 0 }]}>
              <View style={styles.row}>
                <Text
                  allowFontScaling={false}
                  style={styles.title}
                  numberOfLines={1}
                >
                  所在地区
                </Text>
              </View>
            </View>
            <View style={styles.address}>
              <View style={styles.areaBox}>
                <ScrollView>
                  <TouchableOpacity
                    style={[
                      styles.areaItem,
                      selProvinceId == '' && styles.highAreaItem
                    ]}
                    onPress={() => this._changeCurrProvince('')}
                  >
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={[
                        styles.areaText,
                        selProvinceId == '' && { color: mainColor }
                      ]}
                    >
                      所有地区
                    </Text>
                  </TouchableOpacity>
                  {searchProvinces &&
                    searchProvinces.toJS().map((v) => {
                      return (
                        <TouchableOpacity
                          key={v.code}
                          style={[
                            styles.areaItem,
                            v.code == selProvinceId
                              ? styles.highAreaItem
                              : v.highLight && styles.highAreaItem
                          ]}
                          onPress={() => this._changeCurrProvince(v.code)}
                        >
                          {v.code == selProvinceId ? (
                            <LinearGradient
                              colors={['#F6F6F6', '#FFF']}
                              start={{ x: 0, y: 0.5 }}
                              end={{ x: 1, y: 0.5 }}
                              style={styles.buttonBox}
                            >
                              <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                style={[styles.areaText, { color: mainColor }]}
                              >
                                {v.name}
                              </Text>
                            </LinearGradient>
                          ) : (
                            <Text
                              allowFontScaling={false}
                              numberOfLines={1}
                              style={[
                                styles.areaText,
                                v.highLight && { color: mainColor }
                              ]}
                            >
                              {v.name}
                            </Text>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              </View>
              <View style={styles.cityBox}>
                {this._renderCityList(selProvinceId)}
              </View>
            </View>
          </View>

          <View style={styles.btnCon}>
            <TouchableOpacity
              style={styles.reset}
              activeOpacity={0.8}
              onPress={this._resetFilter}
            >
              <Text allowFontScaling={false} style={styles.resetText}>
                重置
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sure, { backgroundColor: mainColor }]}
              activeOpacity={0.8}
              onPress={this._submitFilter}
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
   * 根据选中省份渲染城市列表
   */
  _renderCityList = (selProvId) => {
    if (selProvId == '') {
      return null;
    }
    const { searchProvinces } = this.state;
    const currProv = searchProvinces.find((v) => v.get('code') == selProvId);
    const provChecked = currProv.get('checked'); //当前省份是否选中全部
    const cityList = currProv.get('children');

    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.cityItem}
          activeOpacity={0.8}
          onPress={() => this._toggleProvince(selProvId, provChecked)}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles.cityText,
              provChecked == true && { color: mainColor }
            ]}
          >
            全部
          </Text>
          {provChecked == true ? (
            <Image style={[styles.checked, { tintColor: mainColor }]} source={require('../img/gou.png')} />
          ) : null}
        </TouchableOpacity>
        {cityList &&
          cityList.toJS().map((city) => {
            return (
              <TouchableOpacity
                style={styles.cityItem}
                key={city.code}
                activeOpacity={0.8}
                onPress={() =>
                  this._toggleCity(selProvId, city.code, city.checked)
                }
              >
                {city.checked == true ? (
                  <LinearGradient
                    colors={['#F6F6F6', '#FFF']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.buttonBox2}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.cityText,
                        city.checked == true && { color: mainColor }
                      ]}
                    >
                      {city.name}
                    </Text>
                    <Image
                      style={[styles.checked, { tintColor: mainColor }]}
                      source={require('../img/gou.png')}
                    />
                  </LinearGradient>
                ) : (
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.cityText,
                      city.checked == true && { color: mainColor }
                    ]}
                  >
                    {city.name}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    );
  };

  /**
   * 选中/取消选中省份
   */
  _toggleProvince = (provId, currChecked) => {
    const { searchProvinces } = this.state;

    this.setState({
      searchProvinces: searchProvinces.map((prov) => {
        if (prov.get('code') == provId) {
          prov = prov.set('checked', !currChecked);
        }
        return prov;
      })
    });
  };

  /**
   * 选中/取消选中城市
   */
  _toggleCity = (selProvId, cityId, currChecked) => {
    const { searchProvinces } = this.state;

    this.setState({
      searchProvinces: searchProvinces.map((prov) => {
        if (prov.get('code') == selProvId) {
          prov = prov.set(
            'children',
            prov.get('children').map((city) => {
              if (city.get('code') == cityId) {
                city = city.set('checked', !currChecked);
              }
              return city;
            })
          );
        }
        return prov;
      })
    });
  };

  /**
   * 修改选中省份
   * @private
   */
  _changeCurrProvince = (code) => {
    this.setState({ selProvinceId: code });
  };

  /**
   * 修改是否自营
   */
  _changeCompanyType = (currCompanyType) => {
    if (currCompanyType == 0) {
      this.setState({ companyType: null }); //设为查询全部
    } else {
      this.setState({ companyType: 0 }); //设为查询平台自营
    }
  };

  /**
   * 重置筛选信息
   */
  _resetFilter = () => {
    this.setState({
      selProvinceId: '',
      companyType: null,
      searchProvinces: this.state.initProvinces //重置成之前保留的原始的未选中的地区信息
    });
  };

  /**
   * 根据选中筛选项进行筛选,并关闭筛选框
   */
  _submitFilter = () => {
    const {
      changeCompanyType,
      changeProvOption,
      changeCityOption,
      clickFilter
    } = this.props.relaxProps;
    let provList = fromJS([]);
    let cityList = fromJS([]);

    if (this.state.selProvinceId == '') {
      //点击所有地区之后确定搜索
      this.setState({
        searchProvinces: this.state.initProvinces //重置成之前保留的原始的未选中的地区信息
      });
    } else {
      const searchProvinces = this.state.searchProvinces;
      //将选中的省份,最终都转换成地市List进行搜索(但必须要保证用户填写省份的时候,同时填写了地市)
      provList = searchProvinces
        .filter((prov) => prov.get('checked'))
        .map((prov) => prov.get('code'));
      cityList = searchProvinces
        .flatMap((prov) => prov.get('children'))
        .filter((city) => city.get('checked'))
        .map((city) => city.get('code'));
    }
    changeCompanyType(this.state.companyType); //是否直营
    changeProvOption(provList); //选中的省份idList
    changeCityOption(cityList); //选中的地市idList
    clickFilter(false);
  };

  /**
   * 关闭筛选框
   */
  _closeFilter = () => {
    const { clickFilter } = this.props.relaxProps;
    clickFilter(false);
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
    paddingHorizontal: 16,
    ..._.ifIphoneX(
      {
        paddingTop: 30
      },
      {
        paddingTop: 20
      }
    )
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14
  },
  filterItem: {
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5
  },
  arrowUp: {
    width: 10,
    height: 5,
    transform: [{ rotate: '180deg' }]
  },
  buttonBox: {
    width: 96,
    height: 32
  },
  buttonBox2: {
    height: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width:'100%'
  },
  sortCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  sortItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 12,
    marginRight: 8
  },
  sortText: {
    color: '#f60',
    fontSize: 12
  },
  btnCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'space-between',
    marginBottom: 30
    // ..._.ifIphoneX(
    //   {
    //     marginBottom: 30
    //   },
    //   {
    //     marginBottom: 0
    //   }
    // )
  },
  reset: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#f60',
    borderWidth: 1,
    borderRadius: 18
  },
  resetText: {
    fontSize: 14,
    color: '#f60',
    paddingHorizontal: 35,
    // width: 108,
    alignItems: 'center'
  },
  sure: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 18
  },
  whiteText: {
    fontSize: 14,
    color: '#ffffff',
    paddingHorizontal: 40,
    alignItems: 'center'
  },
  address: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  areaBox: {
    width: 100
    // backgroundColor: '#fafafa'
  },
  areaItem: {
    height: 32,
    alignItems: 'flex-start',
    paddingRight: 10,
    width: 100,
    justifyContent: 'center'
  },
  highAreaItem: {
    backgroundColor: '#ffffff'
  },
  areaText: {
    paddingLeft: 12,
    lineHeight: 32,
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)'
  },
  cityBox: {
    flex: 1
  },
  cityItem: {
    height: 32,
    // paddingHorizontal: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cityText: {
    color: '#333333',
    fontSize: 12,
    lineHeight:32
  },
  checked: {
    width: 12,
    height: 12
  }
});
