import { Relax } from 'plume2';
import React, { Component } from 'react';
import { noop } from 'wmkit';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, PixelRatio } from 'react-native';
import { mainColor } from 'wmkit/styles/index';

@Relax
export default class Search extends Component {
  static relaxProps = {
    changeFieldValue: noop,
    logisticscompany: noop,
    isAddPersonalSite: 'isAddPersonalSite',
    loading: 'loading'
  }
  state = {
    search: '',
    selected: null,
  };

  componentDidMount() {
    this.setState({
      search: this.props.searchKey,
      selected: this.props.selectedItem,
    });
  }

  render(){
    const { changeFieldValue, isAddPersonalSite, logisticscompany, loading} = this.props.relaxProps;
    const searchKey = this.state.search;
    const selectedItem = this.state.selected;

    return(
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.box, isAddPersonalSite ? {backgroundColor: '#f5f5f5'} : {}]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.imgBtn}
              onPress={() => {
                if(isAddPersonalSite || loading) {
                  return;
                }
                changeFieldValue({ field: 'loading', value: true })
                logisticscompany(searchKey);
              }}
            >
              <Image source={require('../img/search.png')} style={styles.img} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              editable={!isAddPersonalSite}
              placeholder={"请输入物流公司"}
              returnKeyType="search"
              value={searchKey}
              onChangeText={(value) => {
                this.setState({
                  search: value
                });
                //清除平台物流选中项
                if(!value){
                  this.setState({
                    search: '',
                    selected: null
                  });
                  changeFieldValue({ field: 'companyList', value: [] });
                } else {
                  logisticscompany(value);
                }
              }}
              onSubmitEditing={() => {
                if (loading) {
                  return;
                }
                changeFieldValue({ field: 'loading', value: true });
                logisticscompany(searchKey);
              }}
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(0,0,0,.4)"
            />
            {!!searchKey && <TouchableOpacity
              activeOpacity={0.8}
              style={styles.imgBtn}
              onPress={() => {
                this.setState({
                  search: '',
                  selected: null,
                });
                changeFieldValue({ field: 'companyList', value: [] });
              }}
            >
              <Image source={require('../img/clear.png')} style={styles.img} resizeMode="contain"/>
            </TouchableOpacity>}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={() => changeFieldValue({ field: 'showSearchModal', value: false })}
          >
            <Text
              style={styles.btnText}
              allowFontScaling={false}
            >
              取消
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectedBox}>
          <Text allowFontScaling={false} style={styles.selectedText} numberOfLines={2}>
            <Text allowFontScaling={false} style={[styles.selectedPoint, { color: mainColor }]}>
              已选择：
            </Text>
            {selectedItem && selectedItem.get('id') ? `${selectedItem.get('logisticsName') || ''} ${selectedItem.get('logisticsPhone') || ''} ${selectedItem.get('id') != 'default' && selectedItem.get('logisticsAddress') || ''}` : '暂未选择'}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    height: 40,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#e6e6e6',
    borderRadius: 6,
    overflow: 'hidden'
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 14
  },
  imgBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36
  },
  img: {
    width: 16,
    height: 16
  },
  btn: {
    marginLeft: 10
  },
  btnText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
  },
  selectedBox: {
    marginVertical: 12
  },
  selectedText: {
    lineHeight: 16,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.8)'
  },
  selectedPoint: {
    lineHeight: 16,
    fontSize: 12
  },
});
