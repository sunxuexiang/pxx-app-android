import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Picker, List } from '@ant-design/react-native';
import businessIndustries from '../json/business/businessIndustry.json';

export default class BusinessIndustryPicker extends React.Component {
  render() {
    return (
      <List>
        <Picker
          data={businessIndustries}
          cols={1}
          title=""
          {...this.props}
        >
          {this.props.children}
        </Picker>
      </List>
    );
  }
}
