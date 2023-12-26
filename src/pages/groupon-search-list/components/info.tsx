import React from 'react';

import * as T from '../types';

import  GrouponListItem from '../../../../wmkit/biz/groupon/groupon-list-item';
import WMEmpty from 'wmkit/empty';
import WmListView from 'wmkit/list-view/index';

import actions from '../actions/index';
import { connect } from 'react-redux';
import { store2Props } from '../selectors';

type IInfoProps = T.IProps & T.IInfoProps;

@connect<Partial<IInfoProps>, T.IInfoState>(
  store2Props,
  actions
)
export default class Info extends React.Component<
  Partial<IInfoProps>,
  T.IInfoState
> {
  constructor(props: IInfoProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      main: { keyWords }
    } = this.props;

    const listViewProps = {
      url: '/groupon/center/list',
      params: {
        goodsName: keyWords
      },
      isPagination: true,
      renderRow: (item, index) => {
        return <GrouponListItem goodInfo={item} id={index} />;
      },
      renderEmpty: () => (
        <WMEmpty
          emptyImg={require('../img/empty.png')}
          desc="暂时没有拼团活动~"
        />
      ),
      // columnWrapperStyle: styles.bigBox,
      keyProps: 'goodsId'
    };
    return <WmListView {...listViewProps} />;
  }
}
