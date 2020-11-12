export default (transactions) => {
  const reducer = (total, amount) => total + amount;

  if (transactions.length === 0) {
    return 0;
  } else {
    return transactions.map(item => item.amount).reduce(reducer, 0);
  }
}