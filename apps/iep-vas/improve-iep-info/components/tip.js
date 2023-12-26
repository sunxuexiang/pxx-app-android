import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Relax } from 'plume2';

@Relax
export default class Tip extends React.Component {
  constructor(props) {
    super(props);
  }

  static relaxProps = {
    checked: 'checked',
    initialName: 'initialName',
    rejectReason: 'rejectReason',
    enterpriseCheckState:'enterpriseCheckState',
    enterpriseCheckTip:'enterpriseCheckTip'
  };

  render() {
    const { enterpriseCheckState,enterpriseCheckTip } = this.props.relaxProps;

    let disabledFlag = enterpriseCheckState === 1;
    let tipMessage = disabledFlag? '您提交的账户信息正在审核中，请耐心等待。' : '您提交的账户信息审核未通过！';

    return  (
      <View style={styles.header}>
          <View style={styles.tipsBox}>
            <Image source={require('../img/tip-01.jpg')}  style={{height:30,width:30,marginBottom:20,marginTop:20}}/>
            <View style={{marginBottom:10,marginLeft:10}}>
              <Text>{tipMessage}</Text>
            </View>
            {!disabledFlag &&
              <View style={{alignItems:'center'}}>
                <Text className="text-img">{'原因是:'+enterpriseCheckTip}</Text>
                <Text style={{marginTop:10}}>请您修改公司信息后重新提交</Text>
              </View>
            }
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 33,
    paddingBottom: 33
  },
  img: {
    width: 45.5,
    height: 57.5
  },
  text: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 15
  },
  tip: {
    color: 'rgb(147, 148, 149)',
    fontSize: 12
  },
  tipsBox:{
    alignItems:'center',
    justifyContent:'center',
    marginBottom:40,
    paddingHorizontal:30
  },
});
