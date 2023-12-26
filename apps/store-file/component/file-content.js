import React from 'react';
import { View } from 'react-native';
import { Relax } from 'plume2';
import File from './file';
import FileImage from './file-image';
import FileMember from './file-member';
@Relax
export default class FileContent extends React.Component {
  static relaxProps = {
    activeKey: 'activeKey'
  };
  render() {
    const { activeKey } = this.props.relaxProps;
    return activeKey == 'archives' ? (
      <File />
    ) : activeKey == 'qualifications' ? (
      <FileImage />
    ) : (
      <FileMember />
    );
  }
}
