import { Relax } from 'plume2';
import React, { Component } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Const, FormSelect, noop } from 'wmkit';
import moment from 'moment';
import { mainColor } from '@/wmkit/styles';
import { DatePicker } from '@ant-design/react-native';

@Relax
export default class BookingDelivery extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const startDate=moment(new Date(date.getTime()+1*24*3600*1000)).format('YYYY-MM-DD');
    const endDate=moment(new Date(date.getTime()+5*24*3600*1000)).format('YYYY-MM-DD');
    this.state={
      startDate:startDate,
      endDate:endDate,
    };
  }
  static relaxProps = {
    orderConfirm: 'orderConfirm',
    onSelectBooking: noop,
    onSelectBookingDate: noop,
  }
  render(){
    const {storeId} = this.props;
    const {orderConfirm,onSelectBooking,onSelectBookingDate}=this.props.relaxProps;
    const {startDate,endDate} = this.state;
    let flag;
    let deliverWay;
    let bookingDate;
    if(orderConfirm && orderConfirm.size !=0){
      flag=orderConfirm.toJS().filter((v)=>(v.storeId==storeId))[0].bookingDeliveryFlag;
      deliverWay=orderConfirm.toJS().filter((f) => f.storeId == storeId)[0].deliverWay;
      bookingDate=orderConfirm.toJS().filter((f) => f.storeId == storeId)[0].bookingDate;
    }
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.delivery}
          activeOpacity={0.8}
        >
          <View style={styles.box}>
            <Text allowFontSacling={false} style={styles.title}>
              预约发货
            </Text>
            <Text allowFontScaling={false} style={styles.text}>
              只接受5天之内的预约发货
            </Text>
          </View>
          <Switch
            trackColor={{ true: mainColor }}
            thumbColor={flag ? 'fff' : '#eee'}
            value={flag}
            disabled={deliverWay != 1 && deliverWay != 4 }
            onValueChange={(e) => onSelectBooking(storeId, e)}
          />
        </TouchableOpacity>
        {flag && (
          <View style={styles.delivery}>
            <DatePicker
              mode="date"
              minDate={new Date(startDate)}
              maxDate={new Date(endDate)}
              value={bookingDate == '' ? null : new Date(bookingDate)}
              onChange={(date) => {
                onSelectBookingDate( storeId, moment(date).format(Const.DATE_FORMAT));
              }}
            >
              <FormSelect
                label="请选择发货时间"
                placeholder={bookingDate}
                itemStyle={{
                  borderBottomWidth: 0,
                  paddingVertical: 10,
                }}
                labelStyle={{ fontSize: 12 }}
                textStyle={{ fontSize: 12 }}
              />
            </DatePicker>
          </View>
        )}
      </View>
    );
  }

}


const styles=StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  rightContext: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  box: {
    flexDirection: 'column'
  },
  title: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 12
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)',
    marginTop: 4
  }
});