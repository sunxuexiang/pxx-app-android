/**
 * ListView
 */
import React from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  Keyboard,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';
import Fetch from '../fetch';
import { throttle } from 'lodash';
import noop from '../noop';
import NoMore from './no-more';
import Loading from '../loading';
import * as WMkit from 'wmkit/kit';

import { fromJS, is } from 'immutable';
import { WMRecommendList } from '@/wmkit';
import { screenHeight} from 'wmkit/styles/index';
import { config } from 'wmkit/config';
import {isAndroid} from "@/wmkit/styles";

const toTop = require('wmkit/theme/isTop.png');

/**
 * 列表组件
 */
const styles = StyleSheet.create({
  bigBox: {
    position: 'absolute',
    bottom: 110,
    right: 15,
    zIndex: 100
  }
});
export default class WmListView extends React.PureComponent {
  //当前的pageNum
  _pageNum;
  //大分页的pageNum
  _chunkPageNum;
  //当前是不是正在获取更多的数据
  _isLoadingMore;
  // 总页数
  _totalPages;

  static defaultProps = {
    //请求的url
    url: '',
    // 从返回对象中取数据的属性,避免在公共组件中写死这种代码context.esGoodsInfoPage.content
    dataPropsName: '',
    totalPageName: '',
    //样式
    style: {},
    columnWrapperStyle: {},
    //http参数
    params: {},
    //默认当前页
    pageNum: 0,
    //默认每页展示的数量
    pageSize: 10,
    //默认排序
    sortFlag: 0,
    //当前的数据
    dataSource: [],
    //是否分页
    isPagination: true,
    //显示头部
    renderHeader: null,
    //展示每列
    renderRow: null,
    //展示页脚
    renderFooter: null,
    //显示空
    renderEmpty: null,
    //收到数据后的回调
    onDataReached: noop,
    //row数据中的主键，用于生成行key
    keyProps: 'id',
    //多余的参数，state等变量
    extraData: {},
    //每行的列数
    numColumns: 1,
    //组装item需要的其他参数，和content平级的返回值
    otherProps: [],
    //是否获取系统时间，默认否，有倒计时存在时，不同页的系统时间应当是不一样的
    getServerTime: false,
    //行高
    // lineHeight:121
    // 是否需要下拉刷新
    needRefresh: true,
    // 是否展示推荐
    showRecommendFlag: false,
    //是否需要返回顶部
    needToTop: false,
    //强制刷新
    forceRefresh: false,
    //内容最底部的距离为当前列表可见长度的20%时触发
    endReachedThreshold: 0.2
  };

  constructor(props) {
    super(props);

    const { pageNum, dataSource, showRecommendFlag } = this.props;
    this._pageNum = pageNum;
    this._isLoadingMore = false;
    this._chunkPageNum = 1;
    this.otherPropsObject = {};

    this.state = {
      isRefreshing: false, //控制下拉刷新
      //是不是正在初始化
      isFirstLoading: true,
      //当前的数据源
      dataSource: dataSource || [],
      //数据到底
      noMore: false,
      //服务时间
      serverTime: 0,
      showRecommendFlag: showRecommendFlag,
      pageIndex: 0,
      animatedValue: 0,
      isHide: false,
      isShowTop: false
    };
    this._handlePagination = this._handlePagination.bind(this);
  }

  componentDidMount() {
    this._init();
    if (this.props.toRefresh) {
      this.props.toRefresh(this._init);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!is(fromJS(nextProps.params), fromJS(this.props.params))) {
      this._init(nextProps);
      // this.refs.listRef.scrollToItem({index:0,viewPosition:0});
      // this.listRef.scrollToOffset({ animated: false, offset: 0 });
    } else if (nextProps.dataSource && nextProps.dataSource.length > 0) {
      this.setState({
        dataSource: nextProps.dataSource,
        noMore: true
      });
    } else if (
      this.props.needRefresh !== nextProps.needRefresh &&
      nextProps.needRefresh
    ) {
      this._init(nextProps);
    } else if (nextProps.forceRefresh) {
      this._init(nextProps);
    }
  }

