import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';

import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Checkbox from 'material-ui/lib/checkbox';

import { actions as rgrepActions } from 'redux/modules/rgrep';

@Radium
export class HomeView extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      query: '',
      insensitive: false
    };
  }

  @autobind
  handleQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  @autobind
  handleInsensitive(event) {
    let { insensitive } = this.state;
    this.setState({ insensitive: !insensitive });
  }

  @autobind
  handleSearch() {
    let { query, insensitive } = this.state;
    let queryOpt = { query };
    if (insensitive) {
      Object.assign(queryOpt, { insensitive: null });
    }
    this.props.push({
      pathname: '/result',
      query: queryOpt
    });
  }

  render() {
    return (
      <div style={ styles.container }>
        <div style={ styles.flexContainer }>
          <Paper style={ styles.paper }>
            <Card>
              <CardActions>
                <TextField
                  floatingLabelText='Query'
                  hintText='Type your query here...'
                  fullWidth
                  onChange={ this.handleQueryChange } />
              </CardActions>
              <CardActions>
                <FlatButton onTouchTap={ this.handleSearch } primary>
                  Search
                </FlatButton>
                <Checkbox
                  checked={ this.state.insensitive }
                  label='insensitive'
                  onCheck={ this.handleInsensitive } />
              </CardActions>
            </Card>
          </Paper>
        </div>
      </div>
    );
  }

}

HomeView.propTypes = {
  rgrep: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired
};

export default connect((state) => {
  return { rgrep: state.rgrep };
}, Object.assign({}, rgrepActions, { push }))(HomeView);

const styles = {
  container: {
    height: '100%',
    width: '100%'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '60%',
    height: '30%',
    marginTop: '200px'
  }
};
