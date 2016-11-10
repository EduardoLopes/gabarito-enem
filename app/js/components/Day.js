import React        from 'react';
import ButtonGroup  from 'react-bootstrap/lib/ButtonGroup';
import Button       from 'react-bootstrap/lib/Button';
import Col          from 'react-bootstrap/lib/Col';
import Question     from './Question';
import Results      from './Results';
import isEmpty      from 'is-empty';



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

    this.correctCount = 0;
    this.wrongCount = 0;

  }

  shouldComponentUpdate(nextProps, nextState){

    if(isEmpty(nextProps.lastQuestionClicked)){
      return true;
    }

    if(nextProps.lastQuestionClicked <= this.props.to && nextProps.lastQuestionClicked >= this.props.from){
      return true;
    }

    return false;

  }

  render(){

    let languageChoosed = this.props.languageChoosed;
    let results = null;

    this.correctCount = 0;
    this.wrongCount = 0;

    for (let d in this.props.questions){
      if(isNumber(d)){
        if(parseInt(d) <= parseInt(this.props.to) && parseInt(d) >= parseInt(this.props.from)){
          if(!isEmpty(this.props.questions[d].choosed)){
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

    if(isEmpty(this.props.language)){

      languageChoosed = "portugues";

    }

    if(!isEmpty(this.props.gabarito) && !isEmpty(languageChoosed)){

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

      results = <Results title={this.props.title} correctCount={this.correctCount} wrongCount={this.wrongCount} />;

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

    let listLanguageItems = [];

    if(!isEmpty(this.props.language) && !isEmpty(this.props.gabarito)){

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
      <Col lg={12} >
        <h2 className="center-text">{this.props.title}</h2>
        <ButtonGroup justified>
          {listItems}
        </ButtonGroup>
        <ButtonGroup justified>
          {listLanguageItems}
        </ButtonGroup>
        <div>
          {this.questionItems}
        </div>
        <div>
        {results}
        </div>
        <br />
      </Col>
    );
  }

}

module.exports = Day;