import { Relax } from 'plume2';
import React, { Component } from 'react';
import { noop, Header } from 'wmkit';
import * as _ from 'wmkit/common/util';
import { isAndroid } from 'wmkit/styles/index';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, PixelRatio, TouchableWithoutFeedback } from 'react-native';
import Search from './search';
import { screenHeight } from '@/wmkit/styles';
import Loading from 'wmkit/loading';
import { screenWidth } from 'wmkit/styles/index';

@Relax
export default class SearchModal extends Component {
  static relaxProps = {
    changeFieldValue: noop,
    companyList: 'companyList',
    isAddPersonalSite: 'isAddPersonalSite',
    selectedItem: 'selectedItem',
    searchKey: 'searchKey',
    loading: 'loading',
    pageCurrent: 'pageCurrent',
    changePageCurrent: noop,
    newList: 'newList',
  }
  render(){
    const {companyList, changeFieldValue, isAddPersonalSite, selectedItem, searchKey, loading,newList} = this.props.relaxProps;
    return(
      <View style={styles.mask}>
        <Header title="选择物流公司" />
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText} allowFontScaling={false}>物流公司</Text>
          </View>
          <Search searchKey={searchKey} selectedItem={selectedItem}/>
          <ScrollView 
            style={{ maxHeight: screenHeight - 160 - (_.isIphoneX() ? 80 : 60)}} 
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={this._handlePagination}
          >
            {loading && <Loading />}
            {!loading && companyList && companyList.size > 0 ? (
              newList.toJS().map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    style={styles.info}
                    onPress={() => {
                      if (isAddPersonalSite) {
                        return;
                      }
                      changeFieldValue({ field: 'selectedItem', value: item });
                      changeFieldValue({ field: 'searchKey', value: (item.logisticsName || '') + (item.logisticsPhone || '') });
                      changeFieldValue({ field: 'showSearchModal', value: false });
                    }}
                  >
                    <View style={styles.item}>
                      <Text style={styles.text} allowFontScaling={false}>{`${item.logisticsName ||
                        ''} ${item.logisticsPhone || ''}`}</Text>
                      {item.id !== "default" && <Text style={styles.text} allowFontScaling={false} numberOfLines={1}>
                        {item.logisticsAddress || ''}
                      </Text>}
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : null}
          </ScrollView>
        </View>
        <View style={styles.shadowTouchable}>
          <TouchableWithoutFeedback onPress={() => changeFieldValue({ field: 'showSearchModal', value: false })}>
            <View style={styles.shadowTouchable} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  _handlePagination=()=>{
    const {pageCurrent,changePageCurrent} = this.props.relaxProps;
    const nextPageCurrent = pageCurrent + 1;
    changePageCurrent(nextPageCurrent)
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    height: '100%',
    zIndex: 99
  },
  shadowTouchable: {
    flex: 1,
    height: '100%'
  },
  container: {
    maxHeight: '100%',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff'
  },
  title: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: '500'
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#e6e6e6',
  },
  item: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 12
  },
  text: {
    lineHeight: 16,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  img: {
    width: 16,
    height: 16,
  },
});
