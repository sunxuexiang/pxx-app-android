import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

export default class Test extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={
        styles.container
      }>
        <View style={styles.top}>
          <Text allowFontScaling={false} style={styles.common}>您还未实名认证</Text>
          <Text allowFontScaling={false} style={styles.common}>— — — </Text>
          <Text allowFontScaling={false} style={styles.common}>— — —</Text>
          <Text allowFontScaling={false} style={{
            color: '#000',
            alignSelf: 'flex-end',
            marginRight: 30
          }}>立即认证</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  top: {
    width: Dimensions.get('window').width * 0.85,
    flexDirection: 'column',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    height: 150,
    borderRadius: 8
  },
  common: {
    color: '#000',
    marginTop: 20,
    marginLeft: 20
  }
});
