import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';

@Relax
export default class LogisticsList extends React.Component {
  static relaxProps = {
    logisticsList: 'logisticsList',
    chooseCompany: noop
  };

  render() {
    const { logisticsList, chooseCompany } = this.props.relaxProps;

    return (
      <ScrollView style={styles.container}>
        {logisticsList.toArray().map(logistic => {
          return (
            <TouchableOpacity
              key={Math.random()}
              activeOpacity={0.8}
              style={styles.logisticItem}
              onPress={() => chooseCompany(logistic)}
            >
              <Text allowFontScaling={false} style={styles.text}>
                {logistic.get('expressName')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logisticItem: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 14
  }
});
