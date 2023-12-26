import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';

import { mainColor } from 'wmkit/styles/index';

@Relax
export default class LogisticsHead extends React.Component {
  static relaxProps = {
    save: noop
  };

  constructor(props) {
    super(props);
    this.state = {
      logisticsName: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={window.keyBoardShow}
          value={this.state.logisticsName}
          onChangeText={(text) => this.setState({ logisticsName: text })}
          underlineColorAndroid="transparent"
          style={styles.input}
          placeholder="没有选择物流公司请在此输入"
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.btn, { borderColor: mainColor }]}
          onPress={() => this.props.relaxProps.save(this.state.logisticsName)}
        >
          <Text allowFontScaling={false} style={[styles.text, { color: mainColor }]}>
            保存
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    height: 28,
    fontSize: 14,
    padding: 0,
    flex: 1
  },
  btn: {
    height: 25,
    borderWidth: 1,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 12
  }
});
