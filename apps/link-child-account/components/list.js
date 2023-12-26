import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Relax } from 'plume2';
import { noop } from 'wmkit';
import { screenWidth } from 'wmkit/styles';

@Relax
export default class List extends React.Component {
  static relaxProps = {
    childAccountList: [],
    customerAccount:'customerAccount',
    releaseChildConfirm: noop
  };

  render() {
    const { childAccountList,customerAccount,releaseChildConfirm } = this.props.relaxProps;
    const childList = childAccountList.get('childAccountList');
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>主账户：{customerAccount}</Text>
        </View>
        <View>
          {childList && childList.length > 0 && <View>
            {childList.map((v) => {
                const childAccount = v;
                return (
                  <View style={styles.item}>
                    <View style={styles.itemTextBox}>
                      <Text style={styles.itemText} allowFontScaling={false}>子账户：{childAccount.customerAccount}</Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={styles.linkedInfo}
                      onPress={()=>releaseChildConfirm(childAccount.customerId)}
                    >
                      <Text style={styles.itemText} allowFontScaling={false}>已绑定</Text>
                      <Image style={styles.img} source={require('../img/arrow.png')} />
                    </TouchableOpacity>
                  </View>
                );
              })
            }
          </View>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item:{
    height: 44,
    width: screenWidth,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTextBox: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  text: {
    color: '#333333',
    fontSize: 14,
    flex: 1
  },
  linkedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 9,
    height: 12,
    marginLeft: 10
  }
});
