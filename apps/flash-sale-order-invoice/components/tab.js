import React, { Component } from 'react';
import { View, StyleSheet, PixelRatio } from 'react-native';
import { Relax } from 'plume2';

import { screenWidth } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';
import RadioBox from 'wmkit/radio-box';
@Relax
export default class Tabs extends Component {
  static relaxProps = {
    key: 'key',
    tabs: 'tabs',

    initTabActive: noop
  };

  render() {
    const { key, initTabActive, tabs } = this.props.relaxProps;

    return (
      <View style={styles.box}>
        <RadioBox
          data={tabs}
          checked={key}
          onCheck={val =>
            initTabActive({
              tabKey: val,
              companyInfoId: this.props.companyInfoId
            })
          }
          style={{ width: (screenWidth - 56) / 3 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 7,
    backgroundColor: '#ffffff',
    flexWrap: 'wrap',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  }
});
