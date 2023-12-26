import React from 'react';
import { Relax } from 'plume2';
import { noop } from 'wmkit/noop';
import WMImgPreview from 'wmkit/img-preview';

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
