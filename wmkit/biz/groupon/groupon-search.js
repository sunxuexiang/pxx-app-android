import React from 'react';
import { msg } from 'plume2';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { screenWidth } from 'wmkit/styles/index';

import * as _ from '../../common/util';

const isAndroid = Platform.OS === 'android';

export default class GrouponSearch extends React.Component {
  render() {
    const { queryString, boxStyle } = this.props;

    return (
      <View style={[styles.box,boxStyle]}>
        <View style={styles.searchBar}>
          <TouchableWithoutFeedback
            onPress={() =>
              msg.emit('router: goToNext', {
                routeName: 'Search',
                queryString: queryString,
                //key: groupon 表示是拼团商品的搜索
                key: 'groupon'
              })
            }
          >
            <View style={styles.content}>
              <Image source={require('./img/search.png')} style={styles.icon} />
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={[
                  styles.input,
                  !queryString && { color: 'rgba(0,0,0,0.4)' }
                ]}
              >
                {queryString || '爱拼才会赢'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    zIndex: 1,
    width: screenWidth,
    ..._.ifIphoneX(
      {
        paddingTop: 10
      },
      {
        paddingTop: 10
      }
    )
  },
  searchBar: {
    paddingHorizontal: 12,
    paddingTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftImg: {
    height: 19,
    width: 11,
    marginRight: 20,
    tintColor: '#000'
  },
  icon: {
    width: 16,
    height: 16
  },
  content: {
    height: 36,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 12
  },
  input: {
    flex: 1,
    textAlign: 'left',
    fontSize: 12,
    marginLeft: 8
  }
});
