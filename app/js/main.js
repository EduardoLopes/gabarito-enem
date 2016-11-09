import React from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import data from './../gabaritos/2016/caderno-2-amarelo.json';

class Letter extends React.Component {


  constructor(props) {

    super(props);

    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(){

    this.props.onClick(this.props.letter);

  }

  render(){
    return (
      <div className="btn-group" role="group">
        <Button bsStyle={this.props.bsStyle} bsSize="large" onClick={this.handleClick} className={this.props.className}>{this.props.letter}</Button>
      </div>
    );
  }

}

class Question extends React.Component {

  constructor(props) {

    super(props);
    this.state = {correct: this.props.correct, id: this.props.id};
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(letter){

    this.setState({choosed: letter});

  }

  render(){



    const letters = ['A', 'B', 'C', 'D', 'E'];
    const listItems = letters.map(function(letter){

      var className;
      var bsStyle;

      if(typeof(this.state.choosed) != 'undefined'){

        if(this.state.choosed == this.state.correct && this.state.choosed == letter || this.state.choosed != this.state.correct && this.state.correct == letter){
          className = 'correct';
          //bsStyle = 'success';
        }

        if(this.state.choosed != this.state.correct && this.state.choosed == letter){
          className = 'wrong';
          //bsStyle = 'danger';
        }

      }

      return <Letter bsStyle={bsStyle} key={letter.toString()} onClick={this.handleClick} className={className} letter={letter}/>;

    }.bind(this));

    var bsStyle;

    if(typeof(this.state.choosed) != 'undefined'){

      if(this.state.choosed == this.state.correct){
        bsStyle = 'success';
      }

      if(this.state.choosed != this.state.correct){
        bsStyle = 'danger';
      }

    }

    return (
      <Col xs={12} md={4} lg={3} >
        <ButtonGroup justified>
          <div className="btn-group" role="group">
            <Button bsStyle={bsStyle} bsSize="large" active>{this.state.id}</Button>
          </div>
          {listItems}
        </ButtonGroup>
      </Col>
    );
  }

}

///data

const questionItems = [];

for (var d in data){
  questionItems.push(<Question id={d} key={d.toString()} correct={data[d]}/>)
}

ReactDOM.render(
  <div>
    {questionItems}
  </div>,
  document.getElementById('root')
);