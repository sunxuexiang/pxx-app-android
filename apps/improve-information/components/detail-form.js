/**
 * Created by feitingting on 2017/9/8.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DatePicker, Picker } from '@ant-design/react-native';
import { Relax } from 'plume2';

import * as FindArea from 'wmkit/area/area';
import { FormInput, noop, AreaPicker, FormSelect,Const } from 'wmkit';
import moment from 'moment'
@Relax
export default class DetailForm extends React.Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    customerDetail: 'customerDetail',
    initialName: 'initialName',
    checked: 'checked',
    getCompanyName: noop,
    getArea: noop,
    getAddressDetail: noop,
    getContact: noop,
    getContactTel: noop,
    getGender: noop,
    getBirthDay: noop
  };

  render() {
    const {
      customerDetail,
      initialName,
      checked,
      getCompanyName,
      getArea,
      getAddressDetail,
      getContact,
      getContactTel,
      getGender,
      getBirthDay
    } = this.props.relaxProps;
    const customer = customerDetail.toJS();
    let provinceId = customer.provinceId;
    let cityId = customer.cityId;
    let areaId = customer.areaId;
    //拼接省市区
    let area = provinceId
      ? cityId
        ? [provinceId.toString(), cityId.toString(), areaId.toString()]
        : [provinceId.toString()]
      : null;
    //拼接省市区名字
    let areaName = FindArea.addressInfo(provinceId, cityId, areaId);
    let genderName =
      customer.gender === 0
        ? '女'
        : customer.gender === 1
        ? '男'
        : '请选择';
    return checked == 2 || (checked == 0 && initialName == '') ? (
      <View style={styles.container}>
        <FormInput
          autoFocus={window.keyBoardShow}
          label="称呼"
          required
          placeholder="请填写您的称呼或您公司的名称"
          defaultValue={customer.customerName}
          onChange={(value) => getCompanyName(value)}
        />
        <DatePicker
          mode="date"
          minDate={new Date('1900-01-01')}
          maxDate={new Date()}
          value={customer.birthDay ? new Date(customer.birthDay) : null}
          onChange={(date) => {
            getBirthDay(moment(date).format(Const.DATE_FORMAT));
          }
          }
          extra={customer.birthDay ? new Date(customer.birthDay) : '暂时保密'}
        >
          <FormSelect
            label="生日"
            placeholder={`${customer.birthDay ? customer.birthDay : '暂时保密'}`}
          />
        </DatePicker>
        <Picker
          data={[
            { value: 1, label: '男' },
            { value: 0, label: '女' },
            { value: 2, label: '保密' }
          ]}
          cols={1}
          title=""
          value={customer.gender ? customer.gender : null}
          title=''
          onChange={(val) => getGender(val)}
        >
          <FormSelect
            label="性别"
            placeholder={`${genderName ? genderName : '暂时保密'}`}
          />
        </Picker>
        <AreaPicker
          ref={(ref) => (this.areaPicker = ref)}
          value={area}
          title={'选择地址'}
          onChange={(val) => getArea(val)}
        >
          <FormSelect
            label="所在地区"
            placeholder={`${areaName ? areaName : '请选择所在地区'}`}
          />
        </AreaPicker>
        <FormInput
          label="详细地址"
          placeholder="请填写您的详细地址"
          maxLength={60}
          defaultValue={customer.customerAddress}
          onChange={(value) => getAddressDetail(value)}
        />
        <FormInput
          label="联系人"
          required
          placeholder="请填写一位常用联系人"
          defaultValue={customer.contactName}
          onChange={(value) => getContact(value)}
        />
        <FormInput
          label="联系人电话"
          required
          placeholder="请填写联系人常用手机号"
          defaultValue={customer.contactPhone}
          maxLength={11}
          keyboardType="numeric"
          onChange={(value) => getContactTel(value)}
        />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
});