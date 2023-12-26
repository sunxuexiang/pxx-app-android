import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  PixelRatio
} from 'react-native';
import { screenWidth } from 'wmkit/styles/index';
import { Relax } from 'plume2';

import WmUpload from 'wmkit/upload';
import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';

import Lightbox from 'react-native-lightbox';

/**
 * 附件
 */
@Relax
export default class EnterpriseFile extends React.Component {
  static relaxProps = {
    tid: 'tid',
    addImage: noop,
    removeImage: noop,
    images: 'images',
    enterpriseCheckState:'enterpriseCheckState'
};

  render() {
    const { images,enterpriseCheckState } = this.props.relaxProps;

    return (
      <View style={styles.box}>
        <Text allowFontScaling={false} style={styles.text}>
          <Text style={{color:'red'}}>*</Text>
          上传营业执照
        </Text>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 20,paddingLeft:140 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.row}
        >
          {images.toArray().map((v, index) => {
            return (
              <View key={v} style={{ marginRight: 10, borderColor: '#ebebeb' }}>
                <WMImage
                  key={Math.random()}
                  resizeMode="contain"
                  style={styles.pic}
                  zoom
                  src={v}
                />

                {
                  enterpriseCheckState !== 1 &&  <TouchableOpacity
                    style={styles.close}
                    onPress={() => this.removeImage(index)}
                  >
                    <Text allowFontScaling={false} style={styles.cha}>
                      ×
                    </Text>
                  </TouchableOpacity>
                }

              </View>
            );
          })}

          {images.count() < 1 ? (
              <WmUpload
                beforeUpload={() => this._disableBtn()}
                onChange={(url) => this._uploadImage(url)}
              />
          ) : null}
        </ScrollView>

          <View
            style={styles.tipsBottom}
          >
          <Lightbox
            springConfig={{ tension: 15, friction: 7 }}
            swipeToDismiss={false}
            underlayColor="white"
            backgroundColor="rgba(0,0,0,0.6)"
            renderContent={() => this._renderCarousel(require('../img/demo-01.jpeg'))}
          >
            <View activeOpacity={0.8} style={styles.imgBox}>
              <Image style={styles.image} source={require('../img/ask-01.png')} />
            </View>
          </Lightbox>
            <Text style={styles.tipsBottomText}>
              &nbsp;&nbsp;仅支持jpg、jpeg、png、gif文件，最多上传1张，大小不超过2M
            </Text>
          </View>

      </View>
    );
  }

  /**
   * 禁用/启用 提交按钮
   * @private
   */
  _disableBtn = () => {
    // this.setState({
    //   disabled: !this.state.disabled
    // });
  };

  _renderCarousel = (imageSource) => (
    <Image
      style={{ flex: 1, width: screenWidth, height: screenWidth }}
      resizeMode="contain"
      source={imageSource}
    />
  );

  /**
   * 上传附件
   */
  _uploadImage = (url) => {
    const { addImage } = this.props.relaxProps;
    if (url) {
      addImage(url);
    }
  };

  /**
   * 删除附件
   */
  removeImage = (index) => {
    const { removeImage } = this.props.relaxProps;
    removeImage(index);
  };
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#ebebeb',
    borderTopColor: '#ebebeb',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    padding: 10,
    marginBottom: 10
  },
  deletePic: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#eee',
    position: 'absolute',
    top: -10,
    right: -10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteIcon: {
    tintColor: '#999',
    width: 10,
    height: 10,
    transform: [{ rotate: '45deg' }]
  },
  pic: {
    width: 50,
    height: 50
  },
  row: {
    flexDirection: 'row',
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
  image: {
    height: 15,
    width: 15,
    marginRight: 12,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#dddddd',
  },
  cha: {
    color: '#ffffff',
    fontSize: 12
  },
  example: {
    fontSize: 12,
    color: '#ffffff'
  },
  imgBox: {
    width: 15,
    height: 15,
  },
  shadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tipsBottom:{
    flexDirection: 'row',
    alignItems:'center'

  },
  tipsBottomText:{
    fontSize:11
  }
});
