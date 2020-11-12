import moment from 'moment';

export default (transactions, { text, sortBy, startDate, endDate, categories }) => {
  return transactions.filter((transaction) => {
    const textAndDateFilter = () => {
      const createdAtMoment = moment(transaction.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
      const textMatch = transaction.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch
    }

    if (categories.length < 1) {
      return textAndDateFilter();      
    } else {
      let categoryMatch;
      for (let i = 0; i< categories.length; i++) {
        if (categories[i].category === transaction.category) {
          categoryMatch = transaction;
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