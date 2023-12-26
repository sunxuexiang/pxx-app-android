import React from 'react';
import styled from 'styled-components/native';
import Header from 'wmkit/header';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import FileTab from './component/file-tab';
import FileContent from './component/file-content';
import AnnexMask from './component/annex-mask';
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
@StoreProvider(AppStore, { debug: __DEV__ })
export default class StoreFile extends React.Component {
  store;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const state = this.props.route;
    const { storeId } = (state && state.params) || {};
    this.store.init(storeId);
  }
  render() {
    return (
      <Container>
        <Header title="店铺档案" />
        <FileTab />
        <FileContent />
        <AnnexMask />
      </Container>
    );
  }
}
