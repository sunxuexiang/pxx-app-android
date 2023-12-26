import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Progress } from '@ant-design/react-native';

export default class ProgressBar extends React.PureComponent {
  render() {
    const { style, barStyle, containerStyles, percent } = this.props;
    return (
      <View style={[styles.container, containerStyles]}>
        <Progress
          percent={percent}
          position="normal"
          style={[styles.pStyle, style]}
          barStyle={[styles.pBarStyle, barStyle]}
          unfilled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    alignSelf: 'stretch',
    backgroundColor: '#FF7A32'
  },
  pStyle: {
    borderRadius: 3,
    backgroundColor: 'rgba(152,91,49,0.1)'
  },
  pBarStyle: {
    borderRadius: 3,
    borderColor: '#FF6600',
    backgroundColor: '#FF6600',
    borderWidth: 2
  }
});
