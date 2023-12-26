import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import OpenSettings from '@wanmi/react-native-open-settings';

/**
 * 保存权限
 */
export const saveImage = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      const cameraGrant = grants[PermissionsAndroid.PERMISSIONS.CAMERA];
      if (cameraGrant !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('提示', '暂时无法获取到相机授权', [
          { text: '取消', style: 'cancel' },
          { text: '打开设置', onPress: this._openSettings },
        ]);
        return;
      }
      const storageGrant =
        grants[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];
      if (storageGrant !== PermissionsAndroid.RESULTS.GRANTED) {

        Alert.alert('提示', '暂时无法获取到存储授权', [
          { text: '取消', style: 'cancel' },
          { text: '打开设置', onPress: _openSettings },
        ]);
        return;
      }
      return true;
    } catch (err) {
      console.warn(err);
    }
  } else {
    request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then((res) => {
          if (res != RESULTS.GRANTED) {
            Alert.alert('提示', '暂时无法获取到相册授权', [
              { text: '取消', style: 'cancel' },
              { text: '打开设置', onPress: _openSettings },
            ]);
          } else {
            return true;
          }
        },
      );
  }
};

const _openSettings = () => {
  return Platform.OS === 'ios' ? openSettings() : OpenSettings.openSettings();
}