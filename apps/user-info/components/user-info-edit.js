/**
 * Created by hht on 2017/9/8.
 */

import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Relax } from 'plume2';
import moment from 'moment';
import { AreaPicker, Const, FindArea, FormSelect, noop } from 'wmkit';
import { DatePicker, List, Picker, Provider } from '@ant-design/react-native';
import options from 'wmkit/area/address-option';
@Relax
export default class UserInfoEdit extends React.Component {
  static relaxProps = {
    userInfo: 'userInfo',
    setUserInfo: noop,
    updateUserInfo: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { userInfo, setUserInfo } = this.props.relaxProps;
    let provinceId = userInfo.get('provinceId');
    let cityId = userInfo.get('cityId');
    let areaId = userInfo.get('areaId');
    //拼接省市区
    let area = provinceId
      ? cityId
        ? [provinceId.toString(), cityId.toString(), areaId.toString()]
        : [provinceId.toString()]
      : null;
    //拼接省市区名字
    let areaName = FindArea.addressInfo(provinceId, cityId, areaId);
    let genderName =
      userInfo.get('gender') == 0
        ? '女'
        : userInfo.get('gender') == 1
        ? '男'
        : '暂时保密';
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
              <View style={styles.item1}>
                <Text>头像</Text>
                <Image
                  style={styles.avatar}
                  source={
                    userInfo.get('headImg')
                      ? { uri: userInfo.get('headImg') }
                      : require('wmkit/theme/beluga.png')
                  }
                />
              </View>

              <View style={styles.item}>
                <View style={styles.items}>
                  <Text allowFontScaling={false} style={styles.label}>
                    昵称
                  </Text>
                  <TextInput
                    autoFocus={window.keyBoardShow}
                    style={styles.input}
                    placeholder="请输入名称"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#999"
                    defaultValue={userInfo.get('customerName')}
                    onChangeText={(text) => setUserInfo('customerName', text)}
                    maxLength={15}
                  />
                </View>

                <List>
                  <Picker
                    data={[
                      { value: 0, label: '女' },
                      { value: 1, label: '男' },
                      { value: 2, label: '暂时保密' }
                    ]}
                    cols={1}
                    title=""
                    ref={(ref) => (this.areaPicker = ref)}
                    value={userInfo.get('gender') ? userInfo.get('gender') : null}
                    title=''
                    onChange={(val) => setUserInfo('gender', val)}
                  >
                    <FormSelect
                      label="性别"
                      placeholder={`${genderName ? genderName : '暂时保密'}`}
                      textStyle={genderName != '暂时保密' ? {color: 'rgba(0,0,0,0.8)'} : null}
                    />
                  </Picker>
                </List>

                <List>
                  <DatePicker
                    mode="date"
                    minDate={new Date('1900-01-01')}
                    maxDate={new Date()}
                    ref={(ref) => (this.areaPicker = ref)}
                    value={userInfo.get('birthDay') ? new Date(userInfo.get('birthDay')) : null}
                    onChange={(date) => {
                      setUserInfo('birthDay', moment(date).format(Const.DATE_FORMAT));
                    }
                    }
                    extra={userInfo.get('birthDay') ? new Date(userInfo.get('birthDay')) : '暂时保密'}
                  >
                    <FormSelect
                      label="生日"
                      placeholder={`${userInfo.get('birthDay') ? userInfo.get('birthDay') : '暂时保密'}`}
                      textStyle={userInfo.get('birthDay') ? {color: 'rgba(0,0,0,0.8)'} : null}
                    />
                  </DatePicker>
                </List>
              </View>
              <View style={styles.item}>
                <List>
                  <View style={{borderBottomWidth:1}}>
                  <Picker
                    // style={{height: screenHeight/3}}
                    format={(values) => {
                      return values.join('/');
                    }}
                    data={options}
                    title="选择地址"
                    // itemStyle={{height: screenHeight/3}}
                    onChange={(val) => setUserInfo('area', val)}
                    value={area}
                  >
                    <FormSelect
                      label="所在地区"
                      placeholder={`${areaName ? areaName : '请选择所在地区'}`}
                      itemStyle={{ borderWidth: 0 }}
                      textStyle={areaName != '请选择所在地区' ? {color: 'rgba(0,0,0,0.8)'} : null}
                    />
                  </Picker>
                  </View>
                </List>
                {/* <AreaPicker
                  ref={(ref) => (this.areaPicker = ref)}
                  value={area}
                  title={'选择地址'}
                  onChange={(val) => setUserInfo('area', val)}
                >
                  <FormSelect
                    label="所在地区"
                    placeholder={`${areaName ? areaName : '请选择所在地区'}`}
                    itemStyle={{ borderWidth: 0 }}
                    textStyle={areaName != '请选择所在地区' ? {color: 'rgba(0,0,0,0.8)'} : null}
                  />
                </AreaPicker> */}
                <View style={styles.items}>
                  <Text allowFontScaling={false} style={styles.label}>
                    详细地址
                  </Text>
                  <TextInput
                    autoFocus={window.keyBoardShow}
                    style={styles.input}
                    placeholder="请输入详细地址"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#999"
                    defaultValue={userInfo.get('customerAddress')}
                    onChangeText={(text) => setUserInfo('customerAddress', text)}
                    maxLength={60}
                  />
                </View>
              </View>
              <View style={styles.item}>
              <List>
                <View style={styles.items}>
                  <Text allowFontScaling={false} style={styles.label}>
                    联系人
                  </Text>
                  <TextInput
                    autoFocus={window.keyBoardShow}
                    style={styles.input}
                    placeholder="请输入联系人姓名"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#999"
                    defaultValue={userInfo.get('contactName')}
                    onChangeText={(text) => setUserInfo('contactName', text)}
                    maxLength={15}
                  />
                </View>
                </List>
                <List>
                <View style={styles.items}>
                  <Text allowFontScaling={false} style={styles.label}>
                    联系人电话
                  </Text>
                  <TextInput
                    autoFocus={window.keyBoardShow}
                    style={styles.input}
                    placeholder="请输入联系方式"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#999"
                    defaultValue={userInfo.get('contactPhone')}
                    onChangeText={(text) => setUserInfo('contactPhone', text)}
                    maxLength={11}
                    keyboardType="numeric"
                  />
                </View>
              </List>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5'
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12  ,
    borderBottomWidth: 1 ,
    borderBottomColor: '#ebebeb',
  },
  item1: {
    marginTop: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
  },
  item: {
    marginTop: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff'
  },
  input: {},

  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12
  },
  input: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    textAlign: 'right',
    flex: 1
  },
  avatar: {
    marginRight: 8,
    width: 52,
    height: 52,
    borderRadius: 25,
    borderColor: '#ebebeb',
    borderWidth: StyleSheet.hairlineWidth
  }
});
