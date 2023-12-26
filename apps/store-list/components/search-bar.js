import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { Relax, msg } from 'plume2';

import { noop } from 'wmkit/noop';
import * as _ from '../../../wmkit/common/util'; // added by scx 

const isAndroid = Platform.OS === 'android';

@Relax
export default class SearchBar extends React.Component {
  static relaxProps = {
    clickFilter: noop,
    keywords: 'keywords'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { keywords } = this.props.relaxProps;

    return (
      <View style={styles.box}>
        <View style={styles.searchBar}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => msg.emit('router: back')}
          >
            <Image
              source={require('../img/arrow.png')}
              style={styles.leftImg}
            />
          </TouchableOpacity>

          <TouchableWithoutFeedback
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'Search',
                queryString: keywords,
                key: 'supplier'
              })
            }
          >
            <View style={styles.content}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={[styles.input, !keywords && { color: '#939495' }]}
              >
                {keywords || '搜索商家'}
              </Text>
              <Image
                source={require('../img/search.png')}
                style={styles.icon}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={this._open}
          >
            <Image
              style={styles.filterIcon}
              source={require('../img/filter.png')}
            />
            <Text allowFontScaling={false} style={styles.btnText}>
              筛选
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /**
   * 打开筛选
   */
  _open = () => {
    const { clickFilter } = this.props.relaxProps;
    clickFilter(true);
  };
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    paddingTop: isAndroid ? 0 : 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ececec'
  },
  searchBar: {
    padding: 10,
    ..._.ifIphoneX(
      {
        paddingTop: 20,
        height: 58
      },
      {
        height: 48
      }
    ),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftImg: {
    height: 19,
    width: 11,
    marginRight: 10,
    tintColor: '#000'
  },
  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 10,
    top: 5
  },
  filterIcon: {
    width: 12.5,
    height: 12.5,
    tintColor: '#000'
  },
  content: {
    height: 28,
    paddingRight: 8,
    paddingVertical: 5,
    paddingLeft: 35,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden'
  },
  input: {
    textAlign: 'left',
    fontSize: 14,
    flex: 1,
    overflow: 'hidden'
  },
  btn: {
    marginLeft: 6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent'
  },
  btnText: {
    color: '#000',
    marginTop: 2,
    fontSize: 10
  }
});
