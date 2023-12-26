import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View, Image, TouchableOpacity, TextInput, Platform,
} from 'react-native';
import { Relax } from 'plume2';
import * as _ from 'wmkit/common/util';
import { screenHeight, screenWidth } from 'wmkit/styles';
import { MapView } from 'react-native-baidu-map';
import { AreaPicker, FindArea, noop } from 'wmkit';
import Marker from 'react-native-baidu-map/js/Overlay/Marker';
import WMEmpty from 'wmkit/empty';
import options from 'wmkit/area/address-option';
import { Picker } from '@ant-design/react-native';
@Relax
export default class Map extends React.Component {

  static relaxProps = {
    setKeyWord: noop,
    goSearch: noop,
    keyWord: 'keyWord',
    chooseAddress: noop,
    zoomControlsVisible: 'zoomControlsVisible',
    trafficEnabled: 'trafficEnabled',
    baiduHeatMapEnabled: 'baiduHeatMapEnabled',
    mapType: 'mapType',
    zoom: 'zoom',
    center: 'center',
    markers: 'markers',
    aroundAddressList: 'aroundAddressList',
    reloadMap: noop,
    getAroundAddress: noop,
    changeArea: noop,
    provinceId: 'provinceId',
    cityId: 'cityId',
    areaId: 'areaId',
  };

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    let { setKeyWord, goSearch,keyWord,chooseAddress,zoomControlsVisible
    ,mapType,zoom,center,reloadMap,aroundAddressList,getAroundAddress,changeArea,provinceId,cityId,areaId}=this.props.relaxProps;
    center = center.toJS();

    //拼接省市区
    let area = provinceId
      ? cityId
        ? areaId
          ? [provinceId.toString(), cityId.toString(), areaId.toString()]
          : [provinceId.toString(), cityId.toString()]
        : [provinceId.toString()]
      : null;
    //拼接省市区名字
    let areaName = FindArea.addressInfo(provinceId, cityId, areaId);

    return (
      <View style={styles.container}>
        <View style={styles.mapSearch}>
          <Picker
            format={(values) => {
              return values.join('/');
            }}
            data={options}
            title="选择地区"
            // itemStyle={{height: screenHeight/3}}
            onChange={(val) => changeArea(val)}
            value={area}
          >
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text} allowFontScaling={false} numberOfLines={1}>
                {areaName}
              </Text>
              <Image style={styles.img} source={require('../img/down.png')} />
            </TouchableOpacity>
          </Picker>
          {/* <AreaPicker
            ref={(ref) => (this.areaPicker = ref)}
            value={area}
            title={'选择地址'}
            onChange={(val) => changeArea(val)}
          >
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text} allowFontScaling={false} numberOfLines={1}>
                {areaName}
              </Text>
              <Image style={styles.img} source={require('../img/down.png')} />
            </TouchableOpacity>
          </AreaPicker> */}
          <Image style={styles.searchIcon} source={require('../img/search.png')}/>
          <View style={{ marginLeft: -10}}>
            <TextInput
              placeholder={'请输入地址'}
              style={styles.mapKeyWord}
              value={keyWord}
              onChangeText={(e)=>setKeyWord(e)}
              onSubmitEditing={goSearch}
              clearButtonMode="while-editing"
              underlineColorAndroid="transparent"
              placeholderTextColor="#939495"/>
          </View>
          <View style={{marginLeft: 5}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>goSearch()}>
              <Text allowFontScaling={false}>搜索</Text>
            </TouchableOpacity>
          </View>
        </View>
      {/*<Text>{JSON.stringify(center)}</Text>*/}
        <MapView
          zoomControlsVisible={zoomControlsVisible} //默认true,是否显示缩放控件,仅支持android
          mapType={mapType} //地图模式,NORMAL普通 SATELLITE卫星图
          zoom={zoom} //缩放等级,默认为10
          center={center} // 地图中心位置

          onMapLoaded={() => { //地图加载事件
            reloadMap(center);
            getAroundAddress(center);
          }}
          onMapStatusChangeFinish={(data)=>{
            if( data.target.longitude > 0 && data.target.latitude > 0){
              if( _.positionFloor(data.target.longitude) != _.positionFloor(center.longitude) ||
                _.positionFloor(data.target.latitude) != _.positionFloor(center.latitude)
              ){
                reloadMap(data.target);
                getAroundAddress(data.target);
              }
            }
          }}
          style={styles.map}
        >
          <Marker
            location={center}
          />
        </MapView>
        <ScrollView style={styles.result}>
          {aroundAddressList && aroundAddressList.size > 0 ? aroundAddressList.toJS().map((v,key)=>(
            <View style={styles.resultItem} key={key} >
              <TouchableOpacity activeOpacity={0.8}
                                onPress={()=>chooseAddress(v)}>
                <View style={styles.resultName}>
                  <Text>{v.name}</Text>
                  <Text style={styles.address}>{v.distance}米</Text>
                </View>
                <View>
                  <Text style={styles.address}>{v.addr}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )) :
          <WMEmpty
            imgStyle={{ width: 104, height: 104 }}
            tipStyle={{ color: 'rgba(0,0,0,0.8)', fontSize: 14 }}
            emptyImg={require('../img/none.png')}
            desc="暂未定位到任何地址哦~"
          />
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  map: {
    width: screenWidth,
    height: screenHeight * 0.4,
    marginBottom: 5,
  },
  result: {
    width: screenWidth,
    margin:0,
  },
  resultItem: {
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  resultName:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  address: {
    color: '#999',
  },
  mapSearch: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  img:{
    width: 15,
    height: 15,
  },
  searchIcon: {
    width: 15,
    height: 15,
    // position: 'absolute',
    // top: 15,
    left: 15,
  },
  text: {
    width: screenWidth * 0.3,
  },
  mapKeyWord:{
    width: screenWidth * 0.5,
    borderRadius: 25,
    color: '#3d4145',
    paddingVertical: 0,
    paddingHorizontal: 15,
    borderColor: '#b4b4b4',
    borderWidth: 1,
    paddingLeft: 30,
  }

});
