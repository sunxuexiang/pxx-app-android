import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';

import { DragSortableView } from 'react-native-drag-sort';

import { isAndroid, screenWidth } from 'wmkit/styles/index';

@Relax
export default class ListSmall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true
    };
  }

  static relaxProps = {
    shopSkuList: 'shopSkuList',
    delCommodityDistribution: noop,
    save: noop
  };

  render() {
    const shopSkuList = this.props.relaxProps.shopSkuList;
    const { save } = this.props.relaxProps;
    return (
      <ScrollView
        ref={(scrollView) => (this.scrollView = scrollView)}
        scrollEnabled={this.state.scrollEnabled}
        style={styles.container}
      >
        {shopSkuList.length > 0 && <DragSortableView
          dataSource={shopSkuList}
          parentWidth={parentWidth}
          childrenWidth={childrenWidth}
          childrenHeight={childrenWidth}
          scaleStatus={'scale'}
          onDragStart={(startIndex, endIndex) => {
            this.setState({
              scrollEnabled: false
            });
          }}
          onDragEnd={(startIndex) => {
            this.setState({
              scrollEnabled: true
            });
          }}
          onDataChange={(data) => {
            // 改变数据后将新的data赋值给data
            save(data);
          }}
          keyExtractor={(item, index) => item.goodsInfo.goodsInfoId} // FlatList作用一样，优化
          onClickItem={(data, item, index) => { }}
          renderItem={(item, index) => {
            return this.renderItem(item, index);
          }}
        />}
      </ScrollView>
    );
  }

  renderItem(item) {
    const { delCommodityDistribution } = this.props.relaxProps;
    const data = this.props.relaxProps.shopSkuList;
    const goodsInfo = item.goodsInfo;
    return (
      <View style={styles.item} key={goodsInfo.goodsInfoId}>
        <WMImage style={styles.img} src={goodsInfo.goodsInfoImg} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.closeBox}
          onPress={() => {
            const newData = [...data];
            //点击时判断此id对应的索引值
            let index = newData.findIndex(
              (value) => value.goodsInfo.goodsInfoId === goodsInfo.goodsInfoId
            );
            delCommodityDistribution(goodsInfo.goodsInfoId, index);
          }}
        >
          <Image style={styles.close} source={require('../img/close.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const parentWidth = screenWidth - 10;
const childrenWidth = (screenWidth - 10) / 4;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 10
  },
  text: {
    textAlign: 'center'
  },
  smallViewSort: {
    width: screenWidth
  },
  item: {
    width: childrenWidth - 10,
    height: childrenWidth - 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: childrenWidth - 14,
    height: childrenWidth - 14
  },
  closeBox: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 2
  },
  close: {
    width: 16,
    height: 16
  }
});
