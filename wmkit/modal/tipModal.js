import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,ScrollView
}from 'react-native';
import { screenWidth,screenHeight,mainColor } from 'wmkit/styles';
import * as _ from '../common/util'; // added by scx

export default class TipModal extends Component {

  render() {
    const {cancelText,content,useExtraTipText} = this.props;
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
            {/* <Text style={styles.modalMessage}>{this.props.message}</Text> */}
            {
              useExtraTipText ? this.props.message :
              <Text style={styles.modalMessage}>{this.props.message}</Text>
            }
            <View style={styles.horizonLine}/>

            <ScrollView
                style={{maxHeight:screenHeight/3,width:'100%',paddingVertical:8}}
            >
              {
                content.map(item=>{
                  return <View style={styles.tipContent} key={item.goodsInfoId}>
                    <Text allowFontSacling={false} numberOfLines={1} style={styles.tipItemName}>{item.goodsInfoName}</Text>
                      <View style={styles.tipItemStock}>
                        <Text style={styles.tipItemStockName}>库存</Text>
                        <Text style={styles.tipItemStockName}>{item.stock || 0}件</Text>
                      </View>
                    </View>
                })
              }
            </ScrollView>

            <View style={styles.row}>
              {
                Boolean(cancelText) ?
                <TouchableHighlight style={[styles.rightBn,{borderRightWidth:1,borderRightColor:'#ccc'}]} onPress={this.props.onRequestClose} underlayColor={'#C5C5C5'} >
                  <Text style={[styles.rightBnText, { color: mainColor }]}>{this.props.cancelText}</Text>
                </TouchableHighlight> : null
              }
              <TouchableHighlight style={styles.rightBn} onPress={this.props.onBtnPress} underlayColor={'#C5C5C5'} >
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
    width: screenWidth * 0.7,
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
    paddingVertical:15,
    flexGrow:1,
    justifyContent:'center',
    alignItems:'center',
    width:'50%'
  },
  rightBnText:{
    fontSize:16
  },
  tipContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal:10,
  },
  tipItemName:{
    flex: 1,
    fontSize: 14,
    overflow: 'hidden',
    textAlign: 'left',
    color:'#333',
    alignItems:'center',
    height:26,
    lineHeight:26
  },
  tipItemStock: {
    width: '16%',
    textAlign: 'right',
  },
  tipItemStockName: {
    textAlign: 'center',
    fontSize: 11,
    color: '#666',
  }
})
