import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { screenHeight } from 'wmkit/styles/index';
import { Relax } from 'plume2';
// import * as _ from 'wmkit/common/util';
import * as _ from '../../../wmkit/common/util'; // added by scx 
import WMImage from 'wmkit/image/index';

@Relax
export default class List extends React.Component {
  static relaxProps = {
    cateList: 'cateList',
    index: 'index'
  };

  render() {
    const { cateList, index } = this.props.relaxProps;

    let cate = cateList && cateList.get(index);

    if (!cate) {
      return null;
    }

    cate = cate.toJS();

    const handleClick = this.props.handleClick;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 12 }}
      >
        {/*<TouchableOpacity*/}
        {/*  style={styles.topBtn}*/}
        {/*  activeOpacity={0.8}*/}
        {/*  onPress={() => handleClick(cate.cateId, cate.cateName)}*/}
        {/*>*/}
        {/*  <Text allowFontScaling={false} style={styles.btnText}>*/}
        {/*    {cate.cateName}*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
        <View style={styles.box}>
          {cate.goodsCateList.map((level2Cate) => {
            return (
              <View style={styles.lev2Box} key={level2Cate.cateId}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.header}
                  onPress={() =>
                    handleClick(level2Cate.cateId, level2Cate.cateName)
                  }
                >
                  <Text allowFontScaling={false} style={styles.lev2Text}>
                    {level2Cate.cateName}
                  </Text>
                  <Image
                    source={require('../img/arrow.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>

                <View style={styles.itemBox}>
                  {// 三级分类
                  level2Cate.goodsCateList.map((level3Cate) => {
                    return (
                      <TouchableOpacity
                        key={level3Cate.cateId}
                        activeOpacity={0.8}
                        style={styles.item}
                        onPress={() =>
                          handleClick(level3Cate.cateId, level3Cate.cateName)
                        }
                      >
                        <WMImage
                          resizeMode="contain"
                          src={level3Cate.cateImg&&`${level3Cate.cateImg}?x-oss-process=image/format,jpg/interlace,1,image/resize,m_mfit,w_150,h_150`}
                          style={styles.lev3Img}
                        />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ..._.ifIphoneX(
      {
        height: screenHeight - 113
      },
      {
        height: screenHeight - 68
      }
    )
  },
  topBtn: {
    borderColor: '#000',
    borderWidth: 1,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#000',
    fontSize: 14
  },
  icon: {
    width: 7,
    height: 13,
    tintColor: '#000'
  },
  lev2Box: {
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12
  },
  lev2Text: {
    color: '#333',
    fontWeight: '700'
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemBox: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  navText: {
    color: '#333333',
    fontSize: 12,
    marginTop: 8
  },
  item: {
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%'
  },
  lev3Img: {
    width: 64,
    height: 64
  }
});
