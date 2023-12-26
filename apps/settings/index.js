import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StoreProvider, msg } from 'plume2';

import Header from 'wmkit/header';
import AppStore from './store';
import Container from './component/container';
import ShareModal from './component/share-modal';
import ImgShareModal from './component/img-share-modal';
import ShowUserRegistrationAgreement from './component/usersregistration-agreement';
import ToggleShowPrivacyPolicyAgreement from './component/privacyPolicy-agreement';

/**
 * 设置
 */
@StoreProvider(AppStore, { debug: __DEV__ })
export default class Settings extends React.PureComponent {
  store;

  componentDidMount() {
    this.store.init();
  }

  render() {
    const state = this.store.state();
    return (
      <View style={styles.container}>
        <Header
          title="设置"
          onLeftMenuPress={() =>
            msg.emit('router: goToNext', { routeName: 'UserCenter' })
          }
        />
        <Container />
        {state.get('modelVisible') && <ShareModal />}
        {state.get('imgShareVisible') && <ImgShareModal />}
        {state.get('showUserRegistrationAgreement') && <ShowUserRegistrationAgreement />}
        {state.get('toggleShowPrivacyPolicyAgreement') && <ToggleShowPrivacyPolicyAgreement />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});
