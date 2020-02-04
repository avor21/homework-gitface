import React from "react";
import {UserPage} from "./UserPage";
import {shallow, mount} from 'enzyme';



describe('[ UserPage ]', () => {

  it('имеет метод componentDidMount', () => {
      const wrapper = shallow(<UserPage fetchUserRequest={jest.fn()}/>);
      expect(wrapper.instance().componentDidMount).toBeDefined();
    });

  it('отображает лоадер при загрузке данных', () => {
    const wrapper = mount(<UserPage fetchUserRequest={jest.fn()} isFetching={true} />);
    expect(wrapper.containsMatchingElement(<p>Загрузка...</p>)).toBeTruthy();
  });

  it('выводит сообщение об отсутствии пользователя, если isFetching === false && user == null', () => {
    const wrapper = mount(
      <UserPage fetchUserRequest={jest.fn()}
                isFetching={false}
                user={null}
      />);
    expect(wrapper.containsMatchingElement(<p>Пользователь не найден</p>)).toBeTruthy();
  });

  describe('[ UserPage ] Информация о пользователе', () => {
    const user = {
      login: 'test',
      avatar_url: 'img_url',
      followers: 55,
      following: 100
    };

    const wrapper = mount(
      <UserPage fetchUserRequest={jest.fn()}
                isFetching={false}
                isFetched={true}
                user={user}
      />);

    it('содержит аватар', () => {
      expect(wrapper.find('img.user__avatar')).toHaveLength(1);
    });

    it('содержит логин', () => {
      expect(wrapper.text().includes(user.login)).toBeTruthy();
    });

    it('отображает количество читателей', () => {
      expect(wrapper.text().includes(user.followers)).toBeTruthy();
    });

    it('отображает количество подписок', () => {
      expect(wrapper.text().includes(user.following)).toBeTruthy();
    });

    it('содержит компонент Followers с передачей логин через props', () => {});
  })
});