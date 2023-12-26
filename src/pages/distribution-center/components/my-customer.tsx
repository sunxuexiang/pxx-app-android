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
            <View style={styles.rightPeople}>
              <Text style={styles.peopleText} allowFontScaling={false}>
                全部用户
              </Text>
              <Image
                style={styles.arrow}
                source={require('../img/arrow.png')}
              />
            </View>
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              msg.emit('router: goToNext', {
                routeName: 'MyCustomer',
                tab: '3'
              });
            }}
          >
            <View style={styles.box}>
              <Text style={styles.redNumber} allowFontScaling={false}>
                {inviteCustomer.myCustomerNum || '0'}
              </Text>
              <Text style={styles.currentName} allowFontScaling={false}>
                我的顾客
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
    paddingHorizontal: 12,
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
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderBottomColor: '#ebebeb',
    backgroundColor: '#ffffff',
    paddingTop: 16
    // height: 50
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  rightPeople: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  peopleText: {
    fontSize: 12,
    color: '#999'
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
    width: 12,
    height: 12,
    marginLeft: 2,
    alignItems: 'center'
  },
  performance: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
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
    color: '#ff6600',
    fontSize: 16,
    marginBottom: 4
  },
  currentName: {
    color: '#999',
    fontSize: 12
  }
});
