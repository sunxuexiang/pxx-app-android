import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import activity from '../reducers/activity';

type IJoinPeopleModalProps = T.IProps & T.IJoinPeopleModalProps;

@connect<Partial<IJoinPeopleModalProps>, T.IJoinPeopleModalState>(
  store2Props,
  actions
)
export default class JoinPeopleModal extends React.Component<
  Partial<IJoinPeopleModalProps>,
  T.IJoinPeopleModalState
> {
  constructor(props: IJoinPeopleModalProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      activity,

      goods,

      notice,

      otherGroup
    } = this.props;

    return (
      <View style={styles.mask}>
        <View style={styles.modal}>
          <ImageBackground
            style={styles.bg}
            source={require('../img/head.png')}
          >
            <Text allowFontScaling={false} style={styles.title}>参团人员</Text>
          </ImageBackground>
          <ScrollView>
            <View style={styles.list}>
              {otherGroup.customerVOList.map((vo, index) => {
                return (
                  <View style={styles.imgContainer}>
                    <Image
                      style={styles.avatar}
                      key={index}
                      source={
                        vo.headimgurl
                          ? { uri: vo.headimgurl }
                          : require('../img/default-img.png')
                      }
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => action.toggleJoinPeopleModal()}
        >
          <Image style={styles.close} source={require('../img/close.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: 274,
    height: 304,
    backgroundColor: '#fff'
  },
  bg: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 15,
    // lineHeight: 11,
    color: '#fff'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  imgContainer: {
    width: 274 / 4,
    height: (304 - 55) / 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  btn: {
    marginTop: 20
  },
  close: {
    width: 34,
    height: 34
  }
});
