import React, { Component } from 'react';
import { TouchableOpacity, Image, Platform,View } from 'react-native';
import { Relax, msg } from 'plume2';

import { noop, share } from 'wmkit';
import MenuBox from '../../../wmkit/biz/menu-box'
const isAndroid = Platform.OS === 'android';

@Relax
export default class GoodsNav extends Component {
  static relaxProps = {
    menuList: 'menuList',
    handClick: noop,
    isMenuBoxFlag: 'isMenuBoxFlag'
  };
  constructor(props){
    super(props);
    this.state={
      isMenuBoxFlag: false
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      isMenuBoxFlag: nextProps.relaxProps.isMenuBoxFlag
    });
  }
  render() {
    // const { isMenuBoxFlag } = this.state;
    // const { menuList } = this.props.relaxProps
    return (
      <View style={{marginLeft:8}}>
        <TouchableOpacity 
         onPress={this._handleModal}>
          <Image
            style={{
              width: 25,
              height: 25,
              zIndex: 999
            }}
            source={require('../img/menu-more.png')} 
          />
        </TouchableOpacity>
        {/* {isMenuBoxFlag ?  <MenuBox isMenuBoxFlag={isMenuBoxFlag} menuList={menuList} /> :null} */}
      </View>
    )
  }
  _handleModal = () => {
    let { isMenuBoxFlag } = this.state;
    let { handClick } = this.props.relaxProps;
    this.setState({
      isMenuBoxFlag: !isMenuBoxFlag
    },()=>{
      handClick(this.state.isMenuBoxFlag)
    })
  };
}
