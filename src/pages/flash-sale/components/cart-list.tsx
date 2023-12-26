import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import * as T from '../types';

import actions from '../actions';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
import { isAndroid } from '../../../../wmkit/styles/index';
import Swiper from 'react-native-swiper';

type ICartListProps = T.IProps & T.ICartListProps;

@connect<Partial<ICartListProps>, T.ICartListState>(
  store2Props,
  actions
)
export default class CartList extends React.Component<
Partial<ICartListProps>,
T.ICartListState
> {
  constructor(props: ICartListProps) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;
    const cateId = main.cateId;
    const cateList = main.cateList;
    debugger
    return (
      <View style={[styles.container, { height: Math.ceil(cateList[0].length / 4) * 60 }]}>
        {cateList.length > 0 ? (
          <Swiper
            // height={140}
            dot={dot}
            activeDot={activeDot}
            paginationStyle={styles.paginationStyle}
            loop={false}
          >
            {cateList.map((list, i) => {
              return (
                <View style={styles.contentContainer}>
                  {list.map((item, y) => {
                    return (
                      <View key={item.cateId} style={styles.cart}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            this._changeScene(item.cateId);
                          }}
                        >
                          <View
                            style={
                              cateId && cateId == item.cateId
                                ? styles.cartEveryCur
                                : styles.cartEvery
                            }
                          >
                            <Text allowFontScaling={false}
                              style={
                                cateId && cateId == item.cateId
                                  ? { color: '#ff1f4e', fontSize: 12 }
                                  : { color: '#333', fontSize: 12 }
                              }
                            >
                              {item.cateName}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </Swiper>
        ) : null}
      </View>
    );
  }

  _changeScene(cateId) {
    this.props.actions.changeCate(cateId);
  }
}

const dot = (
  <View
    style={{
      backgroundColor: '#e6e6e6',
      width: 35,
      height: 3,
      marginLeft: 2,
      marginRight: 3,
      marginTop: 3,
      marginBottom: -5
    }}
  />
);
const activeDot = (
  <View
    style={{
      backgroundColor: '#F91A53',
      width: 35,
      height: 3,
      marginLeft: 2,
      marginRight: 3,
      marginTop: 3,
      marginBottom: -5
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  dot: {
    width: 10
  },
  paginationStyle: {
    bottom: 10
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  cart: {
    width: Dimensions.get('window').width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartEvery: {
    width: Dimensions.get('window').width * 0.25 * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    marginBottom: 10
  },
  cartEveryCur: {
    width: Dimensions.get('window').width * 0.25 * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#ff1f4e'
  },
  cartType: {}
});
