import React from 'react';
import { Text, View } from 'react-native';
export default class NoMore extends React.Component {
  render() {
    const { text, noMoreStyle } = this.props;
    return (
      <View
        style={[
          {
            height: 60,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff'
          },
          noMoreStyle
        ]}
        source={require('./images/nomore.png')}
        resizeMode="cover"
      >
        <Text allowFontScaling={false} style={{ color: '#999' }}>
          {text}
        </Text>
      </View>
    );
  }
}
