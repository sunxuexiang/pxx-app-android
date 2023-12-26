import React from 'react';
import {
  View,
  Text,
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { msg, Relax } from 'plume2';
import moment from 'moment';
import { Const } from 'wmkit/const';
import FormSelect from 'wmkit/form/form-select';
import FormInput from 'wmkit/form/form-input';
import { noop } from 'wmkit/noop';
import WMImage from 'wmkit/image/index';
import WmUpload from 'wmkit/upload';

@Relax
export default class Payment extends React.Component {
  static relaxProps = {
    form: 'form',
    chooseAccount: noop,
    changeForm: noop,
    changeRemark: noop,
    addImg: noop
  };

  render() {
    const { form, addImg } = this.props.relaxProps;
    const time = form.get('time');

    return (
      <View style={{paddingHorizontal:12,backgroundColor:'#fff'}}>
        {/*selected属性是为了placeholder回显*/}
        <FormSelect
          label="收款账号"
          placeholder="点击选择商家的收款账号"
          selected={{ key: 0, value: form.get('accountNm') }}
          onPress={() => this._chooseAccount()}
        />
        <FormSelect
          label="付款时间"
          placeholder={'点击选择付款时间'}
          selected={{ key: 1, value: form.get('formatTime') }}
          onPress={() => {
            const nowDate = new Date();
            const date = time || nowDate;
            msg.emit('datePicker:show', {
              date: date,
              maxDate: nowDate,
              confirm: this._handleDateChange
            });
          }}
        />
        <View style={styles.backItem}>
          <Text style={styles.backTitle} allowFontScaling={false}>附件</Text>
          <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
            {form.get('encloses') ? (
              <View>
                <WMImage zoom style={styles.image} src={form.get('encloses')} />
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => addImg('')}
                >
                  <Text allowFontScaling={false} style={styles.cha}>
                    ×
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <WmUpload onChange={(url) => this._uploadImage(url)} />
            )}
          </ScrollView>
          <Text style={styles.tips} allowFontScaling={false}>上传订单付款凭证，如汇款单等</Text>
          <Text style={styles.tips} allowFontScaling={false}>
            仅支持jpg、jpeg、png、gif文件，最多上传1张，大小不超过5M
          </Text>
        </View>
        <FormInput
          autoFocus={window.keyBoardShow}
          label="备注"
          placeholder="点此输入付款备注（100字以内）"
          maxLength={100}
          defaultValue={form.get('remark')}
          onChange={(text) => this._handleInput(text)}
        />
      </View>
    );
  }

  /**
   * 选择收款账户
   */
  _chooseAccount = () => {
    this.props.relaxProps.chooseAccount();
  };

  /**
   * 日期确认按钮回调
   * @param date
   */
  _handleDateChange = (date) => {
    this.props.relaxProps.changeForm({
      time: date,
      createTime: moment(date).format(Const.DATE_FORMAT),
      formatTime: moment(date).format(Const.DATE_FORMAT + ' 00:00:00')
    });
  };

  /**
   * 更改备注信息
   * @param v
   */
  _handleInput = (v) => {
    this.props.relaxProps.changeRemark(v);
  };

  /**
   * 图片上传方法 -- 付款单附件
   * @param loadResult
   * @param imageBase64
   * @private
   */
  _uploadImage = (url) => {
    if (url) {
      let { addImg } = this.props.relaxProps;
      addImg(url);
    }
  };
}

const styles = StyleSheet.create({
  tips: {
    color: '#333',
    fontSize: 14,
    marginTop: 5
  },
  close: {
    width: 13,
    height: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6.5,
    position: 'absolute',
    right: 2,
    top: 2
  },
  cha: {
    color: '#ffffff',
    fontSize: 12
  },
  backItem: {
    backgroundColor: '#ffffff',
    paddingVertical:15,
    // paddingHorizontal:35,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ebebeb'
  },
  backTitle: {
    color: '#333333',
    fontSize: 14,
    height: 30,
    // marginLeft:-35
  },
  image: {
    height: 55,
    width: 55,
    marginRight: 10,
    borderColor: '#ebebeb',
    borderWidth: 1 / PixelRatio.get()
  }
});
