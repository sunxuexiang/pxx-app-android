import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import { mainColor, screenWidth } from 'wmkit/styles/index';
import { IMainDateTab } from '../types';

type IDateTabProps = T.IProps & T.IDateTabProps;

@connect<Partial<IDateTabProps>, T.IDateTabState>(
  store2Props,
  actions,
)
export default class DateTab extends React.Component<
  Partial<IDateTabProps>,
  T.IDateTabState
> {
  constructor(props: IDateTabProps) {
    super(props);
  }

  /**
    日期选择tab页
*/
  render() {
    let {
      actions: {action},
      main : {
        dateTab,
        monthFlag,
        month
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.navBox}>
          <TouchableOpacity
            style={[styles.nav, dateTab === '0' ? { borderBottomColor: mainColor } : {}]}
            activeOpacity={0.8}
            onPress={() => {
              this._onDateTabChange('0');
            }}
          >
            <Text
              style={[styles.text, dateTab === '0' ? { color: mainColor } : {}]}
              allowFontScaling={false}
            >
              最近7天
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navBox}>
          <TouchableOpacity
            style={[styles.nav, dateTab === '1' ? { borderBottomColor: mainColor } : {}]}
            activeOpacity={0.8}
            onPress={() => {
              this._onDateTabChange('1');
            }}
          >
            <Text
              style={[styles.text, dateTab === '1' ? { color: mainColor } : {}]}
              allowFontScaling={false}
            >
              最近30天
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navBox}>
          <TouchableOpacity
            style={styles.navTag}
            activeOpacity={0.8}
            onPress={() => {
              action.commonChange('main.monthFlag', !monthFlag);
            }}
          >
            <Text style={styles.tagText} allowFontScaling={false}>
              {!month ? '自然月' : month.value}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onDateTabChange(tab : IMainDateTab) {
    let { actions: {action} } = this.props;
    action.commonChange('main.dateTab', tab);
    action.commonChange('main.month', null);
    action.querySalesList();
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    backgroundColor: '#fafafa'
  },
  navBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth / 3
  },
  nav: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent'
  },
  text: {
    color: '#666',
    fontSize: 12
  },
  navTag: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 20,
    borderWidth: 2 / PixelRatio.get(),
    borderColor: '#000',
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  tagText: {
    color: '#000',
    fontSize: 10
  }
});
