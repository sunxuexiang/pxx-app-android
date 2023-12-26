import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  PixelRatio
} from 'react-native';
import { Relax } from 'plume2';
import WMImage from 'wmkit/image/index';
import WmUpload from 'wmkit/upload';
import { noop } from 'wmkit/noop';

/**
 * 退货退款附件
 */
@Relax
export default class ReturnRefundFile extends React.Component {
  static relaxProps = {
    tid: 'tid',
    addImage: noop,
    removeImage: noop,
    images: 'images'
  };

  render() {
    const { images } = this.props.relaxProps;

    return (
      <View style={styles.box}>
        <Text allowFontScaling={false} style={styles.text}>
          退单附件
        </Text>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.row}
        >
          {this.props.relaxProps.images.toArray().map((v, index) => {
            let imgSrc = v.get('fileData') ? v.get('fileData') : v.get('image');
            return (
              <View key={v} style={{ marginRight: 10, borderColor: '#ebebeb' }}>
                <WMImage
                  key={Math.random()}
                  resizeMode="contain"
                  style={styles.pic}
                  zoom
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
              </View>
            );
          })}

          {images.count() < 10 ? (
            <WmUpload
              beforeUpload={() => this.props.disableBtn()}
              onChange={(url) => this._uploadImage(url)}
            />
          ) : null}
        </ScrollView>
        <Text
          style={{
            color: '#999',
            fontSize: 12,
            marginTop: 10
          }}
        >
          仅支持jpg、jpeg、png、gif文件，最多上传10张，大小不超过5M
        </Text>
      </View>
    );
  }

  /**
   * 上传附件
   */
  _uploadImage = (url) => {
    if (url) {
      this.props.relaxProps.addImage({ image: url, status: 'done' });
      this.props.disableBtn();
    }
  };

  /**
   * 删除附件
   */
  removeImage = (index) => {
    this.props.relaxProps.removeImage(index);
  };
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffffff',
    // borderBottomColor: '#ebebeb',
    // borderTopColor: '#ebebeb',
    // borderBottomWidth: 1 / PixelRatio.get(),
    // borderTopWidth: 1 / PixelRatio.get(),
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
    flexDirection: 'row'
    // alignItems: 'center',
    // justifyContent: 'flex-start'
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
