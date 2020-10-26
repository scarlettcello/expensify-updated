
export default (expenses) => {
  const reducer = (total, amount) => total + amount;

  if (expenses.length === 0) {
    return 0;
  } else {
    return expenses.map(item => item.amount).reduce(reducer, 0);
  }
}