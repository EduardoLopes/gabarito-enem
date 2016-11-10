import React        from 'react';
import Button       from 'react-bootstrap/lib/Button';
import ButtonGroup  from 'react-bootstrap/lib/ButtonGroup';
import Col          from 'react-bootstrap/lib/Col';
import Letter       from './Letter';
import isEmpty      from 'is-empty';

const letters = ['A', 'B', 'C', 'D', 'E'];

class Question extends React.Component {

  constructor(props) {

    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {};

  }

  handleClick(letter){

    this.props.setLetter(this.props.id, letter);

  }

  shouldComponentUpdate(nextProps, nextState){

    if(this.props.choosed != nextProps.choosed){
      return true;
    }

    return true;

  }

  render(){

    const listItems = letters.map(function(letter){

      var className;

      if(!isEmpty(this.props.choosed)){

        if(this.props.choosed == this.props.correct && this.props.choosed == letter || this.props.choosed != this.props.correct && this.props.correct == letter){
          className = 'correct';
        }

        if(this.props.choosed != this.props.correct && this.props.choosed == letter){
          className = 'wrong';
        }

      }

      return <Letter key={letter.toString()} onClick={this.handleClick} className={className} letter={letter}/>;

    }.bind(this));

    var bsStyle;

    if(!isEmpty(this.props.choosed)){

      if(this.props.choosed == this.props.correct){
        bsStyle = 'success';
      }

      if(this.props.choosed != this.props.correct){
        bsStyle = 'danger';
      }

    }

    return (
      <Col xs={12} md={4} lg={3} >
        <ButtonGroup justified>
          <div className="btn-group" role="group">
            <Button bsStyle={bsStyle} bsSize="sm" active>{this.props.id}</Button>
          </div>
          {listItems}
        </ButtonGroup>
      </Col>
    );
  }

}

module.exports = Question;