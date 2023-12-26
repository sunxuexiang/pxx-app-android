/**
 * Created by feitingting on 2017/8/29.
 */
import React from 'react';
import {ScrollView, PixelRatio, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {msg, StoreProvider} from 'plume2';
import Header from 'wmkit/header';
import FormInput from 'wmkit/form/form-input';

import AppStore from './store';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { mainColor } from 'wmkit/styles/index';

@StoreProvider(AppStore, {debug: __DEV__})
export default class UserAccountEdit extends React.Component {
    store;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const state = this.props.route;
        const accountId = state.params.accountId;
        //绑定按钮点击事件
        msg.emit('router: setParams', {
            handleSave: this.store.doSave
        });
        this.store.init(accountId);
    }

    render() {
        const account = this.store
            .state()
            .get('account')
            .toJS();
        const state = this.props.route;
        return (
            <View style={styles.container}>
                <Header title={state.params.add ? '新增银行账户' : '编辑银行账户'}/>
                <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 12}}
                >
                    <FormInput
                        label="开户行"
                        placeholder="请输入您开户行的名称"
                        type="default"
                        defaultValue={account.customerBankName}
                        maxLength={50}
                        onChange={(value) =>
                            this.store.changeValue('customerBankName', value)
                        }
                    />
                    <FormInput
                        label="账户名称"
                        placeholder="请输入您的账户名称"
                        defaultValue={account.customerAccountName}
                        maxLength={50}
                        onChange={(value) =>
                            this.store.changeValue('customerAccountName', value)
                        }
                    />
                    <FormInput
                        label="账号"
                        placeholder="请输入您的账号"
                        keyboardType="numeric"
                        defaultValue={account.customerAccountNo}
                        maxLength={30}
                        onChange={(value) =>
                            this.store.changeValue('customerAccountNo', value)
                        }
                    />
                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <View style={styles.btnbox}>
                        <TouchableOpacity
                            onPress={() => state.params.handleSave(state.params.accountId)}
                        >
                            <LinearGradient
                                colors={[mainColor, mainColor]}
                                start={{x: 0, y: 0.5}}
                                end={{x: 1, y: 0.5}}
                                style={[styles.buttonBox, { backgroundColor: mainColor }]}
                            >
                                <Text style={{color: '#fff', fontSize: 14}}>保存</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ebebeb',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12
    },
    text: {
        color: '#333',
        fontSize: 14
    },
    input: {
        color: '#333',
        fontSize: 14,
        textAlign: 'right',
        flex: 1
    },
    bottom: {
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#ebebeb',
        backgroundColor: '#fff',
        paddingTop: 10
    },
    btnbox: {
        position: 'relative',
        padding: 12,
        paddingBottom: 10,
        paddingTop: 10
    },
    buttonBox: {
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        flexDirection: 'row'
    }
});
