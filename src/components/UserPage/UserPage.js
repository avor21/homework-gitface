import React, {Component} from "react";
import {connect} from "react-redux";
import {
  fetchUserRequest,
  getIsFetched,
  getIsFetching,
  getUserInfo
} from "../../ducks/users";
import {Container, Header, Icon, Image, Label, Segment} from "semantic-ui-react";

class UserPage extends Component{
  componentDidMount() {
    const { fetchUserRequest, isFetched } = this.props;
    isFetched && fetchUserRequest();
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
    const { login, followers, following, avatar_url: avatar } = this.props.user;
    return (
      <div className="container">
        <Image src={avatar} size="medium" circular floated='left' />
        <Container text >
        <Header as="h2" >{login}</Header>
        <Label as="a" color='olive'>
          Followers
          <Label.Detail>{followers}</Label.Detail>
        </Label>
        <Label as="a" color='olive'>
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