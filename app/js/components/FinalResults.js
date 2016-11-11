import React    from 'react';
import Button   from 'react-bootstrap/lib/Button';
import Col      from 'react-bootstrap/lib/Col';
import isEmpty  from 'is-empty';

class FinalResults extends React.Component {

  render(){

    let dayOne = null;
    let dayTwo = null;
    let language = null;
    let total = null;
    let title = null;

    if(!isEmpty(this.props.dayOne)){

      dayOne = (
        <div>
          <b>Primeiro dia:</b> Caderno {this.props.dayOne}<br />
          - <b>Acertos:</b> {this.props.dayOneCorrectCount}<br />
          - <b>Erros:</b> {this.props.dayOneWrongCount}<br />
        </div>
      );

    }

    if(!isEmpty(this.props.dayTwo)){

      dayTwo = (
        <div>
          <b>Segundo dia:</b> Caderno {this.props.dayTwo}<br />
          - <b>Acertos:</b> {this.props.dayTwoCorrectCount}<br />
          - <b>Erros:</b> {this.props.dayTwoWrongCount}<br />
        </div>
      );

    }

    if(!isEmpty(this.props.languageChoosed)){
      language = (
        <div>
          <b>Linguagem:</b> {this.props.languageChoosed}
        </div>
      );

    }

    if(this.props.dayOneCorrectCount > 0 || this.props.dayOneWrongCount > 0 || this.props.dayTwoCorrectCount > 0 || this.props.dayTwoWrongCount > 0 ){
      total = (
        <div>
          <b>Total de acertos:</b> {this.props.dayOneCorrectCount + this.props.dayTwoCorrectCount} <br/>
          <b>Total de erros:</b> {this.props.dayOneWrongCount + this.props.dayTwoWrongCount} <br/>
        </div>
      );
    }

    if(!isEmpty(dayOne) || !isEmpty(dayTwo) || !isEmpty(language) || !isEmpty(total)){

      title = <h2>Resumo Final: </h2>;

    }

    return (
      <div>
        {title}
        {dayOne}<br/>
        {dayTwo}
        {language}<br/>
        {total}
      </div>
    );

  }

}

module.exports = FinalResults;