import React, {Component} from "react";
import {Message, Divider, Input, Button, Segment} from "semantic-ui-react";
import './Login.css';

class Login extends Component {
  state = {
    token: ''
  };

  render() {
    const { token } = this.state;

    return (
     <div>
       <Segment>
         <Input onChange={this.onChangeHandler}
                value={token}
                placeholder="Введите auth_token"/>
         <Button primary disabled={token === ''}
                 onClick={this.onClickHandler}
                 style={{marginLeft: '15px'}}>Войти</Button>
       </Segment>
       <TokenInfo />
     </div>
    );
  }

  onChangeHandler = ({target: { value: token }}) => this.setState({token});
  onClickHandler = () => { /*ToDo: call actionCreator*/  };
}

const TokenInfo = () => {
  return (
    <Message info>
      <Message.Header>Как получить токен github?</Message.Header>
      <Divider />
      <p>
        Вы можете создать его по  <a href="https://github.com/settings/tokens">ссылке</a>.
        <br />
        Не забудьте записать токен, т.к. после создания
        доступ к нему предоставляется только один раз.
      </p>
    </Message>
  );
};


export default Login;