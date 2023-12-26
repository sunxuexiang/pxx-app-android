import React, {Component} from 'react';
import {
    Alert,
    Image,
    PermissionsAndroid,
    PixelRatio,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {openSettings, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import OpenSettings from '@wanmi/react-native-open-settings';
import {msg} from 'plume2';
import Fetch from 'wmkit/fetch';

const IMAGE_TYPE = {
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.heic': 'image/heic' // ios 11新增格式 live图
};

/**
 * 上传图片
 */
export default class WmUpload extends Component {
    render() {
        const {customStyle} = this.props;
        return (
            <View
                style={[
                    styles.rowItem,
                    {flexDirection: 'column', alignItems: 'flex-start'}
                ]}
            >
                <View style={{flexDirection: 'row'}}>
                    <View>
                        {customStyle ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.newAddPic}
                                onPress={() => this.uploadPic()}
                            >
                                <Text style={styles.text}>上传图片</Text>
                                <Image
                                    style={styles.newAddIcon}
                                    source={require('./img/add.png')}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.addPic}
                                onPress={() => this.uploadPic()}
                            >
                                <Image
                                    style={styles.addIcon}
                                    source={require('./img/plus.png')}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    }

    /**
     * 上传图片
     */
    uploadPic = async () => {
        //图片选项
        const options = {
            title: '',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '',
            chooseFromLibraryButtonTitle: '',
            customButtons: [
                {name: 'camera', title: '拍照'},
                {
                    name: Platform.OS === 'ios' ? 'photo' : 'photos',
                    title: '我的相册'
                }
            ],
            quality: 0.2,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        if (Platform.OS === 'android') {
            const grants = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ]);
            const cameraGrant = grants[PermissionsAndroid.PERMISSIONS.CAMERA];
            if (cameraGrant !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('提示', '暂时无法获取到相机授权', [
                    {text: '取消', style: 'cancel'},
                    {text: '打开设置', onPress: this._openSettings}
                ]);
                return;
            }
            const storageGrant =
                grants[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];
            if (storageGrant !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('提示', '暂时无法获取到存储授权', [
                    {text: '取消', style: 'cancel'},
                    {text: '打开设置', onPress: this._openSettings}
                ]);
                return;
            }

            //显示按钮
            ImagePicker.showImagePicker(options, (response) => {
                if (!response.didCancel) {
                    //点击'拍照'或者'我的相册'或者'自定义按钮'
                    if (response.customButton) {
                        if (__DEV__) {
                            console.log('response => ', response);
                        }
                        switch (response.customButton) {
                            case 'camera':
                                ImagePicker.launchCamera(options, async (res) => {
                                    this._imageShow({response: res});
                                });
                                break;
                            case 'photos':
                                ImagePicker.launchImageLibrary(options, async (res) => {
                                    this._imageShow({response: res});
                                });
                                break;
                        }
                    }
                }
            });
        } else {
            //显示按钮
            ImagePicker.showImagePicker(options, (response) => {
                if (!response.didCancel) {
                    //点击'拍照'或者'我的相册'或者'自定义按钮'
                    if (response.customButton) {
                        if (__DEV__) {
                            console.log('response => ', response);
                        }
                        let permission =
                            response.customButton === 'photo'
                                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                                : PERMISSIONS.IOS.CAMERA;
                        this._requestPermission({
                            permission: permission,
                            param: options
                        });
                    }
                }
            });
        }
    };

    async _requestPermission(params) {
        let {permission, param} = params;
        permission =
            permission === 'photos' ? PERMISSIONS.IOS.PHOTO_LIBRARY : permission;
        let content = permission == 'camera' ? '相机' : '相册';

        request(permission)
            .then((res) => {
                if (res != RESULTS.GRANTED) {
                    Alert.alert('提示', '暂时无法获取到' + content + '授权', [
                        {text: '取消', style: 'cancel'},
                        {text: '打开设置', onPress: this._openSettings}
                    ]);
                } else {
                    switch (permission) {
                        case PERMISSIONS.IOS.CAMERA:
                            ImagePicker.launchCamera(param, async (res) => {
                                this._imageShow({response: res});
                            });
                            break;
                        case PERMISSIONS.IOS.PHOTO_LIBRARY:
                            ImagePicker.launchImageLibrary(param, async (res) => {
                                this._imageShow({response: res});
                            });
                            break;
                    }
                }
            })
            .catch((e) => console.warn(e));
    }

    _openSettings() {
        return Platform.OS === 'ios' ? openSettings() : OpenSettings.openSettings();
    }

    async _imageShow(params) {
        let {response} = params;
        if (response.notImage) {
            msg.emit('app:tip', '图片格式有误,请重新选择!');
            return;
        } else {
            if (__DEV__) {
                console.log('response uri ==>', response);
            }
            if (!response.uri) {
                msg.emit('app:tip', '您已取消上传图片');
                return;
            }

            if (!response.fileName) {
                //兼容IOS调用照相机上传图片的时候，fileName为空的问题
                response.fileName = response.uri.substring(
                    response.uri.lastIndexOf('/') + 1
                );
            }

            let fileName = response.fileName;

            if (
                !fileName ||
                !IMAGE_TYPE[fileName.substr(fileName.lastIndexOf('.')).toLowerCase()]
            ) {
                msg.emit('app:tip', '图片格式不正确');
                return;
            }

            // 默认最大5M
            let maxSize = this.props.size ? this.props.size : 5;
            let fileSize = response.fileSize ? response.fileSize : 0;
            if (fileSize >= 1024 * 1024 * maxSize) {
                msg.emit('app:tip', `图片尺寸过大，请重新上传，不能超过${maxSize}M`);
                return;
            }

            this.props.beforeUpload && (await this.props.beforeUpload());

            try {
                await this._fileTransfer(response);
            } catch (err) {
                if (__DEV__) {
                    console.log(err, err.message);
                }
                if (err.message != 'cancel') {
                    msg.emit('app:tip', err.message);
                }
            }
        }
    }

    /**
     * 文件上传
     * @param uri
     * @private
     */
    async _fileTransfer(response) {
        let formData = new FormData();
        let fileName = response.fileName;
        fileName = fileName.substr(fileName.lastIndexOf('.'))
            + '.'
            + fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase()
        let file = {
            uri: response.uri,
            type: 'image/jpeg',
            name: fileName
        };
        formData.append('uploadFile', file);

        msg.emit('app:tip', '正在上传请稍后...');
        let res = await Fetch('/common/uploadResource?resourceType=IMAGE', {
            method: 'POST',
            body: formData
        });

        if (__DEV__) {
            console.log('upload:', res);
        }

        if (res.code == 'K-000000') {
            msg.emit('app:tip', '上传成功!');
            this.props.onChange && this.props.onChange(res.context[0]);
        } else {
            msg.emit('app:tip', '上传失败');
            this.props.onChange && this.props.onChange('');
        }
    }
}

const styles = StyleSheet.create({
    addPic: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#333'
    },
    rowItem: {
        //paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    addIcon: {
        width: 15,
        height: 15
    },
    newAddPic: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.4)'
    },
    newAddIcon: {
        width: 12,
        height: 12,
        marginLeft: 4
    }
});
