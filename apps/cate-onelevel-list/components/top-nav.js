import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions
} from 'react-native';
import { fromJS } from 'immutable';
import { mainColor } from 'wmkit/styles/index';
const defaultCateImg = require('../img/defaultCateImg.png');
const screenWidth = Dimensions.get('window').width;

export default class TopNav extends Component {
  constructor(props) {
    super(props);
   
  }
  _scroll;

  _handString = (string, num) => {
    if (string) {
      return string.slice(0, num);
    }
    return '-';
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const nextActivitySecondCate = nextProps.activitySecondCate;
    if(nextActivitySecondCate != this.props.activitySecondCate) {
      // 选中的二级类目的下标
      const activeSecIndex = nextProps.secdCateList.findIndex((item) => item.cateId === nextActivitySecondCate);
      this._scroll.scrollTo({ x: activeSecIndex * 70, y: 0 });
    }
  }

  render() {
    let {
      secdCateList,
      activitySecondCate,
      setSecdCate
    } = this.props;
    secdCateList= fromJS(secdCateList)
    return (
      <View style={{ height: 72}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={(ref) => (this._scroll = ref)}>
          <View style={styles.cateOnlevelCateNav}>
            {secdCateList &&
              secdCateList.map((cate, index) => {
                return (
                  <TouchableOpacity
                    style={
                      index == secdCateList.size - 1
                        ? styles.lastItem
                        : styles.item
                    }
                    onPress={() =>
                      cate.get('cateId') != activitySecondCate &&
                      setSecdCate(cate.get('cateId'))
                    }
                    key={cate.get('cateId')}
                  >
                    <View style={styles.catePic}>
                      {cate.get('cateImg') ? (
                        <Image
                          style={styles.img}
                          source={{ uri: cate.get('cateImg') }}
                        />
                      ) : (
                        <Image style={styles.img} source={defaultCateImg} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.cateNm,
                        activitySecondCate == cate.get('cateId') && {
                          color: mainColor
                        }
                      ]}
                    >
                      {this._handString(cate.get('cateName'), 4)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cateOnlevelCateNav: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: 5,
    alignItems: 'center'
  },
  item: {
    paddingLeft: (screenWidth - 250) / 6,
    alignItems: 'center'
  },
  lastItem: {
    paddingHorizontal: (screenWidth - 250) / 6,
    alignItems: 'center'
  },
  catePic: {
    width: 50,
    height: 50
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 50
  },
  cateNm: {
    paddingTop: 5,
    fontSize: 12,
    color: '#666',
    flexWrap: 'nowrap',
    textAlign: 'center'
  }
});
