import React, { Component } from 'react';
import { View, Text, Image ,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import PickUpPoint from './pick-up-point';
import {Relax} from "plume2";
import {noop} from "wmkit";
import * as Button from 'wmkit/button';
import AutoHeightWebView from 'react-native-autoheight-webview';
import LinearGradient from 'react-native-linear-gradient';
import { screenWidth,screenHeight, mainColor } from 'wmkit/styles/index';
import * as _ from 'wmkit/common/util'; // added by scx

const SubmitButton = Button.Submit;

const styleHtml = ` 
 <style type="text/css">
	img {max-width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class DeliverType extends Component {
    static relaxProps = {
        storeId: 'storeId',
        pickUpMessage:'pickUpMessage',
        openModel: noop,
        delivery:'delivery',
        deliveryWaysId: 'deliveryWaysId',
        homeDeliverContent: 'homeDeliverContent',
        pickUpSelect: 'pickUpSelect',
        homeDeliverExpressContent: 'homeDeliverExpressContent',
        homeDeliverPickSelfContent: 'homeDeliverPickSelfContent'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {pickUpMessage,openModel,delivery,deliveryWaysId,homeDeliverContent,pickUpSelect,
            homeDeliverExpressContent,homeDeliverPickSelfContent} = this.props.relaxProps;
        const {storeId} = this.props;
        let title = '配送方式';
        delivery && delivery.map((item) => {
            if (item.get('id') == deliveryWaysId[storeId]) {
                title = item.get('name');
            }
        })
        return (
            <View
                style={styles.deliverTypeMask}
                onTouchMove={(e) => {
                    e.stopPropagation();
                }}
            >
                <View style={styles.deliverTypeModal}>
                    <View style={styles.head}>
                        <Text style={styles.modelTitle}>{title}</Text>
                        <TouchableOpacity style={styles.specClose} onPress={()=>openModel(storeId, false)}>
                            <Image
                                source={require('../img/spec-close.png')}
                                style={styles.specCloseImg}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <ScrollView scrollY style={{ flex: 1}}>
                            {deliveryWaysId[storeId] == 2 && homeDeliverExpressContent&&(
                                <AutoHeightWebView
                                    enableBaseUrl={true}
                                    source={{ html: styleHtml+ homeDeliverExpressContent }}
                                    scalesPageToFit={false}
                                    scrollEnabled={false}
                                    style={{width: screenWidth - 24}}
                                />
                            )}
                            {deliveryWaysId[storeId] == 3 && (<PickUpPoint pickUpMessage={pickUpMessage} storeId={storeId} pickUpSelect={pickUpSelect} />)}
                            {deliveryWaysId[storeId] == 3 && homeDeliverPickSelfContent&&(
                                <AutoHeightWebView
                                    enableBaseUrl={true}
                                    source={{ html: styleHtml+ homeDeliverPickSelfContent }}
                                    scalesPageToFit={false}
                                    scrollEnabled={false}
                                    style={{width: screenWidth - 24}}
                                />
                            )}
                            {deliveryWaysId[storeId] == 4 &&homeDeliverContent&&(
                                <AutoHeightWebView
                                    enableBaseUrl={true}
                                    source={{ html: styleHtml+ homeDeliverContent }}
                                    scalesPageToFit={false}
                                    scrollEnabled={false}
                                    style={{width: screenWidth - 24}}
                                />
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            style={{
                                height: 56,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => openModel(storeId, false)}>
                            <LinearGradient
                                colors={[mainColor, mainColor]}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={[styles.buttonBox, { backgroundColor: mainColor }]}
                            >
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>保存</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    deliverTypeMask: {
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 9,
      },
    deliverTypeModal: {
        width: screenWidth,
        height: screenHeight * 0.7,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: '#f5f5f5',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        overflow: 'hidden'
    },
    head: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        backgroundColor: '#fff'
    },
    modelTitle:{
        fontSize:16,
        color: 'rgba(0,0,0,0.8)'
    },
    specClose:{
        width:20,
        height:20,
        position:'absolute',
        right:10,
        top:14,
    },
    specCloseImg: {
        width:20,
        height:20
    },
    body: {
        flex: 1,
        paddingTop: 12,
        paddingHorizontal: 12,
        ..._.ifIphoneX(
          {
            paddingBottom: 34
          },
          {
            paddingBottom: 0
          }
        )
    },
    deliveryItem:{
        alignItems: 'center',
        marginTop:10,
    },
    buttonBox: {
        width: screenWidth - 24,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        marginTop:10,
    },
})
