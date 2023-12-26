import React from 'react';
import { Picker, List } from '@ant-design/react-native';

export default class BusinessEmployeeNumPicker extends React.Component {
  render() {
    return (
      <List>
        <Picker
          data={[
            { value: 0, label: '1-49' },
            { value: 1, label: '50-99' },
            { value: 2, label: '100-499' },
            { value: 3, label: '500-999' },
            { value: 4, label: '1000以上' }
          ]}
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
