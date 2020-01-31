import React, {Component} from "react";
import {connect} from "react-redux";
import {
  fetchUserRequest,
  getIsFetched,
  getIsFetching,
  getUserInfo
} from "../../ducks/users";
import {Header, Image, Label, Segment} from "semantic-ui-react";

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
      <div>
        <Image src={avatar} size="medium" circular floated='left' />
        <Header as="h2">{login}</Header>
        <Label>
          Followers
          <Label.Detail>{followers}</Label.Detail>
        </Label>
        <Label>
          Following
          <Label.Detail>{following}</Label.Detail>
        </Label>
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