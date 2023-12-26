import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { link } from '../index';
import { screenHeight, screenWidth } from '../styles';

export default class MenuBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { menuList, changeShow } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          changeShow(false);
        }}
      >
        <View style={[styles.box, this.props.style]}>
          <View style={styles.menuBox}>
            {menuList.map((v, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    if (v.linkInfoPage === '') {
                      return;
                    }
                    link(JSON.parse(v.linkInfoPage));
                    changeShow(false);
                  }}
                  style={styles.menuChild}
                >
                  <Image source={{ uri: v.imgSrc }} style={styles.icon} />
                  <Text style={styles.menuTitle}>{v.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000
  },
  box: {
    position: 'absolute',
    top: 40,
    right: 5,
    zIndex: 100,
    backgroundColor: '#fff'
  },
  nav: {
    backgroundColor: '#fff'
  },
  triangle: {
    // width: 0,
    // height: 0,
    borderTopColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: -5,
    right: 7
  },
  menuBox: {
    /* 伪元素必须添加content */
    width: 120
    /* 为了兼容IE6，所有设置为透明（transparent）的边，需要设置为dashed；有颜色的边设置为solid */
  },
  menuChild: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  icon: {
    width: 18,
    height: 18,
    marginLeft: 10
  },
  menuTitle: {
    marginLeft: 10,
    fontSize: 16,
    color: ' rgba(0, 0, 0, 0.8)'
  }
});
