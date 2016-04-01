import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import MuiAppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

import { actions as rgrepActions } from 'redux/modules/rgrep';
import { actions as controlActions } from 'redux/modules/control';

export class AppBar extends React.Component {
  @autobind
  clearCache() {
    this.props.clearCache();
  }

  get rightMenu() {
    return (
      <div>
        <FlatButton primary label="Don't cheat" onTouchTap={ this.clearCache } />
      </div>
    );
  }

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
        }
        iconElementRight={ this.rightMenu } />
    );
  }
}

AppBar.propTypes = {
  rgrep: PropTypes.object.isRequired,
  clearCache: PropTypes.func.isRequired
};

export default connect((state) => {
  return {rgrep: state.rgrep};
}, Object.assign({}, rgrepActions, controlActions))(AppBar);
