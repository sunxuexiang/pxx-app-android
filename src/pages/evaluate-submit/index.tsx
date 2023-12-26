import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { connect } from 'react-redux';

import * as T from './types';
import actions from './actions';
import { store2Props } from './selectors';
import { registerReducer } from '@/redux/store';
import evaluateSubmitMain from './reducers/main';

import EvaluateItem from './components/evaluate-item';

import EvaluateDetail from './components/evaluate-detail';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { screenWidth, mainColor } from '@/wmkit/styles';
@connect<Partial<T.IProps>, any>(store2Props, actions)
export default class EvaluateSubmit extends React.Component<
  Partial<T.IProps>,
  any
> {
  componentDidMount() {
    const state = this.props.route;
    const goodInfo = state.params.goodInfo;
    const queryType = state.params.queryType;
    AsyncStorage.setItem(
      'evaluateQueryType',
      JSON.stringify({
        queryType: queryType
      })
    );
    this.props.actions.init(goodInfo, queryType);
  }

  componentWillUnmount() {
    this.props.actions.clean();
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;
    const isReady = main.isReady;
    const queryType = main.queryType;
    return (
      <View style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        {isReady && queryType != 2 && <EvaluateItem />}
        {isReady && queryType == 2 && <EvaluateDetail />}
        {isReady && queryType != 2 && (
          <View style={styles.box}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                action.save();
              }}
            >
              <LinearGradient
                colors={[mainColor, mainColor]}
                style={styles.btn}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Text style={styles.btnText}>提交</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

registerReducer({ evaluateSubmitMain });

const styles = StyleSheet.create({
  index: {},
  box: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderRadius: 18,
    width: screenWidth - 24
  },
  btnText: {
    fontSize: 14,
    color: '#fff'
  }
});
