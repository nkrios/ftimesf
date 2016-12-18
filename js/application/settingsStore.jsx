import React from 'react';

import { restoreState, storeState } from '../storage';

const settingsStore = WrappedComponent => {
  class SettingsStore extends React.Component {
    constructor(props) {
      super(props);

      this.setHexFormat = this.setHexFormat.bind(this);
      this.setHalfedTable = this.setHalfedTable.bind(this);

      this.state = restoreState('settings', {
        halfedTable: false,
        hexFormat: 'c',
      });
    }

    componentWillUpdate(props, state) {
      storeState('settings', state);
    }

    getChildContext() {
      const { hexFormat, halfedTable } = this.state;
      return {
        hexFormat,
        setHexFormat: this.setHexFormat,
        halfedTable,
        setHalfedTable: this.setHalfedTable,
      };
    }

    setHexFormat(hexFormat) {
      this.setState({ hexFormat });
    }

    setHalfedTable(halfedTable) {
      this.setState({ halfedTable });
    }

    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }

  SettingsStore.childContextTypes = {
    hexFormat: React.PropTypes.string,
    setHexFormat: React.PropTypes.func,
    halfedTable: React.PropTypes.bool,
    setHalfedTable: React.PropTypes.func,
  };

  return SettingsStore;
};

export default settingsStore;
