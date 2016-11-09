import React from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import dia1Azul from './../gabaritos/2016/dia1-azul.json';
import dia1Amarelo from './../gabaritos/2016/dia1-amarelo.json';
import dia1branco from './../gabaritos/2016/dia1-branco.json';
import dia1Rosa from './../gabaritos/2016/dia1-rosa.json';

const gabaritosDayOne = [];

gabaritosDayOne['azul'] = dia1Azul;
gabaritosDayOne['amarelo'] = dia1Amarelo;
gabaritosDayOne['branco'] = dia1branco;
gabaritosDayOne['rosa'] = dia1Rosa;

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

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
    this.handleClick = this.handleClick.bind(this);
    this.state = {};

  }

  handleClick(letter){

    this.props.setLetter(this.props.id, letter);

  }

  render(){

    const letters = ['A', 'B', 'C', 'D', 'E'];
    const listItems = letters.map(function(letter){

      var className;
      var bsStyle;

      if(typeof(this.props.choosed) != 'undefined'  && this.props.choosed !== null){

        if(this.props.choosed == this.props.correct && this.props.choosed == letter || this.props.choosed != this.props.correct && this.props.correct == letter){
          className = 'correct';
        }

        if(this.props.choosed != this.props.correct && this.props.choosed == letter){
          className = 'wrong';
        }

      }

      return <Letter bsStyle={bsStyle} key={letter.toString()} onClick={this.handleClick} className={className} letter={letter}/>;

    }.bind(this));

    var bsStyle;

    if(typeof(this.props.choosed) !== 'undefined' && this.props.choosed !== null){

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
            <Button bsStyle={bsStyle} bsSize="large" active>{this.props.id}</Button>
          </div>
          {listItems}
        </ButtonGroup>
      </Col>
    );
  }

}



///data

class App extends React.Component {

  constructor(props) {

    super(props);

    this.currentQuestions = {};
    this.questionItems = [];
    this.lastQuestionClicked = null;

    this.state = {
      dayOne : null,
      dayTwo : null,
      dayOneColors: ['azul', 'amarelo', 'branco', 'rosa'],
      dayTwoColors: ['amarelo', 'cinza', 'azul', 'rosa'],
    }

    for (let i = 0; i < 90; i++) {
      this.state[i + 1] = {correct: null, choosed: null};
    }

    this.handleSetLetter = this.handleSetLetter.bind(this);

  }

  handleSetLetter(id, letter){

    var newData = {};
    this.lastQuestionClicked = id;
    newData[id] = {
      correct: this.state[id].correct,
      choosed : letter
    };

    this.setState(newData);

  }

  colorClickHandle(e){


    this.questionItems = [];

    let data = gabaritosDayOne[e];

    var newData = {};

    for (let d in data){

      newData[d] = {
        correct: data[d],
        choosed : null
      }

    }

    newData['dayOne'] = e;

    this.setState(newData);

  }

  render(){

    if(this.state.dayOne != null){

      if(this.questionItems.length == 0){

        for (let d in this.state){

          if(isNumber(d)){
            this.questionItems[d] = <Question setLetter={this.handleSetLetter} id={d} key={d.toString()} correct={this.state[d].correct} choosed={this.state[d].choosed}/>;
          }

        }

      } else {
        this.questionItems[this.lastQuestionClicked] = <Question setLetter={this.handleSetLetter} id={this.lastQuestionClicked} key={this.lastQuestionClicked.toString()} correct={this.state[this.lastQuestionClicked].correct} choosed={this.state[this.lastQuestionClicked].choosed}/>;
      }

    }

    const listItems = this.state.dayOneColors.map(function(color){

      var className;
      var bsStyle;
      var active = false;

      if(color == this.state.dayOne){
        active = true;
      }

      return (
        <div key={color.toString() + 'group'} className="btn-group" role="group">
          <Button onClick={this.colorClickHandle.bind(this, color)} key={color.toString()} className={color} bsSize="sm" active={active}>{color}</Button>
        </div>
      )

    }.bind(this));

    return (
      <div>
        <Col lg={12} >
          <ButtonGroup justified>
            <div className="btn-group" role="group">
              <Button bsSize="sm" active>1° Dia:</Button>
            </div>
            {listItems}
          </ButtonGroup>
        </Col>
        {this.questionItems}
      </div>
    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);