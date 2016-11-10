import React  from 'react';
import Button from 'react-bootstrap/lib/Button';

class Letter extends React.Component {

  constructor(props) {

    super(props);

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(){

    this.props.onClick(this.props.letter);

  }

  shouldComponentUpdate(nextProps, nextState){

    if(this.props.className != nextProps.className){
      return true;
    }

    return false;

  }

  render(){

    return (
      <div className="btn-group" role="group">
        <Button bsStyle={this.props.bsStyle} bsSize="large" onClick={this.handleClick} className={this.props.className}>{this.props.letter}</Button>
      </div>
    );

  }

}

module.exports = Letter;