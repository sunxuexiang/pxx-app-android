import React, { Component } from 'react';
import {Relax} from "plume2";
import { ScrollView } from 'react-native';

import AutoHeightWebView from 'react-native-autoheight-webview';

const styleHtml = ` 
 <style type="text/css">
	img {max-width: 100%; padding: 0; margin: 0; border: 0}
	p,li,ul { padding:0 3px; margin: 0; }
 </style> 
 <meta name="format-detection" content="telephone=no" />
 <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
`;

@Relax
export default class HomeDelivery extends Component {
    static relaxProps = {
        homeDeliverContent: 'homeDeliverContent'
    };
    constructor(props) {
        super(props);
    }

    render() {
        let {homeDeliverContent} = this.props;
        return (
            <ScrollView scrollY>
                {homeDeliverContent && (
                    <AutoHeightWebView
                        enableBaseUrl={true}
                        source={{ html: styleHtml+ homeDeliverContent }}
                        scalesPageToFit={false}
                    />
                )}
            </ScrollView>
        );
    }
}
