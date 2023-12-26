import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PixelRatio
} from 'react-native';
import { Relax } from 'plume2';

import WMImage from 'wmkit/image/index';
import { noop } from 'wmkit/noop';
import WmUpload from 'wmkit/upload';
import { Alert } from 'wmkit/modal/alert';

import { fromJS } from 'immutable';
import { screenWidth } from '@/wmkit/styles';
const aa='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597404504905&di=dbc2a9ffccd7f3b7ba3cb6e9b02d5b8c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F23%2F20180923204533_4eaKK.thumb.700_0.jpeg';

@Relax
export default class Enclosure extends Component {
  // scroll;
  static relaxProps = {
    orderConfirm: 'orderConfirm',
    addImage: noop,
    removeImage: noop,
    changeAnnexMask: noop
  };


  componentDidUpdate() {
    setTimeout(() => {
      this.scroll.scrollToEnd();
    }, 10);
  }

  componentDidMount() {
    setTimeout(() => {
      this.scroll.scrollToEnd();
    }, 10);
  }
  render() {
    const { orderConfirm, changeAnnexMask } = this.props.relaxProps;
    const index = orderConfirm.findIndex(
      (f) => f.get('storeId') == this.props.storeId
    );
    const enclosures = orderConfirm.getIn([index, 'enclosures']) || fromJS([]);
    return (
      <View style={styles.orderAttachment}>
        <Text allowFontScaling={false} style={styles.attachmentText}>
          订单附件
        </Text>
        <View style={{flexDirection:'row',flex:1,marginLeft:5,alignItems:'center'}}>
          <ScrollView
            ref={(ref) => (this.scroll = ref)}
            contentContainerStyle={{ paddingVertical: 0,alignItems:'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={styles.imgScroll}
          >
            {enclosures.toArray().map((v, index) => {
              let imgSrc = v.get('fileData')
                ? v.get('fileData')
                : v.get('image');
              return (
                <TouchableOpacity
                  key={v}
                  onPress={() => {
                    changeAnnexMask(index, this.props.storeId);
                  }}
                >
                  <WMImage
                    key={Math.random()}
                    resizeMode="contain"
                    style={styles.pic}
                    zoom={true}
                    src={imgSrc}
                  />
                  <TouchableOpacity
                    style={styles.close}
                    onPress={() => this.removeImage(index)}
                  >
                    <Text allowFontScaling={false} style={styles.cha}>
                      ×
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {enclosures.count() >= 10 ? null : (
              <WmUpload
                beforeUpload={() => this.props.disableF()}
                onChange={(v) => this._uploadImage(v)}
                customStyle={true}
              />
            )}
        </View>
        {/* <Text allowFontScaling={false} style={styles.fileTips}>
          仅支持jpg、jpeg、png、gif文件，最多上传10张，大小不超过5M
        </Text> */}
      </View>
    );
  }

  /**
   * 上传附件
   */
  _uploadImage = (url) => {
    if (url) {
      const img = {
        image: url,
        status: 'done'
      };
      this.props.relaxProps.addImage({
        image: img,
        storeId: this.props.storeId
      });
      this.props.disableF();
    }
  };

  /**
   * 删除附件
   */
  removeImage = (index) => {
    this.props.relaxProps.removeImage({
      index,
      storeId: this.props.storeId
    });
  };

  /**
   * 上传验证
   * @returns {boolean}
   * @private
   */
  _uploadCheck = () => {
    const { orderConfirm } = this.props.relaxProps;
    const index = orderConfirm.findIndex(
      (f) => f.get('storeId') == this.props.storeId
    );
    const enclosures = orderConfirm.getIn([index, 'enclosures']) || fromJS([]);
    if (enclosures.count() >= 10) {
      Alert({ text: '最多只能上传10张图片' });
      return false;
    }
    return true;
  };
}

const styles = StyleSheet.create({
  orderAttachment: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attachmentText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12
  },
  fileTips: {
    color: '#333',
    fontSize: 12,
    marginTop: 10,
    margin: 0,
    padding: 0
  },
  imgScroll: {
    flexDirection: 'row'
  },
  pic: {
    width: 50,
    height: 50
  },
  close: {
    width: 13,
    height: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6.5,
    position: 'absolute',
    right: 2,
    top: 2
  },
  cha: {
    color: '#ffffff',
    fontSize: 12
  }
});
