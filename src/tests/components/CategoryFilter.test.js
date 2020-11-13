import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import { CategoryFilter } from '../../components/CategoryFilter';
import { Multiselect } from 'multiselect-react-dropdown';

let setCategoryFilter, wrapper;

beforeEach(() => {
  setCategoryFilter = jest.fn();
  wrapper = shallow(
    <CategoryFilter 
      setCategoryFilter={setCategoryFilter}
    />
  );
});

test('should render CategoryTextFilter correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle Category select', () => {
  wrapper.find(Multiselect).prop('onSelect')('clothes');
  expect(setCategoryFilter).toHaveBeenLastCalledWith('clothes');
});

test('should handle Category remove', () => {
  wrapper.find(Multiselect).prop('onRemove')('housing');
  expect(setCategoryFilter).toHaveBeenLastCalledWith('housing');
});


