import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import RemoveModal from '../../components/RemoveModal';

test('should render Remove Modal', () => {
  const wrapper = shallow(<RemoveModal/>);
  expect(wrapper).toMatchSnapshot();
});

test('should call onClickRemove on remove button click', () => {
  const onClickRemove = jest.fn();
  const wrapper = shallow(<RemoveModal onClickRemove={onClickRemove} />);
  wrapper.find('button').at(0).simulate('click');
  expect(onClickRemove).toHaveBeenCalled();
});

test('should close modal on cancel button click', () => {
  const handleCloseModal = jest.fn();
  const wrapper = shallow(<RemoveModal handleCloseModal={handleCloseModal} />);
  wrapper.find('button').at(1).simulate('click');
  expect(handleCloseModal).toHaveBeenCalled();
});