import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';

import MuiAppBar from 'material-ui/lib/app-bar';

import { actions as rgrepActions } from 'redux/modules/rgrep';

export class AppBar extends React.Component {
  static propTypes = {
    rgrep: PropTypes.object.isRequired
  };

  render() {
    return (
      <MuiAppBar
        title={
          <IndexLink style={ {
            color: 'white',
            textDecoration: 'inherit'
          } } to='/'>
            RGrep
          </IndexLink>
        } />
    );
  }
}

export default connect((state) => {
  return {rgrep: state.rgrep};
}, rgrepActions)(AppBar);
