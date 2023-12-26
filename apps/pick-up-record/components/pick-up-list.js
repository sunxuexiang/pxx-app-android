import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Relax } from 'plume2';

import PickUp from './pick-up';

@Relax
export default class PickUpList extends React.Component {
  static relaxProps = {
    address: 'address',
    pickUpRecord: 'pickUpRecord',
    order:'order'
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ padding: 10, marginBottom: 30 }}
        style={styles.container}
      >
        {this.props.relaxProps.order&&(
          <PickUp key={Math.random()} item={this.props.relaxProps.pickUpRecord}
                  address={this.props.relaxProps.address} order={this.props.relaxProps.order}/>
        )}
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
