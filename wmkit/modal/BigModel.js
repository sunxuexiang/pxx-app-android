import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
}from 'react-native';
import { mainColor, screenWidth } from 'wmkit/styles';

export default class BigModal extends Component {

  render() {
    return (
      <Modal
        visible={this.props.visibility}
        transparent={true}
        animationType={'fade'}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{this.props.title}</Text>
            <Text style={styles.modalMessage}>{this.props.message}</Text>
            <View style={styles.horizonLine}/>
            <View style={styles.row}>
              <TouchableHighlight style={styles.rightBn} onPress={this.props.onBtnPress}
                                  underlayColor={'#C5C5C5'} >
                <Text style={[styles.rightBnText, { color: mainColor }]}>{this.props.btnText}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems:'center'
  },
  modalContainer: {
    width: screenWidth * 0.6,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems:'center',
  },
  modalTitle: {
    color: '#000000',
    fontSize: 15,
    marginTop: 10,
  },
  modalMessage:{
    color:'rgba(0, 0, 0, 0.5)',
    fontSize:12,
    margin:10,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
  },
  horizonLine:{
    backgroundColor:'#ccc',
    height:0.5,
    alignSelf:'stretch'
  },
  rightBn:{
    borderTopWidth:0.5,
    borderTopColor:'#ccc',
    borderBottomRightRadius:5,
    paddingVertical:10,
    flexGrow:1,
    justifyContent:'center',
    alignItems:'center',
  },
  rightBnText:{
    fontSize:16
  }
})
