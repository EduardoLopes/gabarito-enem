import React        from 'react';
import ButtonGroup  from 'react-bootstrap/lib/ButtonGroup';
import Button       from 'react-bootstrap/lib/Button';
import Col          from 'react-bootstrap/lib/Col';
import Question     from './Question';



function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class Day extends React.Component {

  constructor(props) {

    super(props);

    this.colorClickHandle = this.colorClickHandle.bind(this);
    this.languageClickHandle = this.languageClickHandle.bind(this);
    this.handleSetLetter = this.handleSetLetter.bind(this);
    this.questionItems = [];

    this.correctCount = 0;
    this.wrongCount = 0;

  }

  colorClickHandle(e){

    this.questionItems.length = 0;
    this.props.onChangeColor(e);

  }

  languageClickHandle(e){

    this.props.onChangeLanguage(e);

    this.questionItems.length = 0;

  }

  handleSetLetter(id, letter){

    this.props.handleSetLetter(id, letter);

  }

  render(){

    if(this.props.gabarito != null && this.props.languageChoosed != null){

      if(this.questionItems.length == 0){

        for (let d in this.props.questions){

          if(isNumber(d)){
            if(parseInt(d) <= this.props.to && parseInt(d) >= this.props.from){
              this.questionItems[d] = <Question setLetter={this.props.handleSetLetter} id={d} key={d.toString()} correct={this.props.questions[d].correct} choosed={this.props.questions[d].choosed}/>;
            }
          }

        }

      } else {
        if(parseInt(this.props.lastQuestionClicked) <= this.props.to && parseInt(this.props.lastQuestionClicked) >= this.props.from){
          this.questionItems[this.props.lastQuestionClicked] = <Question setLetter={this.handleSetLetter} id={this.props.lastQuestionClicked} key={this.props.lastQuestionClicked.toString()} correct={this.props.questions[this.props.lastQuestionClicked].correct} choosed={this.props.questions[this.props.lastQuestionClicked].choosed}/>;
        }
      }

    }

    const listItems = this.props.colors.map(function(color){

      var className;
      var bsStyle;
      var active = false;

      if(color == this.props.gabarito){
        active = true;
      }

      return (
        <div key={color.toString() + 'group'} className="btn-group" role="group">
          <Button onClick={this.colorClickHandle.bind(this, color)} key={color.toString()} className={color} bsSize="sm" active={active}>{color}</Button>
        </div>
      )

    }.bind(this));

    this.correctCount = 0;
    this.wrongCount = 0;

    for (let d in this.props.questions){
      if(isNumber(d)){
        if(parseInt(d) <= parseInt(this.props.to) && parseInt(d) >= parseInt(this.props.from)){
          if(typeof(this.props.questions[d].choosed) !== 'undefined' && this.props.questions[d].choosed !== null){
            if(this.props.questions[d].correct == this.props.questions[d].choosed){

              this.correctCount += 1;

            }

            if(this.props.questions[d].correct != this.props.questions[d].choosed){

              this.wrongCount += 1;

            }
          }
        }
      }
    }

    let listLanguageItems = [];

    if(this.props.language && this.props.gabarito){

      listLanguageItems = ["ingles", "espanhol"].map(function(language){

        var className;
        var bsStyle;
        var active = false;

        if(language == this.props.languageChoosed){
          active = true;
        }

        return (
          <div key={language.toString() + 'group'} className="btn-group" role="group">
            <Button onClick={this.languageClickHandle.bind(this, language)} key={language.toString()} className={language} bsSize="sm" active={active}>{language}</Button>
          </div>
        )

      }.bind(this));

    }

    return (
      <div>
          <hr/>
          <h2 className="center-text">{this.props.title}</h2>
          <ButtonGroup justified>
            {listItems}
          </ButtonGroup>
          <ButtonGroup justified>
            {listLanguageItems}
          </ButtonGroup>
          {this.questionItems}
          <h3>Resultado do {this.props.title}: </h3>
          Acertos: {this.correctCount} <br/>
          Erros: {this.wrongCount}
        <hr/>
      </div>
    );
  }

}

module.exports = Day;