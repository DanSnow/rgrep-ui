import React, { PropTypes, Component } from 'react';

export class ResultView extends Component {
  render() {
    return (
      <h1> Result </h1>
    );
  }
}

ResultView.propTypes = {
  query: PropTypes.object.isRequired
};

export default connect((state) => {
  return { query: state.query };
})(ResultView);
