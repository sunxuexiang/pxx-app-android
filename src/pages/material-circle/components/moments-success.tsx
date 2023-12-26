import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import * as T from '../types';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { screenWidth, screenHeight, mainColor } from 'wmkit/styles/index';

type IFooterProps = T.IProps & T.IFooterProps;

@connect<Partial<IFooterProps>, T.IFooterState>(
  store2Props,
  actions
)
export default class MomentSuccess extends React.Component<
  Partial<IFooterProps>,
  T.IFooterState
> {
  constructor(props: IFooterProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      main
    } = this.props;

    return (
      main.momentSuccess && (
        <View style={styles.mask}>
          <ImageBackground
            style={styles.banner}
            resizeMode="cover"
            source={require('../img/success.png')}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.bottom}
              onPress={() => action.momentSuccess(false)}
            >
              <Text style={styles.text} allowFontScaling={false}>
                立即分享
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ebebeb'
  },
  shareBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  check: {
    marginRight: 10
  },
  shareText: {
    fontSize: 15,
    color: '#333'
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 236,
    backgroundColor: '#ff3254',
    position: 'absolute',
    bottom: screenHeight * 0.05,
    borderRadius: 40
    //paddingVertical: 15
  },
  text: {
    fontSize: 16,
    color: '#ffff'
  },
  banner: {
    width: screenWidth * 0.77,
    height: screenHeight * 0.628,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
