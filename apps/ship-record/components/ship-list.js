import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Relax } from 'plume2';

import ShipItem from './ship-item';
import ShipRecordDeliver from './deliver';

@Relax
export default class ShipList extends React.Component {
  static relaxProps = {
    orderId: 'orderId',
    tradeDilivery: 'tradeDilivery',
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ padding: 10, marginBottom: 30 }}
        style={styles.container}
      >
        <ShipRecordDeliver/>
        {this.props.relaxProps.tradeDilivery.map((data) => (
          <ShipItem key={Math.random()} item={data} />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 1
  }
});
