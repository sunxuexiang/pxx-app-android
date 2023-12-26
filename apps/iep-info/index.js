import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StoreProvider } from 'plume2';

import * as Button from 'wmkit/button';
import Header from 'wmkit/header';

import AppStore from './store';
import IepInfoEdit from './components/iep-info-edit';
import { Provider } from '@ant-design/react-native';

const LongButton = Button.LongButton;

@StoreProvider(AppStore, { debug: __DEV__ })
export default class IepInfo extends React.Component {
  store;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.store.init();
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider>
          <Header title="公司信息" />
          <IepInfoEdit />
          <View>
            <View style={{ marginTop: 20 }}>
              <LongButton
                text="保存"
                boxStyle={{ paddingTop: 0 }}
                onClick={this.store.updateIepInfo}
              />
            </View>
          </View>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn: {
    paddingBottom: 0
  },
  topBtn: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderColor: '#ebebeb',
    borderWidth: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#333',
    fontSize: 16
  }
});
