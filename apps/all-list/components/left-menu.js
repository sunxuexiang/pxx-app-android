import React from 'react';
import {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax } from 'plume2';
import { mainColor, screenHeight } from 'wmkit/styles/index';
import { noop } from 'wmkit/noop';

@Relax
export default class LeftMenu extends React.Component {
  static relaxProps = {
    cateList: 'cateList',
    index: 'index',
    changeIndex: noop
  };

  render() {
    const { cateList, index, changeIndex } = this.props.relaxProps;

    return (
      <View>
        <ScrollView style={styles.menu}>
          {cateList &&
            cateList.toJS().map((cate, i) => {
              return (
                <TouchableOpacity
                  key={cate.cateId}
                  activeOpacity={0.8}
                  style={[styles.item,index === i && { backgroundColor: '#cfe5f5' }]}
                  onPress={() => changeIndex(i)}
                >
                  {/*{this.props.source !== 'goodsList' && (*/}
                  {/*  <Image*/}
                  {/*    style={styles.img}*/}
                  {/*    source={*/}
                  {/*      cate.cateImg*/}
                  {/*        ? { uri: cate.cateImg }*/}
                  {/*        : require('../img/cate-img.jpg')*/}
                  {/*    }*/}
                  {/*  />*/}
                  {/*)}*/}
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={[styles.text, index === i && { color: mainColor }]}
                  >
                    {cate.cateName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          <View style={{ height: 85 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    width: 84,
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    height: screenHeight - 68
  },
  img: {
    width: 25,
    height: 25,
    marginBottom: 8
  },
  item: {
    height: 44,
    paddingHorizontal: 8,
    // paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#333333',
    fontSize: 12,
    height: 14,
    lineHeight: 14,
    textAlign: 'center'
  },
  onlytext: {
    color: '#333333',
    fontSize: 12,
    paddingVertical: 5
  }
});
