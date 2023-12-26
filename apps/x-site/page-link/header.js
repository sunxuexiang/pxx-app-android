import React, { Component } from 'react';
import Header from 'wmkit/header';
import { msg } from 'plume2';

/**
 * x-site魔方建站,海报页/文章页标题栏
 */
export default class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: ''
    };
  }

  UNSAFE_componentWillMount() {
    msg.on('app:x-site:page:title', this._handlePageTitle);
  }

  componentWillUnmount() {
    msg.off('app:x-site:page:title', this._handlePageTitle);
  }

  _handlePageTitle = (title) => {
    this.setState({
      pageTitle: title
    });
  };

  render() {
    return <Header title={this.state.pageTitle} />;
  }
}
