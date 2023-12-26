'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { screenWidth, screenHeight } from 'wmkit/styles';

export default class SkeletonSmallList extends Component {
  render() {
    let skeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <View style={styles.skeContainer}>
        <View style={styles.skeList}>
          {skeList.map((item) => {
            return (
              <View style={styles.skeItem} key={item}>
                <View style={styles.skeItemLeft}></View>
                <View style={styles.skeItemRight}>
                  <View style={[styles.skeColor, styles.skeItemTitle]}></View>
                  <View style={[styles.skeColor, styles.skeItemTitle]}></View>
                  <View style={[styles.skeColor, styles.skeItemSpec]}></View>
                  <View style={[styles.skeItemLineBox, { marginBottom: 14 }]}>
                    <View style={[styles.skeColor, styles.skeSqure1]}></View>
                    <View style={[styles.skeColor, styles.skeSqure2]}></View>
                    <View style={[styles.skeColor, styles.skeSqure1]}></View>
                    <View style={[styles.skeColor, styles.skeSqure2]}></View>
                  </View>
                  <View style={styles.skeItemLineBox}>
                    <View style={[styles.skeColor, styles.skeSqure3]}></View>
                    <View style={[styles.skeColor, styles.skeSqure3]}></View>
                    <View style={[styles.skeColor, styles.skeSqure3]}></View>
                  </View>
                  <View style={styles.skeItemLineBox1}>
                    <View style={[styles.skeColor, styles.skeSqure4]}></View>
                    <View style={[styles.skeColor, styles.skeSqure5]}></View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  skeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    width: screenWidth,
    position: 'relative'
  },

  loading: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight - 88,
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  skeColor: {
    backgroundColor: '#f5f5f5'
  },

  skeItem: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between'
  },

  skeItemLeft: {
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    width: screenWidth * 0.34,
    height: 128
  },

  skeItemRight: {
    // width:screenWidth*0.53,
  },

  skeItemTitle: {
    // width:211,
    width: screenWidth * 0.53,

    height: 12,
    marginBottom: 4
  },

  skeItemSpec: {
    width: 90,
    height: 10,
    marginTop: 4
  },

  skeItemLineBox: {
    flexDirection: 'row',
    marginTop: 8
  },
  skeItemLineBox1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },

  skeSqure1: {
    width: 38,
    height: 14,
    marginRight: 4
  },
  skeSqure2: {
    width: 28,
    height: 14,
    marginRight: 4
  },
  skeSqure3: {
    width: 32,
    height: 10,
    marginRight: 4
  },
  skeSqure4: {
    width: 52,
    height: 16
  },
  skeSqure5: {
    width: 70,
    height: 20
  }
});
