import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';

@Relax
export default class ImageModal extends React.Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    imageList: 'imageList',
    imageModal: 'imageModal',
    toggleImageModal: noop,
    chooseImageIndex: 'chooseImageIndex'
  };

  render() {
    const {
      imageList,
      imageModal,
      toggleImageModal,
      chooseImageIndex
    } = this.props.relaxProps;

    //拼装imageUrls
    let imageUrls = [];
    for (let i = 0; i < imageList.length; i++) {
      let Obj = {};
      Obj.url = imageList[i];
      imageUrls.push(Obj);
    }

    return (
      imageModal && (
        <View style={styles.modal}>
          <ImageViewer
            onClick={() => toggleImageModal(true)}
            imageUrls={imageUrls} // 照片路径
            enableImageZoom={true} // 是否开启手势缩放
            saveToLocalByLongPress={true} //是否开启长按保存
            index={chooseImageIndex} // 初始显示第几张
            menuContext={{ saveToLocal: '保存图片', cancel: '取消' }}
          />
        </View>
      )
    );
  }

  // renderLoad = () => {
  //   let { imageList, chooseImageIndex } = this.props.relaxProps;
  //   return <Image source={{ uri: imageList[chooseImageIndex] }} />;
  // };
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1000
  }
});
