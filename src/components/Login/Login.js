import React from "react";
import {Message, Divider, Input, Button, Segment} from "semantic-ui-react";
import './Login.css';

const Login = () => {
  return (
    <div>
      <Message warning>
        <Message.Header>Авторизация</Message.Header>
        <Divider />
        <p>
          Получить токен следует на своей странице github.
          Перейдите по <a href="https://github.com/settings/tokens">адресу</a>
          и создайте себе токен.
          Запишите куда нибудь токен, так как после создания
          доступ к нему будет только один раз.
        </p>
      </Message>
      <Segment>
        <Input placeholder="Введите auth_token"/>
        <Button style={{marginLeft: '15px'}}
                primary disabled>Войти</Button>
      </Segment>
    </div>
  );
};

export default Login;