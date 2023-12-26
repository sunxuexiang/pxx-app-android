import React from 'react';
import { StyleSheet, View, Text, Image,ScrollView,TouchableOpacity } from 'react-native';
import * as T from '../types';

import actions from '../actions';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';
type INavListProps = T.IProps & T.INavListProps;

@connect<Partial<INavListProps>, T.INavListState>(
  store2Props,
  actions
)
export default class NavList extends React.Component<Partial<INavListProps>,
  T.INavListState> {
  constructor(props: INavListProps) {
    super(props);
  }

  render() {
    let {
      actions: { action },
      main
    } = this.props;
    const cateId = main.cateId;
    const cateList = main.cateList;
    // if (cateList.length > 0 && cateList[0].cateId != null) {
    //   cateList.unshift({cateId: null, cateName: '全部'});
    // }
    return (
      <ScrollView style={{ }} horizontal={true}>
        <View style={
          styles.container
        }>
          {cateList.map((item, i) => {
              return (
                <TouchableOpacity activeOpacity={0.8} style={styles.item} key={item.cateId}                          
                 onPress={() => {
                  this._changeScene(item.cateId);
                }}>
                  <Text allowFontScaling={false} style={[styles.text,main.cateId == item.cateId && styles.active]}>{item.cateName}</Text>
                  {main.cateId == item.cateId && <View style={styles.line}></View>}
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    );
  }
  _changeScene(cateId) {
    this.props.actions.changeCate(cateId);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:16,
    height:45,
    marginTop:10
  },
  item:{
    flexDirection:'column',
    alignItems:'center',
    marginRight:16,
    position:'relative',
    // height:45,
  },
  text:{
    fontSize:12,
    color:'rgba(255,255,255,0.8)'
  },
  active:{
    color:'#fff',
    fontWeight:'bold'
  },
  line:{
    width:24,
    height:2,
    backgroundColor:'#fff',
    marginTop:8,
    position:'absolute',
    bottom:-10
  }
});
