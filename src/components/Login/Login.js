import React, {Component} from "react";
import {connect} from 'react-redux';
import {authRequest} from "../../ducks";
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
         <form onSubmit={this.onSubmitHandler}>
           <Input onChange={this.onChangeHandler}
                  value={token}
                  placeholder="Введите auth_token"/>
           <Button primary disabled={token === ''}
                   style={{marginLeft: '15px'}}>Войти</Button>
         </form>
       </Segment>
       <TokenInfo />
     </div>
    );
  }

  onChangeHandler = ({target: { value: token }}) => this.setState({token});
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.props.authRequest(this.state.token);
  };
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


export default connect(null, { authRequest })(Login);