import moment from 'moment';

export default [{ 
  id: '1',
  description: 'Gum',
  note: '',
  amount: 195,
  createdAt: 0,
  isExpense: true,
  category: 'Food'
}, {
  id: '2',
  description: 'Rent',
  note: '',
  amount: 109500,
  createdAt: moment(0).subtract(4, 'days').valueOf(),
  isExpense: false,
  category: ''
}, {
  id: '3',
  description: 'Credit Card',
  note: '',
  amount: 4500,
  createdAt: moment(0).add(4, 'days').valueOf(),
  isExpense: true,
  category: 'Transportation'
}];