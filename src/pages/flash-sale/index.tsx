import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import Header from 'wmkit/header';

import Times from './components/times';

import ProductList from './components/product-list';

import SceneList from './components/scene-list';

import Banner from './components/banner';
import Carousel from 'react-native-snap-carousel';
import { link, fetchModal, setModalShow } from '../../../wmkit/adv-modal';
import { screenWidth } from 'wmkit/styles/index';
import ModalShow from '../../../wmkit/biz/modal-show';
@connect<Partial<T.IProps>, any>(
  store2Props,
  actions
)
export default class FlashSale extends React.Component<Partial<T.IProps>, any> {
  componentDidMount() {
    this.updateModalStatus('');
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }
  constructor(props) {
    super(props);
    this.state = {
      isModalFlag: false,
      imgUrl: '',
      imgHeight: 0,
      jumpPage: {},
      nextPopupId: '',
      isFull: false
    };
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return main.isReady ? (
      main.sceneList.length > 0 ? (
        <View style={styles.container}>
          <ScrollView
              style={styles.scrollBox}
              showsVerticalScrollIndicator={false}
          >
            <View style={styles.bgc}>
              {/*/!* 场次 *!/*/}
              <SceneList />
            </View>
            <Banner />
            <Times />
            {/*/!* 商品列表 *!/*/}
            {main.activityTime && <ProductList />}
          </ScrollView>
          <ModalShow
            imgUrl={this.state.imgUrl}
            imgHeight={this.state.imgHeight}
            link={() => link(this.state.jumpPage)}
            handleClose={() => this.handleClose()}
            isModalFlag={this.state.isModalFlag}
            isFull={this.state.isFull}
          />
        </View>
      ) : (
        <View style={styles.blank}>
          <Header title="限时抢购" />
          <View style={styles.blank}>
            <Image
              source={require('./img/blank.png')}
              style={{ width: 150, height: 150 }}
            />
            <Text allowFontScaling={false}>敬请期待</Text>
          </View>
          <ModalShow
            imgUrl={this.state.imgUrl}
            imgHeight={this.state.imgHeight}
            link={() => link(this.state.jumpPage)}
            handleClose={() => this.handleClose()}
            isModalFlag={this.state.isModalFlag}
            isFull={this.state.isFull}
          />
        </View>
      )
    ) : null;
  }

  async updateModalStatus(id) {
    const res = await fetchModal('seckillChannel');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'seckillChannel', popupId);
    if (flagParams && flagParams.imgUrl) {
      Image.getSize(
        flagParams.imgUrl,
        (width, height) => {
          // 用最大宽度280算img的最大的高度
          let imgHeight = Math.floor((280 / width) * height);
          this.setState({
            imgHeight: imgHeight > 400 ? 400 : imgHeight
          });
        },
        (error) => console.log(error)
      );
    }
    this.setState(
      {
        isModalFlag: flagParams.showFlag,
        imgUrl: flagParams.imgUrl,
        jumpPage:
          (flagParams.jumpPage && JSON.parse(flagParams.jumpPage)) || '',
        nextPopupId: flagParams.nextPopupId,
        isFull: flagParams.isFull
      },
      () => {
        if (this.state.nextPopupId && !this.state.isModalFlag) {
          this.isGo(this.state.nextPopupId);
        }
      }
    );
  }

  async isGo(id) {
    await this.updateModalStatus(id);
  }
  handleClose() {
    this.setState({ isModalFlag: false }, async () => {
      if (this.state.nextPopupId) {
        await this.updateModalStatus(this.state.nextPopupId);
      }
    });
  }
}

//==动态注入reducer===

import srcPagesFlashSaleMain from './reducers/main';

registerReducer({ srcPagesFlashSaleMain });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollBox: {
    flex: 1
  },
  blank: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgc: {
    width: '100%'
  },
  header: {},
});
