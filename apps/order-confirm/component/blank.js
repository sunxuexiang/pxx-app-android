import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class Blank extends Component {
    static options = {
        addGlobalClass: true,
    };
    props: {
        content?: string;
        img?: string;
        style?: any;
        imgStyle?: any;
        textStyle?: any;
    };

    static defaultProps = {
        content: '',
        img: 'http://pic.qianmi.com/astore/d2c-wx/images/list-none.png',
        styles: {},
    };

    render() {
        const {content, img, style, imgStyle, textStyle} = this.props;
        return (
            <View style={style}>
                <Image src={img} style={imgStyle} />
                <Text style={textStyle}>
                    {content}
                </Text>
            </View>
        );
    }
}