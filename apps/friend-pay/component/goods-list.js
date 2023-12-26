import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // 屏幕宽高
import { _, WMImage } from 'wmkit'
import SpecialLabel from '../../../wmkit/biz/special-label';

const renderGood = ({ item }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {}}
        >
            <View style={styles.goodItemWrapper}>
                <WMImage style={styles.goodImage} src={item.pic} alt='' />
                <View style={styles.infoWrapper}>
                    {item.goodsInfoType === 1 && <SpecialLabel/>}
                    {/* <Text style={styles.spuName}>{item.spuName}</Text> */}
                    <Text
                        style={styles.spuName}
                        ellipsizeMode='tail'
                        numberOfLines={2}
                    >{item.spuName}</Text>
                    <View style={styles.priceNumWrapper}>
                        <Text style={styles.spuPrice}>¥ {_.addZero(item.price)}</Text>
                        <Text style={styles.spuNum}>×{item.num}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const GoodsList = (props) => {
    const { tradeItems } = props
    return (
        <View style={styles.orderListWrapper}>
            <FlatList
                data={tradeItems}
                renderItem={renderGood}
                keyExtractor={(n, i) => i.toString()}
            ></FlatList>
        </View>
    )
}

export default GoodsList

const styles = StyleSheet.create({
    orderListWrapper: {
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10
    },
    goodItemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    goodImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 10
    },
    infoWrapper: {
        width: screenWidth - 150,
        height: 80
    },
    spuName: {
        color: '#5C5C5C',
        fontSize: 14
    },
    priceNumWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    spuPrice: {
        width: '50%',
        textAlign: 'left',
        fontSize: 18,
        color: '#FF7B23',
        fontWeight: '400'
    },
    spuNum: {
        width: '50%',
        textAlign: 'right',
        fontWeight: '400',
        paddingRight: 10,
        lineHeight: 30
    }
})