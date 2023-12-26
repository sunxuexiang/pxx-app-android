import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit';
@Relax
export default class SearchResult extends React.Component {
  static relaxProps = {
    searchHistory: 'searchHistory',
    associationalWordList: 'associationalWordList',
    clearHistory: noop,
    handleQueryString: noop,
    goSearch: noop,
    queryString: 'queryString',
    key: 'key',
    tabActive: noop
  };
  render() {
    const { associationalWordList, queryString } = this.props.relaxProps;
    return (
      <ScrollView horizontal={false} alwaysBounceHorizontal={false}>
        <View style={styles.searchHistory}>
          {associationalWordList.length > 0 &&
            associationalWordList.map((v, i) => {
              return (
                <View>
                  <View style={styles.searchGoodlist}>
                    <TouchableOpacity
                      onPress={() => this._clickHistory(v.associationalWord)}
                    >
                      <Text style={styles.word}>{v.associationalWord}</Text>
                    </TouchableOpacity>
                    <View style={styles.searchGoodlistBrand}>
                      {v.longTailWord &&
                        v.longTailWord.map((i, n) => {
                          return (
                            <TouchableOpacity
                              key={n}
                              style={styles.brandState}
                              onPress={() =>
                                this._clickHistory(i + v.associationalWord)
                              }
                            >
                              <Text style={styles.word}>{i}</Text>
                            </TouchableOpacity>
                          );
                        })}
                    </View>
                  </View>
                  {/* {i == 4 && (
                    <TouchableOpacity
                      style={styles.searchStore}
                      onPress={() => this._tabActive('supplier', queryString)}
                    >
                      <View>
                        <Image
                          style={styles.img}
                          source={require('../img/shop-small-icon.png')}
                        />
                      </View>
                      <View style={styles.searchStoreName}>
                        <Text style={styles.word}>
                          包含“
                          {queryString}
                          ”的店铺
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )} */}
                </View>
              );
            })}
          {associationalWordList.length > 0 &&
            associationalWordList.length < 5 && (
              <TouchableOpacity
                style={styles.searchStore}
                onPress={() => this._tabActive('supplier', queryString)}
              >
                <View>
                  <Image
                    style={styles.img}
                    source={require('../img/shop-small-icon.png')}
                  />
                </View>
                <View style={styles.searchStoreName}>
                  <Text style={styles.word}>
                    包含“
                    {queryString}
                    ”的店铺
                  </Text>
                </View>
              </TouchableOpacity>
            )}
        </View>
      </ScrollView>
    );
  }
  /**
   * 点击联想的一条
   * @param queryString
   * @private
   */
  _clickHistory = (queryString) => {
    const { handleQueryString, goSearch } = this.props.relaxProps;
    handleQueryString(queryString);
    goSearch();
  };
  _tabActive = (k, queryString) => {
    const { tabActive, handleQueryString, goSearch } = this.props.relaxProps;
    tabActive(k);
    handleQueryString(queryString);
    goSearch();
  };
  /**
   * 清除历史记录
   * @private
   */
  _clearSearchHistory = () => {
    const { clearHistory } = this.props.relaxProps;
    clearHistory();
  };
}

const styles = StyleSheet.create({
  searchHistory: {
    paddingLeft: 8,
    paddingRight: 4
  },
  searchGoodlist: {
    fontSize: 12,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchGoodlistBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  img: {
    height: 14,
    width: 14,
    marginRight: 4
  },
  word: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
  },
  brandState: {
    height: 28,
    maxWidth: 180,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(245, 245, 245)',
    overflow: 'hidden'
  },

  searchStore: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchStoreIcon: {
    width: 14,
    height: 14,
    position: 'relative',
    top: 20
  },

  searchStoreName: {
    position: 'relative',
    marginLeft: 3
  }
});
