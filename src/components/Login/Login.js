import React from "react";
import {Message, Divider, Input, Button, Segment} from "semantic-ui-react";
import './Login.css';

const Login = () => {
  return (
    <div>
      <Segment>
        <Input placeholder="Введите auth_token"/>
        <Button style={{marginLeft: '15px'}}
                primary disabled>Войти</Button>
      </Segment>
      <TokenInfo />
    </div>
  );
};

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