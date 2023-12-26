import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import * as T from '../types';

import { screenWidth } from 'wmkit/styles/index';
import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { msg } from 'plume2';

type IMyCustomerProps = T.IProps & T.IMyCustomerProps;

@connect<Partial<IMyCustomerProps>, T.IMyCustomerState>(
  store2Props,
  actions
)
export default class MyUser extends React.Component<
  Partial<IMyCustomerProps>,
  T.IMyCustomerState
> {
  constructor(props: IMyCustomerProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      main: { inviteCustomer }
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            msg.emit('router: goToNext', {
              routeName: 'MyCustomer'
            });
          }}
        >
          <View style={styles.nav}>
            <Text style={styles.title} allowFontScaling={false}>
              我的用户
            </Text>
            <Image style={styles.arrow} source={require('../img/arrow.png')} />
          </View>
        </TouchableOpacity>
        <View style={styles.performance}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'MyCustomer',
                tab: '1'
              });
            }}
          >
            <View style={styles.box}>
              <Text style={styles.redNumber} allowFontScaling={false}>
                {inviteCustomer.inviteNum || '0'}
              </Text>
              <Text style={styles.currentName} allowFontScaling={false}>
                邀新人数
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'MyCustomer',
                tab: '2'
              });
            }}
          >
            <View style={styles.box}>
              <Text style={styles.redNumber} allowFontScaling={false}>
                {inviteCustomer.validInviteNum || '0'}
              </Text>
              <Text style={styles.currentName} allowFontScaling={false}>
                有效邀新
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
    flexDirection: 'column'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb',
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    height: 50
  },
  title: {
    fontSize: 14,
    color: '#333'
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  orderName: {
    color: '#000',
    fontSize: 14
  },
  arrow: {
    width: 7,
    height: 13,
    tintColor: '#000',
    marginLeft: 2,
    alignItems: 'center'
  },
  performance: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 75,
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  redNumber: {
    color: '#FF1F4E',
    fontSize: 15,
    marginBottom: 4
  },
  currentName: {
    color: '#333',
    fontSize: 12
  }
});
