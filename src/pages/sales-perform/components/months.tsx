import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PixelRatio } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { screenWidth } from 'wmkit/styles/index';
import * as _ from '../../../../wmkit/common/util';

type IDateTabProps = T.IProps & T.IDateTabProps;

@connect<Partial<IDateTabProps>, T.IDateTabState>(
  store2Props,
  actions
)
export default class Months extends React.Component<Partial<IDateTabProps>,
  T.IDateTabState> {
  constructor(props: IDateTabProps) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main: {
        monthData,
        monthFlag
      }
    } = this.props;

    return (
      monthFlag &&
      <View style={styles.navTagList}>
        {monthData.map(item =>
          <TouchableOpacity
            key={item.value}
            style={styles.navTag}
            activeOpacity={0.8}
            onPress={() => {
              action.commonChange('main.monthFlag', !monthFlag);
              action.commonChange('main.month', item);
              action.commonChange('main.dateTab', '2');
              action.querySalesList();
            }}
          >
            <Text style={styles.tagText} allowFontScaling={false}>
              {item.value}
            </Text>
          </TouchableOpacity>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navTagList: {
    position: 'absolute',
    right: 0,
    ..._.ifIphoneX(
      {
        top: 152
      },
      {
        top: 132
      }
    ),
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth / 3,
    zIndex: 1
  },
  navTag: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 20,
    marginTop: 2,
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
