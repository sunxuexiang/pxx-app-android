import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import { link } from 'wmkit';
const { width: SCREENWIDTH } = Dimensions.get('window');

@Relax
export default class Hot extends React.Component {
  static relaxProps = {
    searchHistory: 'searchHistory',
    hotHistory: 'hotHistory',
    clearHistory: noop,
    handleQueryString: noop,
    goSearch: noop
  };
  render() {
    const { hotHistory } = this.props.relaxProps;
    return (
      <View style={styles.content}>
        <View style={styles.head}>
          <Text allowFontScaling={false} style={styles.tit}>
            热门搜索
          </Text>
        </View>

        <View style={styles.box}>
          {hotHistory &&
            hotHistory.map((s, i) => {
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
                    {s.popularSearchKeyword}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
        {!hotHistory ||
          (hotHistory.length < 0 && (
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
   * 点击搜索热门中的一条
   * @param queryString
   * @private
   */
  _clickHistory = (hotWord) => {
    // 如果热门搜索词配置了落地页，则跳转落地页，否则正常搜索商品
    if (hotWord.relatedLandingPage) {
      // 落地页字符串格式不正确，是单引号，转json时报错，解决方法：把单引号替换为双引号
      link(JSON.parse(hotWord.relatedLandingPage.replace(/'/gi, '"')));
    } else {
      const { handleQueryString, goSearch } = this.props.relaxProps;
      handleQueryString(hotWord.popularSearchKeyword);
      goSearch();
    }
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
    marginTop: 16,
    marginBottom: 12,
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
    fontSize: 14
  },
  box: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  item: {
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
