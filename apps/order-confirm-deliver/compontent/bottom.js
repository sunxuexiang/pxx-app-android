import { msg, Relax } from 'plume2';
import React,{ Component } from 'react';
import { noop, Button } from 'wmkit';
import { StyleSheet, SafeAreaView } from 'react-native';
const LongButton = Button.LongButton;

@Relax
export default class Bottom extends Component {
  static relaxProps = {
    handleConfirm: noop,
  }
  render(){
    const {handleConfirm}=this.props.relaxProps;
    return(
      <SafeAreaView style={styles.bottom}>
        <LongButton onClick={() => handleConfirm()} boxStyle={{paddingTop: 0, paddingBottom: 10}} btnStyle={{borderRadius: 22.5}}/>
      </SafeAreaView>
    );
  }
}

const styles= StyleSheet.create({
  bottom: {
    
  },
});