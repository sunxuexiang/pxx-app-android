import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Relax, msg } from 'plume2';
import { noop } from 'wmkit/noop';
import Header from 'wmkit/header';

@Relax
export default class TopHeader extends React.Component {
  static relaxProps = {
    changeListView: noop,
    listView: 'listView'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { changeListView, listView } = this.props.relaxProps;
    return (
      <Header
        title="店铺精选"
        onLeftMenuPress={()=>{ msg.emit('router: back');msg.emit('router: refreshRoute',{routeName:'DistributionShopIndex'});}}
        renderRight={() => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.btn}
              onPress={changeListView}
            >
              <Image
                source={
                  listView
                    ? require('../img/bigbtn.png')
                    : require('../img/smallbtn.png')
                }
                style={styles.btnIcon}
              />
              <Text allowFontScaling={false} style={styles.darkText}>
                {listView ? '大图' : '列表'}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginRight: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnIcon: {
    width: 15,
    height: 13,
    tintColor: '#000'
  },
  darkText: {
    color: '#000',
    fontSize: 10,
    marginTop: 2
  }
});
