import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
const del =
    'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/mini/assets/image/common/delete.png';
const { width: SCREENWIDTH } = Dimensions.get('window');

@Relax
export default class History extends React.Component {
  static relaxProps = {
    searchHistory: 'searchHistory',
    hotHistory: 'hotHistory',
    clearHistory: noop,
    handleQueryString: noop,
    goSearch: noop
  };

  render() {
    const { searchHistory, clearHistory, hotHistory } = this.props.relaxProps;
    return (
      <View style={styles.content}>
        <View style={styles.head}>
          <Text allowFontScaling={false} style={styles.tit}>
            搜索历史
          </Text>
          {searchHistory &&
            searchHistory.count() > 0 && (
              <TouchableOpacity activeOpacity={0.6} onPress={clearHistory}>
                <Image
                  source={{
                    uri:
                      'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/mini/assets/image/common/delete.png'
                  }}
                  style={styles.del}
                />
                {/* <Text allowFontScaling={false} style={styles.clearText}>

                </Text> */}
              </TouchableOpacity>
            )}
        </View>

        <View style={styles.box}>
          {searchHistory &&
            searchHistory.toJS().map((s, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  style={styles.item}
                  onPress={() => this._clickHistory(s)}
                >
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={styles.text}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>

        {!searchHistory ||
          (searchHistory.count() === 0 && (
            <View style={styles.empty}>
              <Text allowFontScaling={false} style={styles.grey}>
                暂无搜索记录
              </Text>
            </View>
          ))}
      </View>
    );
  }

  /**
   * 点击搜索历史记录中的一条
   * @param queryString
   * @private
   */
  _clickHistory = (queryString) => {
    const { handleQueryString, goSearch } = this.props.relaxProps;
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
  head: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tit: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 12
  },
  clearText: {
    color: '#333333',
    fontSize: 16
  },
  box: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  del: {
    width: 16,
    height: 16
  },
  item: {
    // width: (SCREENWIDTH - 40) / 3,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
    height: 28,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingLeft: 12,
    paddingRight: 12
  },
  text: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)'
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  },
  grey: {
    color: '#bcbcbc',
    fontSize: 15
  }
});
