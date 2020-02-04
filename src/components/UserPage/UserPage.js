import React, {Component} from "react";
import {connect} from "react-redux";
import {
  fetchUserRequest,
  getIsFetched,
  getIsFetching,
  getUserInfo
} from "../../ducks/users";
import {Container, Header, Image, Label, Segment} from "semantic-ui-react";

export class UserPage extends Component{
  componentDidMount() {
    const { fetchUserRequest, isFetched } = this.props;
    !isFetched && fetchUserRequest();
  }

  render() {
    const { isFetching} = this.props;

    return (
      <Segment placeholder compact>
        { isFetching ? this.renderPreloader() : this.renderUserCard() }

      </Segment>
    );
  }

  renderUserCard = () => {
    const {user, isFetching} = this.props;
    if(isFetching || user == null) return <p>Пользователь не найден</p>
    const { login, followers, following, avatar_url: avatar } = user;
    return (
      <div className="container">
        <Container text >
          <Image src={avatar} className="user__avatar" size="medium" circular floated='left' />
          <Header as="h2" className="user__login">{login}</Header>
          <Label as="a" color='olive' className="user__followers">
            Followers
            <Label.Detail>{followers}</Label.Detail>
          </Label>
          <Label as="a" color='olive' className="user__following">
            Following
            <Label.Detail>{following}</Label.Detail>
          </Label>
        </Container>
      </div>
    );
  };

  renderPreloader = () => <p>Загрузка...</p>;

}

export default connect(state => ({
  isFetching: getIsFetching(state),
  isFetched: getIsFetched(state),
  user: getUserInfo(state)
}), { fetchUserRequest })(UserPage);