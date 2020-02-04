import React from "react";
import {UserPage} from "./UserPage";
import {shallow} from 'enzyme';
import {LabelDetail} from "semantic-ui-react";


describe('[ UserPage ]', () => {

  it('имеет метод componentDidMount', () => {
      const wrapper = shallow(<UserPage fetchUserRequest={jest.fn()}/>);
      expect(wrapper.instance().componentDidMount).toBeDefined();
    });

  it('отображает лоадер при загрузке данных', () => {
    const wrapper = shallow(<UserPage fetchUserRequest={jest.fn()} isFetching={true} />);
    expect(wrapper.contains(<p>Загрузка...</p>)).toBeTruthy();
  });

  it('выводит сообщение об отсутствии пользователя, если isFetching === false && user == null', () => {
    const wrapper = shallow(
      <UserPage fetchUserRequest={jest.fn()}
                isFetching={false}
                user={null}
      />);
    expect(wrapper.contains(<p>Пользователь не найден</p>)).toBeTruthy();
  });

  describe('[ UserPage ] Информация о пользователе', () => {
    const user = {
      login: 'test',
      avatar_url: 'img_url',
      followers: 55,
      following: 100
    };

    const wrapper = shallow(
      <UserPage fetchUserRequest={jest.fn()}
                isFetching={false}
                isFetched={true}
                user={user}
      />);

    it('содержит аватар', () => {
      expect(wrapper.find('.user__avatar').prop('src')).toEqual(user.avatar_url);
    });

    it('содержит логин', () => {
      expect(wrapper.find('.user__login').dive().text()).toEqual(user.login);
    });

    it('отображает количество читателей', () => {
      expect(wrapper.find('.user__followers').contains(<LabelDetail>{user.followers}</LabelDetail>)).toBeTruthy();
    });

    it('отображает количество подписок', () => {
      expect(wrapper.find('.user__following').contains(<LabelDetail>{user.following}</LabelDetail>)).toBeTruthy();
    });

    it('содержит компонент Followers с передачей логин через props', () => {});
  })
});