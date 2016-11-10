import React  from 'react';
import Button from 'react-bootstrap/lib/Button';
import Col    from 'react-bootstrap/lib/Col';

class Results extends React.Component {

  render(){

    return (
      <div>
        <h3>Resultado do {this.props.title}: </h3>
        Acertos: {this.props.correctCount} <br/>
        Erros: {this.props.wrongCount}
      </div>
    );

  }

}

module.exports = Results;