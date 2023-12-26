import React from 'react';
import { View } from 'react-native';
import { msg, Relax } from 'plume2';
import moment from 'moment';

import { Const } from 'wmkit/const';
import FormInput from 'wmkit/form/form-input';
import FormSelect from 'wmkit/form/form-select';
import { noop } from 'wmkit/noop';


@Relax
export default class LogisticsForm extends React.Component {
  static relaxProps = {
    changeForm: noop,
    chooseCompany: noop,
    form: 'form'
  };

  render() {
    const { form } = this.props.relaxProps;
    const time = form.get('time');

    return (
      <View>
        <FormSelect
          label="物流公司"
          placeholder="请选择物流公司"
          selected={{ key: 0, value: form.get('expressName') }}
          onPress={() => this.chooseCompany()}
          itemStyle={{borderBottomWidth: 0, paddingHorizontal: 12}}
        />
        <FormInput
          autoFocus={window.keyBoardShow}
          label="物流单号"
          placeholder="点此输入物流单号"
          maxLength={50}
          defaultValue={form.get('logisticsNo')}
          onChange={(text) => this.handleInput(text)}
          rightTextInputStyle={{textAlign: 'right', paddingHorizontal: 3}}
          itemStyle={{borderBottomWidth: 0, paddingHorizontal: 12}}
        />
        <FormSelect
          label="发货时间"
          placeholder={'请选择发货时间'}
          selected={{ key: 1, value: form.get('formatTime') }}
          onPress={() => {
            const nowDate = new Date();
            const date = (time && moment(time).toDate()) || nowDate;
            msg.emit('datePicker:show', {
              date: date,
              maxDate: nowDate,
              confirm: this.handleDateChange
            });
          }}
          itemStyle={{borderBottomWidth: 0, paddingHorizontal: 12}}
        />
      </View>
    );
  }

  /**
   * 日期确认按钮回调
   * @param date
   */
  handleDateChange = (date) => {
    this.props.relaxProps.changeForm({
      time: date.getTime(),
      formatTime: moment(date).format(Const.DATE_FORMAT)
    });
  };

  handleInput = (v) => {
    this.setState({ logisticsNo: v });
    this.props.relaxProps.changeForm({ logisticsNo: v });
  };

  chooseCompany = () => {
    this.props.relaxProps.chooseCompany();
  };
}
