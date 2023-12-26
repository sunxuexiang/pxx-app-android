import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  PixelRatio,
  TouchableOpacity
} from 'react-native';

import { StoreProvider } from 'plume2';
import LinearGradient from 'react-native-linear-gradient';
import TopStatus from './components/top-status';
import InvoiceEdit from './components/invoice-items';
import AppStore from './store';
import Header from 'wmkit/header';
import * as Button from 'wmkit/button';
import { mainColor } from 'wmkit/styles/index';
const LongButton = Button.LongButton;

const CheckStateObject = {
  0: {
    iconName: require('./img/warning.png'),
    text: '资质审核中，您无法编辑审核中增票资质'
  },
  1: {
    iconName: require('./img/right.png'),
    text: '您的增票资质已通过审核，可正常使用'
  },
  2: {
    iconName: require('./img/wrong.png'),
    text: '您的增票资质未通过审核，请修改后重新提交'
  },
  3: {
    iconName: require('./img/warning.png'),
    text: '通过增票资质审核后您将可以开具增值税专用发票'
  }
};

@StoreProvider(AppStore, { debug: __DEV__ })
export default class UserInvoice extends React.Component {
  store;

  componentDidMount() {
    this.store.init();
  }

  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  render() {
    console.log(this.store,'v.store')
    const invoiceBean = this.store.state().get('invoice');
    const editStatus = this.store.state().get('editStatus');
    let checkState = invoiceBean.get('checkState');
    let rejectReason = invoiceBean.get('rejectReason');
    let invalidFlag = invoiceBean.get('invalidFlag');
    rejectReason = invalidFlag == 1 ? '作废' : rejectReason;

    let disabledFlag = false;
    let toEditFlag = false;
    if (!checkState && checkState !== 0) {
      checkState = 3;
    } else {
      if (checkState == 0) {
        //审核中
        disabledFlag = true;
      } else if ((checkState == 1 || checkState == 2) && !editStatus) {
        toEditFlag = true;
      }
    }

    return (
      <View style={styles.container}>
        <Header title="增票资质" />
        <ScrollView style={styles.container}>
          <TopStatus />
          <View style={styles.content}>
            <InvoiceEdit disableBtn={() => this._disableBtn()} />
          </View>
        </ScrollView>
        <View>
          <View style={styles.btnBox}>


          {checkState === 0 ? (
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
              <LinearGradient
                colors={['#D8D8D8', '#B3B3B3']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.botbtn}
              >
                <Text style={{ color: '#fff', fontSize: 14 }}>提交</Text>
              </LinearGradient>
            </TouchableOpacity>
        ) : toEditFlag || disabledFlag  ? (
          <TouchableOpacity onPress={() => this.store.toEditStatus()} activeOpacity={0.8}>
          <LinearGradient
            colors={[mainColor, mainColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.botbtn}
          >
            <Text style={{ color: '#fff', fontSize: 14 }}>编辑</Text>
          </LinearGradient>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.store.submitInvoice()} activeOpacity={0.8}>
          <LinearGradient
            colors={[mainColor, mainColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.botbtn}
          >
            <Text style={{ color: '#fff', fontSize: 14 }}>提交</Text>
          </LinearGradient>
        </TouchableOpacity>
        )}
          </View>
        </View>
      </View>
    );
  }

  /**
   * 禁用/启用 提交按钮
   * @private
   */
  _disableBtn = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    paddingLeft: 12,
    paddingRight: 12
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8
  },
  header: {
    backgroundColor: '#FFF6F0',
    minHeight: 44,
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
  btnBox: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb'
  },
  btn: {
    backgroundColor: '#3d85cc',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 16
  },
  botbtn: {
    borderRadius: 18,
    alignItems: 'center',
    justifyContent:'center',
    height:36
  }
});
