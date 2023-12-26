import React from 'react';
import {
  Image,
  PixelRatio,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { msg, Relax } from 'plume2';
import WmModal from 'wmkit/modal/modal';
import * as Button from 'wmkit/button';
import { Confirm } from 'wmkit/modal/confirm';
import Header from 'wmkit/header';
import { noop } from 'wmkit/noop';
import Swipeout from 'react-native-swipeout';
import LinearGradient from 'react-native-linear-gradient';
import { Provider } from '@ant-design/react-native';
import { mainColor } from '@/wmkit/styles';

const LongButton = Button.LongButton;
@Relax
export default class EmailList extends React.Component {
  static relaxProps = {
    emailList: 'emailList',
    emailInfo: 'emailInfo',
    refreshState: 'refreshState',
    emailModelVisible: 'emailModelVisible',
    errorInfo: 'errorInfo',

    refresh: noop,
    getEmailCount: noop,
    checkParameter: noop,
    setParameter: noop,
    doSaveCustomerEmail: noop,
    deleteCustomerEmailById: noop,
    onShowModal: noop,
    onCancelModal: noop
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      emailList,
      emailInfo,
      errorInfo,
      refreshState,
      refresh,
      doSaveCustomerEmail,
      emailModelVisible,
      onCancelModal
    } = this.props.relaxProps;
    return (
      <View style={styles.container}>
        <Header title="财务邮箱" />
        <Provider>
          <ScrollView
            style={styles.emailContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshState}
                onRefresh={() => {
                  refresh();
                  msg.emit('email-list:refresh');
                  refresh();
                }}
              />
            }
          >
            {emailList.map((email) => {
              return this._renderRow(email);
            })}
          </ScrollView>
          <WmModal
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            visible={emailModelVisible}
            footer={[
              { text: '取消', onPress: () => onCancelModal() },
              { text: '确定', onPress: () => doSaveCustomerEmail() }
            ]}
          >
            <TextInput
              autoFocus={false}
              placeholder="输入邮箱账号"
              type="default"
              defaultValue={emailInfo.get('emailAddress')}
              maxLength={32}
              onChangeText={(val) => this._setEmailAddress(val)}
            />
            <Text style={{ textAlign: 'center', color: 'red' }}>
              {errorInfo}
            </Text>
          </WmModal>
        </Provider>
        <View style={styles.bottom}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgba(0,0,0,0.4)'
            }}
          >
            最多可添加5条财务邮箱
          </Text>
          <SafeAreaView style={styles.btnbox}>
            { (!emailList.length || emailList.length < 5) && (
              <TouchableOpacity
                onPress={() => this._addCustomerEmail()}
                style={styles.add}
              >
                <LinearGradient
                  colors={[mainColor, mainColor]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={[styles.buttonBox, { backgroundColor: mainColor }]}
                >
                  <Image
                    style={styles.img}
                    source={require('../img/add.png')}
                  />
                  <Text style={{ color: '#fff', fontSize: 14 }}>
                    新增财务邮箱
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            {/* <Image style={styles.img} source={require('../img/add.png')} /> */}
          </SafeAreaView>
        </View>
      </View>
    );
  }

  _renderRow = (item) => {
    return (
      <View style={styles.list} key={item.customerEmailId}>
        <Swipeout
          key={Math.random()}
          buttonWidth={68}
          right={[
            {
              text: '删除',
              onPress: async () => {
                await this._handleDelete(item.customerEmailId);
              },
              backgroundColor: mainColor
            }
          ]}
          backgroundColor="#fff"
          autoClose={true}
        >
          <View key={item.customerEmailId} style={styles.listItem}>
            <Text style={styles.content}>{item.emailAddress}</Text>
            <TouchableOpacity onPress={() => this._showConfirmModal(item)}>
              <Image style={styles.icon} source={require('../img/edits.png')} />
            </TouchableOpacity>
          </View>
        </Swipeout>
      </View>
    );
  };

  /**
   * 新增财务邮箱信息
   * @private
   */
  _addCustomerEmail = () => {
    const { getEmailCount } = this.props.relaxProps;
    const count = getEmailCount();
    if (count < 5) {
      const emailInfo = {
        customerEmailId: '',
        customerId: '',
        emailAddress: ''
      };
      this._showConfirmModal(emailInfo);
    } else {
      msg.emit('app:tip', '您最多可以添加5条财务邮箱信息');
    }
  };

  /**
   * 显示弹窗
   * @param emailInfo
   * @private
   */
  _showConfirmModal = (emailInfo) => {
    const { onShowModal } = this.props.relaxProps;
    onShowModal(emailInfo);
  };

  /**
   * 修改邮箱信息
   * @param value
   * @private
   */
  _setEmailAddress(value) {
    const { checkParameter, setParameter } = this.props.relaxProps;
    checkParameter(value);
    setParameter('emailAddress', value);
  }

  _handleDelete = (customerEmailId) => {
    const { deleteCustomerEmailById } = this.props.relaxProps;
    Confirm({
      title: '',
      text: '确定删除该财务邮箱信息吗？',
      okText: '确定',
      cancelText: '取消',
      okFn: async () => {
        await deleteCustomerEmailById(customerEmailId);
      }
    });
  };
}

const styles = {
  container: {
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  emailContent: {
    margin: 12,
    position: 'relative'
  },
  list: {
    marginBottom: 12,
    borderRadius: 6,
    overflow: 'hidden'
  },
  listItem: {
    height: 48,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12
  },
  content: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  icon: {
    width: 20,
    height: 20
  },
  bottom: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ebebeb',
    backgroundColor: '#fff',
    paddingTop: 10
  },
  btnbox: {
    position: 'relative',
    padding: 12,
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonBox: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    flexDirection: 'row'
  },
  img: {
    height: 16,
    width: 16,
    marginRight: 8
  },
  add: {
    borderRadius: 18,
    height: 36
  },
  btn: {
    borderRadius: 18
  }
};
