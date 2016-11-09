import React    from 'react';
import ReactDOM from 'react-dom';

import ButtonGroup  from 'react-bootstrap/lib/ButtonGroup';
import Button       from 'react-bootstrap/lib/Button';
import Col          from 'react-bootstrap/lib/Col';

import dia1Azul     from './../gabaritos/2016/dia1-azul.json';
import dia1Amarelo  from './../gabaritos/2016/dia1-amarelo.json';
import dia1branco   from './../gabaritos/2016/dia1-branco.json';
import dia1Rosa     from './../gabaritos/2016/dia1-rosa.json';

import Letter   from './components/Letter';
import Question from './components/Question';
import Day      from './components/Day';

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const gabaritosDayOne = [];

gabaritosDayOne['azul'] = dia1Azul;
gabaritosDayOne['amarelo'] = dia1Amarelo;
gabaritosDayOne['branco'] = dia1branco;
gabaritosDayOne['rosa'] = dia1Rosa;

class App extends React.Component {

  constructor(props) {

    super(props);

    this.lastQuestionClicked = null;

    this.correctCount = 0;
    this.wrongCount = 0;

    this.dayOneCorrectCount = 0;
    this.dayOneWrongCount = 0;

    this.dayTwoCorrectCount = 0;
    this.dayTwoWrongCount = 0;

    this.state = {
      dayOne : null,
      dayTwo : null,
      dayOneColors: ['azul', 'amarelo', 'branco', 'rosa'],
      dayTwoColors: ['amarelo', 'cinza', 'azul', 'rosa']
    }

    for (let i = 0; i < 90; i++) {
      this.state[i + 1] = {correct: null, choosed: null};
    }

    this.handleSetLetter = this.handleSetLetter.bind(this);

    this.colorClickDayOneHandle = this.colorClickDayOneHandle.bind(this);
    this.colorClickDayTwoHandle = this.colorClickDayTwoHandle.bind(this);
    this.updateDayOneTotalResult = this.updateDayOneTotalResult.bind(this);
    this.updateDayTwoTotalResult = this.updateDayTwoTotalResult.bind(this);

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

  getNewGabarito(gabarito){

    let data = gabaritosDayOne[gabarito];
    var newData = {};

    for (let d in data){

      newData[d] = {
        correct: data[d],
        choosed : null
      }

    }

    return newData;

  }

  colorClickHandle(e){

  }

  colorClickDayOneHandle(e){

    this.colorClickHandle(e);
    let data = this.getNewGabarito(e);

    data['dayOne'] = e;
    this.setState(data);

  }

  colorClickDayTwoHandle(e){

    this.colorClickHandle(e);
    let data = this.getNewGabarito(e);

    data['dayOne'] = e;
    this.setState(data);

  }

  updateDayOneTotalResult(correct, wrong){

    this.dayOneCorrectCount = correct;
    this.dayOneWrongCount = wrong;

  }

  updateDayTwoTotalResult(correct, wrong){

    this.dayTwoCorrectCount = correct;
    this.dayTwoWrongCount = wrong;

  }

  render(){

    return (
      <div>
        <Col lg={12} >
          <Day
            title="Primeiro Dia"
            lastQuestionClicked={this.lastQuestionClicked}
            gabaritoList={this.state.dayOneColors}
            gabarito={this.state.dayOne}
            colors={this.state.dayOneColors}
            onChangeColor={this.colorClickDayOneHandle}
            questions={this.state}
            handleSetLetter={this.handleSetLetter}
            updateResults={this.updateDayOneTotalResult}
            from={1}
            to={90}
          >
          </Day>
        </Col>
        <hr/>
      </div>
    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);