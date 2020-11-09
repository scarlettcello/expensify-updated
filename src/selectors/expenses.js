import moment from 'moment';

export default (expenses, { text, sortBy, startDate, endDate, categories }) => {
  return expenses.filter((expense) => {
    const textAndDateFilter = () => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch
    }

    if (categories.length < 1) {
      return textAndDateFilter();      
    } else {
      let categoryMatch;
      for (let i = 0; i< categories.length; i++) {
        if (categories[i].category === expense.category) {
          categoryMatch = expense;
        }
      }
      return textAndDateFilter() && categoryMatch;
    }
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } 
    
    if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }

    return null;
  });
}