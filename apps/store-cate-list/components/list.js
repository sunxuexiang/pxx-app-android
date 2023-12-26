import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Relax, msg } from 'plume2';

import { screenHeight } from 'wmkit/styles/index';

@Relax
export default class List extends React.Component {
  static relaxProps = {
    cateList: 'cateList'
  };

  render() {
    let { cateList } = this.props.relaxProps;
    const { storeId, flag } = this.props;
    let cate = this._loop(cateList, cateList, 0);

    if (!cate) {
      return null;
    }

    const handleClick = this.props.handleClick;

    return (
      <ScrollView
        style={styles.container}
        // contentContainerStyle={{ padding: 12 }}
      >
        <TouchableOpacity
          style={styles.topBtn}
          activeOpacity={0.8}
          onPress={() => {
            flag
              ? msg.emit('router: goToNext', {
                  routeName: 'StoreGoodsList',
                  storeId
                })
              : handleClick('', '分类');
          }}
        >
          <Text allowFontScaling={false} style={styles.btnText}>
            全部商品
          </Text>
        </TouchableOpacity>
        <View style={styles.box}>
          {cate.toJS().map((level2Cate) => {
            return (
              <View key={level2Cate.storeCateId}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.header}
                  onPress={() =>
                    handleClick(level2Cate.storeCateId, level2Cate.cateName)
                  }
                >
                  <Text allowFontScaling={false} style={styles.text1}>{level2Cate.cateName}</Text>
                  <Image
                    source={require('../img/arrow.png')}
                    style={styles.icon}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
                <View style={styles.itemBox}>
                  {// 三级分类
                  level2Cate.children &&
                    level2Cate.children.map((level3Cate) => {
                      return (
                        <TouchableOpacity
                          key={level3Cate.storeCateId}
                          activeOpacity={0.8}
                          style={styles.item}
                          onPress={() =>
                            handleClick(
                              level3Cate.storeCateId,
                              level3Cate.cateName
                            )
                          }
                        >
                          <Text
                            numberOfLines={1}
                            style={styles.navText}
                            allowFontScaling={false}
                          >
                            {level3Cate.cateName}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ height: 85 }} />
      </ScrollView>
    );
  }

  //装载店铺分类数据
  _loop = (oldCateList, cateList, parentCateId) =>
    cateList
      .filter((cate) => cate.get('cateParentId') === parentCateId)
      .map((item) => {
        const childCates = oldCateList.filter(
          (cate) => cate.get('cateParentId') == item.get('storeCateId')
        );
        if (childCates && childCates.count()) {
          item = item.set('children', childCates);
          this._loop(oldCateList, childCates, item.get('storeCateId'));
        }
        return item;
      });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingHorizontal:12
    // height: screenHeight - 68
  },
  topBtn: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14
  },
  btnText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: '#333'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom:4
  },
  text1:{
    fontSize:14
  },
  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  navText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12
  },
  item: {
    justifyContent: 'center',
    marginTop:8,
    backgroundColor:'#f5f5f5',
    paddingVertical:8,
    paddingHorizontal:32,
    borderRadius:14,
    marginRight:8
  }
});
