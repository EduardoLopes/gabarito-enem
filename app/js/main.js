import React    from 'react';
import ReactDOM from 'react-dom';

import ButtonGroup  from 'react-bootstrap/lib/ButtonGroup';
import Button       from 'react-bootstrap/lib/Button';
import Col          from 'react-bootstrap/lib/Col';

import dia1Azul     from './../gabaritos/2016/dia1-azul.json';
import dia1Amarelo  from './../gabaritos/2016/dia1-amarelo.json';
import dia1branco   from './../gabaritos/2016/dia1-branco.json';
import dia1Rosa     from './../gabaritos/2016/dia1-rosa.json';


import dia2Amarelo  from './../gabaritos/2016/dia2-amarelo.json';
import dia2Cinza    from './../gabaritos/2016/dia2-cinza.json';
import dia2Azul     from './../gabaritos/2016/dia2-azul.json';
import dia2Rosa     from './../gabaritos/2016/dia2-rosa.json';

import Letter   from './components/Letter';
import Question from './components/Question';
import Day      from './components/Day';

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const gabaritosDayOne = [];
const gabaritosDayTwo = [];

gabaritosDayOne['azul'] = dia1Azul;
gabaritosDayOne['amarelo'] = dia1Amarelo;
gabaritosDayOne['branco'] = dia1branco;
gabaritosDayOne['rosa'] = dia1Rosa;

gabaritosDayTwo['amarelo'] = dia2Amarelo;
gabaritosDayTwo['cinza'] = dia2Cinza;
gabaritosDayTwo['azul'] = dia2Azul;
gabaritosDayTwo['rosa'] = dia2Rosa;

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
      dayTwoColors: ['amarelo', 'cinza', 'azul', 'rosa'],
      languageChoosed: null
    }

    for (let i = 0; i < 90; i++) {
      this.state[i + 1] = {correct: null, choosed: null};
    }

    this.handleSetLetter = this.handleSetLetter.bind(this);

    this.colorClickDayOneHandle = this.colorClickDayOneHandle.bind(this);
    this.colorClickDayTwoHandle = this.colorClickDayTwoHandle.bind(this);
    this.updateDayOneTotalResult = this.updateDayOneTotalResult.bind(this);
    this.updateDayTwoTotalResult = this.updateDayTwoTotalResult.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);

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

  getNewGabarito(data){

    var newData = {};

    for (let d in data){

      newData[d] = {
        correct: data[d],
        choosed : null
      }

    }

    return newData;

  }

  onChangeLanguage(e){

    let data = gabaritosDayTwo[this.state.dayTwo][e];
    let newData = {};

    for (let d in data){

      newData[d] = {
        correct: data[d],
        choosed : null
      }

    }

    newData['languageChoosed'] = e;

    this.setState(newData);

  }

  colorClickHandle(e){

  }

  colorClickDayOneHandle(e){

    this.colorClickHandle(e);
    let data = this.getNewGabarito(gabaritosDayOne[e]);

    data['dayOne'] = e;
    this.setState(data);

  }

  colorClickDayTwoHandle(e){

    this.colorClickHandle(e);
    let data = this.getNewGabarito(gabaritosDayTwo[e]);

    data['dayTwo'] = e;

    let language_data = gabaritosDayTwo[e][this.state.languageChoosed];
    let newData = {};

    for (let d in language_data){

      data[d] = {
        correct: language_data[d],
        choosed : null
      }

    }

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
        <Col lg={12} >
          <Day
            language
            title="Segundo Dia"
            onChangeLanguage={this.onChangeLanguage}
            languageChoosed={this.state.languageChoosed}
            lastQuestionClicked={this.lastQuestionClicked}
            gabaritoList={this.state.dayTwoColors}
            gabarito={this.state.dayTwo}
            colors={this.state.dayTwoColors}
            onChangeColor={this.colorClickDayTwoHandle}
            questions={this.state}
            handleSetLetter={this.handleSetLetter}
            updateResults={this.updateDayTwoTotalResult}
            from={91}
            to={180}
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