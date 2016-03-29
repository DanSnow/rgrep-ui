import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import { actions as rgrepActions } from 'redux/modules/rgrep';

@Radium
export class HomeView extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      query: ''
    };
  }

  @autobind
  handleQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  @autobind
  handleSearch() {
    this.props.query({ query: this.state.query });
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
  query: PropTypes.func.isRequired
};

export default connect((state) => {
  return { rgrep: state.rgrep };
}, rgrepActions)(HomeView);

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
