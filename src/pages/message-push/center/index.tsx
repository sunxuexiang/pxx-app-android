import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import Header from 'wmkit/header';

import Info from './components/info';

@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class MessagePushCenter extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    this.props.actions.init();
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return (
      <View style={styles.index}>
        <Header
          title="消息"
          renderRight={() => {
            return (
              <View style={styles.rowFlex}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconBox}
                  onPress={async () => {
                    await this.setMessageAllRead();
                  }}
                >
                  <Image
                    style={styles.icon}
                    source={
                      main.noticeNum + main.preferentialNum === 0
                        ? require('./img/read.png')
                        : require('./img/message.png')
                    }
                  />
                  {(main.noticeNum !== 0 || main.preferentialNum !== 0) && (
                    <View style={[styles.round, { backgroundColor: mainColor }]}>
                      <Text style={styles.roundText} allowFontScaling={false}>
                        {main.noticeNum + main.preferentialNum > 99
                          ? '99+'
                          : main.noticeNum + main.preferentialNum}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconBox}
                  onPress={() => {
                    msg.emit('router: goToNext', { routeName: 'PushSetting' });
                  }}
                >
                  <Image
                    style={styles.icon}
                    source={require('./img/setting.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          onLeftMenuPress={() =>
            // msg.emit('router: goToNext', { routeName: 'UserCenter' })
            {
              msg.emit('router: back');
              msg.emit('message:refresh');
            }
          }
        />
        {main.noticeNum !== 0 || main.preferentialNum !== 0 ? (
          <Info key={1} />
        ) : (
          <Info key={2} />
        )}
      </View>
    );
  }

  setMessageAllRead = async () => {
    try {
      await api.messageController.setMessageAllRead();
    } catch (e) {}
    this.props.actions.init();
  };
}

//==动态注入reducer===

import messagePushCenterMain from './reducers/main';
import { msg } from 'plume2';
import * as _ from 'wmkit/common/util';
// import { isAndroid } from 'wmkit/styles/index';
import api from 'api';
import { mainColor } from '@/wmkit/styles';

registerReducer({ messagePushCenterMain });

const styles = StyleSheet.create({
  index: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  iconBox: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4
  },
  icon: {
    width: 20,
    height: 20
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8
  },
  round: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundText: {
    color: '#fff',
    fontSize: 10
  }
});
