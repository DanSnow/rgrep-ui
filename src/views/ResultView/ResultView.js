import React, { PropTypes, Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';

import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import ChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import CircularProgress from 'material-ui/lib/circular-progress';

import { actions as rgrepActions } from 'redux/modules/rgrep';

@Radium
export class ResultView extends Component {
  componentDidMount() {
    this.runQuery(this.props.location.query);
  }

  componentWillUnmount() {
    this.props.clearResult();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.query.page !== this.props.location.query.page) {
      this.runQuery(newProps.location.query);
    }
  }

  @autobind
  runQuery(query) {
    if (query.query) {
      this.props.query(query);
    } else {
      this.props.push('/');
    }
  }

  @autobind
  handlePrev() {
    let page = 1;
    if (this.props.location.query.page) {
      page = parseInt(this.props.location.query.page);
    }
    if (page - 1) {
      this.props.push({
        pathname: '/result',
        query: {
          ...this.props.location.query,
          page: (page - 1).toString()
        }
      });
    }
  }

  @autobind
  handleNext() {
    let page = 1;
    if (this.props.location.query.page) {
      page = parseInt(this.props.location.query.page);
    }
    this.props.push({
      pathname: '/result',
      query: {
        ...this.props.location.query,
        page: (page + 1).toString()
      }
    });
  }

  get loadingProgress() {
    return (
      <CircularProgress />
    );
  }

  get searchResult() {
    return this.props.rgrep.get('result').map((data, idx) => {
      return (
        <Card style={ styles.card } key={ idx }>
          <CardText>
            { data.get('title') }
          </CardText>
          <CardText>
            { data.get('content') }
          </CardText>
        </Card>
      );
    }).toSeq();
  }

  get hasResult() {
    return this.props.rgrep.get('result').size;
  }

  render() {
    return (
      <div style={ styles.container }>
        <div style={ [styles.flexContainer, styles.flexVert] }>
          {
            this.hasResult ? this.searchResult : this.loadingProgress
          }
        </div>
        <div style={ styles.flexContainer }>
          <FlatButton label='Prev' icon={ <ChevronLeft /> } onTouchTap={ this.handlePrev } />
          <FlatButton label='Next'labelPosition='before' icon={ <ChevronRight /> } onTouchTap={ this.handleNext } />
        </div>
      </div>
    );
  }
}

ResultView.propTypes = {
  rgrep: PropTypes.object.isRequired,
  query: PropTypes.func.isRequired,
  clearResult: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default connect((state) => {
  return { rgrep: state.rgrep };
}, Object.assign({}, rgrepActions, { push }))(ResultView);

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
  flexVert: {
    flexDirection: 'column'
  },
  card: {
    marginTop: '10px',
    width: '80%'
  }
};
