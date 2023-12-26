import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  findNodeHandle,
  TouchableOpacity
} from 'react-native';

import * as T from '../types';
import { screenWidth, mainColor } from 'wmkit/styles/index';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

type ICateTabProps = T.IProps & T.ICateTabProps;

@connect<Partial<ICateTabProps>, T.ICateTabState>(
  store2Props,
  actions
)
export default class CateTab extends React.Component<
  Partial<ICateTabProps>,
  T.ICateTabState
> {
  _scroll;
  _cateRefs = [];

  constructor(props: ICateTabProps) {
    super(props);
  }

  componentDidUpdate() {
    this.scrollViewTo();
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollViewTo();
    }, 10);
  }

  /**
    
*/
  render() {
    let {
      actions: { action },
      main: { grouponCates, chooseCateId }
    } = this.props;

    return (
      <View>
        <View style={styles.cateTab}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.layoutContent}
            ref={(ref) => (this._scroll = ref)}
          >
            {grouponCates.map((cateItem, index) => {
              return (
                <TouchableOpacity
                  key={cateItem.grouponCateId}
                  activeOpacity={0.8}
                  onPress={() => {
                    action.chooseGrouponCate(
                      cateItem.grouponCateId,
                      cateItem.defaultCate,
                      index
                    );
                    action.commonChange(
                      'main.chooseCateId',
                      cateItem.grouponCateId
                    );
                  }}
                  ref={(ref) => (this._cateRefs[cateItem.grouponCateId] = ref)}
                  style={[
                    styles.tabItem,
                    chooseCateId
                      ? chooseCateId === cateItem.grouponCateId && {
                          borderBottomColor: '#fff'
                        }
                      : cateItem.defaultCate === 1 && {
                          borderBottomColor: '#fff'
                        }
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.tabText,
                      chooseCateId
                        ? chooseCateId === cateItem.grouponCateId && {
                            color: '#fff'
                          }
                        : cateItem.defaultCate === 1 && {
                            color: '#fff'
                          }
                    ]}
                  >
                    {cateItem.grouponCateName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }

  scrollViewTo = () => {
    let {
      main: { grouponCates, chooseCateIndex }
    } = this.props;

    let allLeft = 0;
    grouponCates.map((cateItem, index) => {
      UIManager.measure(
        findNodeHandle(this._cateRefs[cateItem.grouponCateId]),
        (x, y, width) => {
          if (index < chooseCateIndex) {
            allLeft = allLeft + width + 30;
          } else {
            this._scroll.scrollTo({ x: allLeft, y: 0 });
            return;
          }
        }
      );
    });
  };
}

const styles = StyleSheet.create({
  cateTab: {
    zIndex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    marginBottom: 8
  },
  layoutContent: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabItem: {
    height: 39,
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginRight: 16
  },
  tabText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)'
  }
});