  _startY = 0;
  _firstToBottom = true; //默认第一次已经滚动到底部
  onDragStart = (event) => {
    this._startY = event.nativeEvent.contentOffset.y;
  }
  onDragEnd = (event) => {
    const diffY = event.nativeEvent.contentOffset.y - this._startY;
    const {_next} = this.props;
    const offsetY = event.nativeEvent.contentOffset.y;
    const offsetX = event.nativeEvent.contentOffset.x;
    if(offsetX < offsetY) {
      // 手指从下向上滑--类似翻下一页
      if (_next && diffY > 0) {
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;
        const scrollHeight = isAndroid? layoutHeight + offsetY : diffY + layoutHeight + offsetY;
        // 兼容代码
        if(isAndroid){
          if(scrollHeight < contentHeight && this._firstToBottom && this._totalPages > 0) {
            this._firstToBottom = false;
            return;
          }
          // 是否达到切换分类的临界点
          const canChange = parseInt(scrollHeight) >= parseInt(contentHeight);
          if(((this._totalPages > 0 && this._pageNum === this._totalPages - 1 && !this._firstToBottom) || this._totalPages === 0) && canChange) {
            _next();
          }
        }else{
          // IOS
          if(scrollHeight > contentHeight && this._firstToBottom && this._totalPages > 0) {
            this._firstToBottom = false;
            return;
          }
          // 是否达到切换分类的临界点
          const canChange = scrollHeight > contentHeight + 100;
          if(((this._totalPages > 0 && this._pageNum === this._totalPages - 1 && !this._firstToBottom) || this._totalPages === 0) && canChange) {
            _next();
          }
        }
      }
    }
  }

  onScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (
      this.props._changeIsShowTop &&
      !this.props.isShowTop &&
      event.nativeEvent.contentOffset.y > screenHeight / 2
    ) {
      this.props._changeIsShowTop(true);
    } else if (
      this.props._changeIsShowTop &&
      this.props.isShowTop &&
      event.nativeEvent.contentOffset.y < screenHeight / 2
    ) {
      this.props._changeIsShowTop(false);
    }
    if(this.props._changeIsShowTop) {
      this.setState({isShowTop: offsetY > screenHeight})
    }
  };

  render() {
    const {
      numColumns,
      horizontal,
      columnWrapperStyle,
      renderHeader,
      renderRow,
      renderEmpty,
      pageSize,
      keyProps,
      extraData,
      style,
      needRefresh,
      loadingStyle,
      isShowLoading,
      needToTop,
      endReachedThreshold
    } = this.props;

    if (this.state.isFirstLoading) {
      return <View style={loadingStyle}>{isShowLoading && <Loading />}</View>;
    } else {
      this.props.loadingStatus && this.props.loadingStatus(false);
    }

    //提高滚动流畅度
    // if (document.body.style.overflowY != 'hidden') {
    //   document.body.style.overflowY = 'hidden';
    // }

    //如果数据为空
    let { dataSource, otherPropsObject } = this.state;
    if (extraData.toRefresh) {
      // extraData.toRefresh为true，setState后，触发render，如此反复，最终卡机
      // this._init();
    }

    let columnProps = { numColumns: numColumns };
    if (numColumns > 1) {
      columnProps.columnWrapperStyle = columnWrapperStyle;
    }

    //如果数据不为空
    return (
      <>
        <Animated.FlatList
          style={style}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          data={dataSource}
          renderItem={({ item, index }) =>
            renderRow(
              item,
              extraData,
              index,
              otherPropsObject,
              this.state.serverTime
            )
          }
          keyExtractor={(item) => {
            return Math.random().toString();
            // return item[keyProps] + '';
          }}
          horizontal={horizontal}
          numColumns={numColumns}
          initialNumToRender={pageSize}
          showsVerticalScrollIndicator={false}
          //0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
          onEndReachedThreshold={endReachedThreshold}
          onEndReached={this.testThrottle.bind(this)}
          ListFooterComponent={() => this._renderFooter()}
          ListHeaderComponent={renderHeader && renderHeader()}
          ListEmptyComponent={
            !this.state.isFirstLoading &&
            renderEmpty &&
            renderEmpty()
          }
          extraData={extraData}
          // getItemLayout={(data, index) => ( {length: lineHeight, offset: lineHeight * index, index} )}
          {...columnProps}
          refreshControl={
            needRefresh || this.props._last ? (
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this._onRefresh()}
              />
            ) : null
          }
          windowSize={300} //解决快速滑动 出现白屏问题  https://www.jianshu.com/p/656a8e7e489e
          onScrollBeginDrag={()=>{
            Keyboard.dismiss();
            this.onDragStart.bind(this)
          }}
          onScrollEndDrag={this.onDragEnd.bind(this)}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.state.animatedValue }
                }
              }
            ],
            { listener: this.onScroll.bind(this), useNativeDriver: true }
          )}
        />
        {needToTop && this.state.isShowTop && (
          <TouchableOpacity
            style={styles.bigBox}
            onPress={() => {
              // this.setState({ isShowTop: false });
              this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
            }}
          >
            <Image source={toTop} style={{ width: 60, height: 60 }}></Image>
          </TouchableOpacity>
        )}
      </>
    );
  }

  /**
   * 初始化数据
   */
  _init = async (props) => {
    //之前设置为true 禁止加载数据的锁解开
    this._isLoadingMore = true;
    this._firstToBottom = true;
    this.setState({
      noMore: false,
      refreshing: true,
      dataSource: []
    });
    this._pageNum = 0;
    await this._getServerTime();
    props = props || this.props;
    const { url, otherProps } = props;

    //如果url不为空，fetch去访问
    if (url != '') {
      const res = await Fetch(url, {
        method: 'POST',
        body: JSON.stringify(this._getParams(props))
      });

      const context = res.context;
      let dataList;
      if(this.props.totalPageName) {
        this._totalPages = res;
        const propNmArr = this.props.totalPageName.split('.');
        propNmArr.forEach((propNm) => {
          this._totalPages = this._totalPages ? this._totalPages[propNm] : 0;
        });
      }
      if (this.props.dataPropsName) {
        // dataPropsName若存在,则遍历属性名取嵌套的数据
        dataList = res;
        const propNmArr = this.props.dataPropsName.split('.');
        propNmArr.forEach((propNm) => {
          dataList = dataList ? dataList[propNm] : [];
        });
      } else {
        // dataPropsName若不存在,按照原有方式取值,兼容老接口
        dataList =
          (context &&
            ((context.esGoodsInfoPage && context.esGoodsInfoPage.content) ||
              context.content ||
              (context.goodsInfos && context.goodsInfos.content) ||
              (context.couponViews && context.couponViews.content) ||
              (context.esGoodsInfoResponse &&
                context.esGoodsInfoResponse.esGoodsInfoPage.content) ||
              (context.couponCodeVos && context.couponCodeVos.content) ||
              (context.grouponCenterVOList &&
                context.grouponCenterVOList.content) ||
              (context.pointsGoodsVOPage &&
                context.pointsGoodsVOPage.content) ||
              (context.pointsCouponVOPage &&
                context.pointsCouponVOPage.content) ||
              (context.videoManagementVOPage &&
                context.videoManagementVOPage.content))) ||
          [];
      }

      let otherPropsObject = {};
      if (otherProps && otherProps.length > 0 && context) {
        otherProps.forEach((item) => {
          let propTmp = context;
          const itemPropArr = item.split('.');
          itemPropArr.forEach((propNm) => {
            propTmp = propTmp[propNm];
          });
          otherPropsObject[item] = propTmp || {};
        });
      }

      this._isLoadingMore = false;
      dataList = dataList?.map((data) => {
        data._otherProps = otherPropsObject;
        return data;
      });
      this.setState(
        {
          isFirstLoading: false,
          refreshing: false,
          dataSource: dataList,
          noMore: dataList?.length < this.props.pageSize,
          otherPropsObject: otherPropsObject
        },
        () => {
          //通知父组件数据
          props.onDataReached && props.onDataReached(res);
        }
      );
    } else {
      this.setState({
        isFirstLoading: false,
        refreshing: false,
        noMore: this.props.dataSource.length < this.props.pageSize
      });
    }
  };
  testThrottle = throttle(
    function () {
      this._handlePagination();
    },
    1000,
    {
      leading: true,
      trailing: false
    }
  );
  _handlePagination = async () => {
    const { showNoMore } = this.props;
    if ((this.state.noMore || showNoMore) && this.state.dataSource.length > 0) {
      return;
    }

    //防止重复获取数据
    if (this._isLoadingMore) {
      return this.state.noMore && this._onMomentumScrollEnd();
    }
    if (!this.props.isPagination) {
      return;
    }
    this.props.nextPageLoading && this.props.nextPageLoading(true);

    this._isLoadingMore = true;
    this._pageNum++;

    const { url, otherProps } = this.props;

    const res = await Fetch(url, {
      method: 'POST',
      body: JSON.stringify(this._getParams())
    });
    if(res.code == config.SUCCESS_CODE) {
      const context = res.context;
      let dataList;
      if (this.props.dataPropsName) {
        // dataPropsName若存在,则遍历属性名取嵌套的数据
        dataList = res;
        const propNmArr = this.props.dataPropsName.split('.');
        propNmArr.forEach((propNm) => {
          dataList = dataList ? dataList[propNm] : [];
        });
      } else {
        // dataPropsName若不存在,按照原有方式取值,兼容老接口
        dataList =
          (context &&
            ((context.esGoodsInfoPage && context.esGoodsInfoPage.content) ||
              context.content ||
              (context.goodsInfos && context.goodsInfos.content) ||
              (context.couponViews && context.couponViews.content) ||
              (context.esGoodsInfoResponse &&
                context.esGoodsInfoResponse.esGoodsInfoPage.content) ||
              (context.couponCodeVos && context.couponCodeVos.content) ||
              (context.grouponCenterVOList &&
                context.grouponCenterVOList.content) ||
              (context.pointsGoodsVOPage && context.pointsGoodsVOPage.content) ||
              (context.pointsCouponVOPage &&
                context.pointsCouponVOPage.content) ||
              (context.videoManagementVOPage &&
                context.videoManagementVOPage.content))) ||
          [];
      }

      let otherPropsObject = {};
      if (otherProps && otherProps.length > 0 && context) {
        otherProps.forEach((item) => {
          let propTmp = context;
          const itemPropArr = item.split('.');
          itemPropArr.forEach((propNm) => {
            propTmp = propTmp[propNm];
          });
          otherPropsObject[item] = propTmp || {};
        });
      }
      this.props.nextPageLoading && this.props.nextPageLoading(false);
      if (!res || dataList?.length == 0) {
        //show error
        this._pageNum--;
        this.setState({
          noMore: true
        });
        return;
      }

      this._isLoadingMore = false;
      dataList = dataList?.map((data) => {
        data._otherProps = otherPropsObject;
        return data;
      });
      this.setState(
        (state) => ({
          dataSource: state.dataSource.concat(dataList),
          noMore: dataList?.length < this.props.pageSize,
          otherPropsObject: fromJS(state.otherPropsObject)
            .mergeDeep(fromJS(otherPropsObject))
            .toJS()
        }),
        () => {
          this.props.onDataReached && this.props.onDataReached(res);
        }
      );
    }
  };

  /**
   * 获取参数
   */
  _getParams(props) {
    const { pageSize, params } = props || this.props;

    return {
      ...params,
      pageNum: this._pageNum,
      pageSize
    };
  }

  // 触发 - 热门推荐商品 - 坑位翻页0、10、20。。。
  _onMomentumScrollEnd = () => {
    this.setState(({ pageIndex }) => ({
      pageIndex: pageIndex + 10
    }));
  };

  /**
   * 没有更多了提示
   */
  _renderFooter = () => {
    const { showNoMore } = this.props;
    return (
      <View>
        {this.props.renderFooter ? this.props.renderFooter : null}
        {(this.state.noMore || showNoMore) && this.state.dataSource.length > 0
          ? [
              <NoMore
                noMoreStyle={this.props.noMoreStyle}
                text={'没有更多了'}
              />,
              this.props.showRecommendFlag && (
                <View style={{ paddingHorizontal: 12 }}>
                  <WMRecommendList type={'1'} />
                </View>
              )
            ]
          : null}
      </View>
    );
  };

  _onRefresh() {
    // 如果是三级类目页触发切页方法
    if (this.props._last) {
      this.props._last();
      return;
    }
    this._init(this.props);
  }

  /**
   *  获取系统时间
   * */
  _getServerTime = async () => {
    if (this.props.getServerTime) {
      //获取服务时间
      const serverTime = await WMkit.queryServerTime();
      this.setState({ serverTime: serverTime.context });
    }
  };
}
