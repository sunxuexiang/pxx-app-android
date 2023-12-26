import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import Header from 'wmkit/header';
import { msg } from 'plume2';

type ISalesHeaderProps = T.IProps & T.ISalesHeaderProps;

const PaihangImg = require('../img/paihang.png');
const ShuomingImg = require('../img/shuoming.png');

@connect<Partial<ISalesHeaderProps>, T.ISalesHeaderState>(
  store2Props,
  actions,
)
export default class SalesHeader extends React.Component<
  Partial<ISalesHeaderProps>,
  T.ISalesHeaderState
> {
  constructor(props: ISalesHeaderProps) {
    super(props);
  }

  /**
    销售业绩头部
*/
  render() {

    return (
        <Header
          renderTitle={this._renderTitle}
          renderRight={this._renderRight}
        />
    );
  }

  _renderTitle = () => {
    let {
      actions: { action },
      main: {
        ruleFlag
      }
    } = this.props;
    return (
      <View style={styles.titleBox}>
        <Text style={styles.titleText} allowFontScaling={false}>
          我的销售业绩
        </Text>
        <TouchableOpacity
          style={styles.titleImgBox}
          activeOpacity={0.8}
          onPress={() => {
            action.commonChange('main.ruleFlag', !ruleFlag);
          }}>
          <Image style={styles.titleImg} source={ShuomingImg} />
        </TouchableOpacity>
      </View>
    );
  };

  _renderRight = () => {
    return (
      <TouchableOpacity
        style={styles.paihangBox}
        activeOpacity={0.8}
        onPress={() => {
          msg.emit('router: goToNext', { routeName: 'SalesRank' });
        }}
      >
        <Image style={styles.paihangImg} source={PaihangImg} />
        <Text style={styles.paihangText} allowFontScaling={false}>
          排行榜
        </Text>
      </TouchableOpacity>
    );
  };
}


const styles = StyleSheet.create({
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 16,
    color: '#000'
  },
  titleImgBox: {
    width: 15,
    height: 15,
    marginLeft: 7
  },
  titleImg: {
    width: 15,
    height: 15
  },
  paihangBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  paihangImg: {
    width: 14,
    height: 14,
    marginBottom: 4
  },
  paihangText: {
    fontSize: 10,
    color: '#c19466'
  }
});
