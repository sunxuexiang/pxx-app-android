'use strict';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { screenWidth, screenHeight } from 'wmkit/styles';
import Loading from 'wmkit/loading';

export default class SkeletonBigList extends Component {
  render() {
    let skeList = [1, 2, 3, 4, 5.6, 7, 8, 9, 10];
    return (
      <View style={styles.skeContainer}>
        <View style={styles.skeList}>
          {skeList.map((item) => {
            return (
              <View style={styles.skeItem} key={item}>
                <View style={styles.skeItemTop} />
                <View style={styles.skeItemBottom}>
                  <View style={[styles.skeColor, styles.skeItemTitle]} />
                  <View style={[styles.skeColor, styles.skeItemTitle]} />
                  <View style={[styles.skeItemLineBox]}>
                    <View style={[styles.skeColor, styles.skeSqure1]} />
                    <View style={[styles.skeColor, styles.skeSqure2]} />
                  </View>
                  <View style={[styles.skeColor, styles.skeItemSpec]} />
                  <View style={[styles.skeItemLineBox, { marginBottom: 0 }]}>
                    <View style={[styles.skeColor, styles.skeSqure3]} />
                    <View style={[styles.skeColor, styles.skeSqure3]} />
                    <View style={[styles.skeColor, styles.skeSqure3]} />
                  </View>
                  <View style={styles.skeItemLineBox1}>
                    <View style={[styles.skeColor, styles.skeSqure4]} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        {/*<View style={styles.loading}>*/}
        {/*  <Loading />*/}
        {/*</View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  skeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    width: screenWidth,
    position: 'relative'
  },

  loading: {
    position: 'absolute',
    width: screenWidth,
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight - 88,
  },

  skeColor: {
    backgroundColor: '#f5f5f5'
  },
  skeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skeItem: {
    marginBottom: 12,
    borderRadius: 6,
    height: 316,
    overflow: 'hidden',
    width: screenWidth * 0.45
  },

  skeItemTop: {
    backgroundColor: '#ebebeb',
    // width:screenWidth*0.34,
    height: 170,
    width: 170
  },

  skeItemBottom: {
    // width:screenWidth*0.53,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 12
  },

  skeItemTitle: {
    // width:211,
    // width:screenWidth*0.4,
    marginBottom: 8,
    height: 12,
  },

  skeItemSpec: {
    width: 52,
    height: 16,
    marginBottom: 8
  },

  skeItemLineBox: {
    flexDirection: 'row',
    marginBottom: 8
  },
  skeItemLineBox1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
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
    width: 70,
    height: 20,
  },
});
