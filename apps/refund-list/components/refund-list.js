import React from 'react';
import { Relax } from 'plume2';
import WMEmpty from 'wmkit/empty';
import WmListView from 'wmkit/list-view/index';
import { noop } from 'wmkit/noop';

import RefundItem from './refund-item';

@Relax
export default class RefundList extends React.Component {
  static relaxProps = {
    key: 'key',
    initToRefresh: noop
  };

  render() {
    const { key, initToRefresh } = this.props.relaxProps;
    const urlParams = key == 'all' ? {} : { returnFlowState: key };

    return (
      <WmListView
        loadingStyle={{marginTop:200}}
        key="wmListView"
        url="/return/page"
        keyProps="id"
        params={urlParams}
        renderRow={(item) => <RefundItem refundOrder={item} />}
        renderEmpty={() => (
          <WMEmpty
            emptyImg={require('../img/order_null.png')}
            imgStyle={{width:104,height:104}}
            desc="您还没有退货退款哦"
            isToGoodsList={true}
          />
        )}
        onDataReached={() => {}}
        toRefresh={(_init) => initToRefresh(_init)}
      />
    );
  }
}
