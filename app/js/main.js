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

    this.state = {
      dayOne : null,
      dayTwo : null,
      dayOneColors: ['azul', 'amarelo', 'branco', 'rosa'],
      dayTwoColors: ['amarelo', 'cinza', 'azul', 'rosa'],
    }

    this.handleSetLetter = this.handleSetLetter.bind(this);

  }

  handleSetLetter(id, letter){

    this.currentQuestions[id] = {
        correct: this.currentQuestions[id].correct,
        choosed : letter
    }

    this.setState({
      currentQuestions: this.currentQuestions
    });

  }

  colorClickHandle(e){

    let data = gabaritosDayOne[e];

    for (let d in data){

      this.currentQuestions[d] = {
        correct: data[d],
        choosed : null
      }

    }

    this.setState({
      dayOne: e,
      currentQuestions: this.currentQuestions
    });

  }

  render(){

    const questionItems = [];

    for (let d in this.state.currentQuestions){

      questionItems.push(<Question setLetter={this.handleSetLetter} id={d} key={d.toString()} correct={this.state.currentQuestions[d].correct} choosed={this.state.currentQuestions[d].choosed}/>)

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
        {questionItems}
      </div>
    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);