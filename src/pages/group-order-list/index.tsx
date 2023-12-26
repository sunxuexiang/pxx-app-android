import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import WMGrouponFooter from 'wmkit/groupon-footer';
import WmListView from 'wmkit/list-view/index';
import Header from 'wmkit/header';
import WMEmpty from 'wmkit/empty';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';

import OrderItem from './components/OrderItem';
import { GrouponTradeVO } from '../../web-api/TradeBaseController';
import { link, fetchModal, setModalShow } from '../../../wmkit/adv-modal';

import ModalShow from '../../../wmkit/biz/modal-show';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class GroupOrderList extends React.Component<
  Partial<T.IProps>,
  any
> {
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
  UNSAFE_componentWillMount() {
    this.updateModalStatus('');
  }
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;
    const listViewProps = {
      loadingStyle:{marginTop:200},
      url: '/trade/page/groupons',
      params: {
        sticky: true
      },
      isPagination: true,
      renderRow: (order, extraData, index, otherPropsObject, serverTime) =>
        this._renderRow(order, index, serverTime),
      getServerTime: true,
      //刷新页面(存储方法体)
      toRefresh: (_init) => {
        action.toRefresh(_init);
      },
      onDataReached: () => {},
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('./img/list-none.png')}
          desc="您暂时还没有订单哦"
        />
      ),
      keyProps: 'id'
      //extraData: { toRefresh: main.toRefresh }
    };

    return (
      <View style={styles.index}>
        <Header title="我的拼购" />
        {/*<ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          iosautomaticallyAdjustContentInsets={false}
        >
          <View style={styles.content}>*/}
        <WmListView
          noMoreStyle={{ backgroundColor: '#f5f5f5' }}
          {...listViewProps}
        />
        {/* </View>
        </ScrollView>*/}

        <WMGrouponFooter currTab="我的拼购" />
        <ModalShow
          imgUrl={this.state.imgUrl}
          imgHeight={this.state.imgHeight}
          link={() => link(this.state.jumpPage)}
          handleClose={() => this.handleClose()}
          isModalFlag={this.state.isModalFlag}
          isFull={this.state.isFull}
        />
      </View>
    );
  }

  _renderRow = (order, index, serverTime) => {
    return <OrderItem item={order} key={index} serverTime={serverTime} />;
  };
  async updateModalStatus(id) {
    const res = await fetchModal('groupChannel');
    let popupId = '';
    if (!id && res && res.length > 0) {
      popupId = res[0].popupId;
    } else {
      popupId = id;
    }
    const flagParams = await setModalShow(res, 'groupChannel', popupId);
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

import groupOrderListMain from './reducers/main';
import * as WMkit from 'wmkit/kit';
import { screenWidth, screenHeight, mainColor } from 'wmkit/styles/index';

registerReducer({ groupOrderListMain });

const styles = StyleSheet.create({
  index: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    // paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    position: 'relative'
  },
  content: {
    padding: 12,
    backgroundColor: '#f5f5f5'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12
  }
});
