import React from 'react';
import { Text } from 'react-native';
import { Relax } from 'plume2';
import { noop, WMImgPreview } from 'wmkit';

@Relax
export default class AnnexMask extends React.Component {
  static relaxProps = {
    sortEnclosures: 'sortEnclosures',
    changeAnnexMask: noop,
    annexMaskShow: 'annexMaskShow'
  };
  render() {
    const {
      changeAnnexMask,
      sortEnclosures,
      annexMaskShow
    } = this.props.relaxProps;
    return (
      annexMaskShow && (
        <WMImgPreview
          data={sortEnclosures}
          changeAnnexMask={() => changeAnnexMask()}
        />
      )
    );
  }
}
