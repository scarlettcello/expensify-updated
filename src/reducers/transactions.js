const transactionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [ ...state, action.transaction ]
    case 'REMOVE_TRANSACTION':
      return state.filter(({ id }) => id !== action.id );
    case 'EDIT_TRANSACTION':
      return state.map((transaction) => {
        if (transaction.id === action.id) {
          return { ...transaction, ...action.updates}
        } else {
          return transaction;
        }
      });
    case 'SET_TRANSACTIONS':
      return action.transactions;
    default:
      return state;
  }
}

export default transactionsReducer;
