import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as T from '../types';

import actions from '../actions/index';
import ImageViewer from 'react-native-image-zoom-viewer';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(
  store2Props,
  actions
)
export default class Info extends React.Component<
  Partial<IInfoProps>,
  T.IInfoState
> {
  constructor(props: IInfoProps) {
    super(props);
  }

  /**

*/
  render() {
    let {
      actions: { action },
      main
    } = this.props;

    //拼装imageUrls
    let imageUrls = [];
    for (let i = 0; i < main.imageList.length; i++) {
      let Obj = {};
      Obj.url = main.imageList[i];
      imageUrls.push(Obj);
    }
    return (
      main.imageModal && (
        <View style={styles.modal}>
          <ImageViewer
            onClick={() => action.toggleImageModal(true)}
            imageUrls={imageUrls} // 照片路径
            enableImageZoom={true} // 是否开启手势缩放
            saveToLocalByLongPress={false} //是否开启长按保存
            index={main.chooseImageIndex} // 初始显示第几张
            menuContext={{ saveToLocal: '保存图片', cancel: '取消' }}
          />
        </View>
      )
    );
  }

  renderLoad = () => {
    let { main } = this.props;
    return <Image source={{ uri: main.imageList[main.imageIndex] }} />;
  };
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
