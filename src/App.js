import React from 'react';
import MOCKS from './mock.json';

function Payment(props) {
  return (
    <div className="payment grid-row">
      <span className="date">{props.payment.date}</span>
      <span className="person">{props.payment.person}</span>
      <span className="description">{props.payment.description}</span>
      <span className="amount">{props.payment.amount}</span>
      <span className="paid">{props.payment.paid}</span>
      <span className="remaining">{props.payment.left}</span>
    </div>
  )
}

function Payments(props) {
  const noPayments = (
    <p className="no-content">nuttin yet</p>
  );

  let payments = [];
  if (props.payments) {
    props.payments.map((payment) => {
      return payments.push(<Payment payment={payment} />);
    });
  }

  return (
    <div className="payments">
      <h3 className="header">Payback History</h3>
      <div className="payment grid-row header">
        <span className="date">Date</span>
        <span className="person">Person</span>
        <span className="description">Description</span>
        <span className="amount">Amount</span>
        <span className="paid">Total Paid</span>
        <span className="remaining">Now Left</span>
      </div>
      {payments.length ? payments : noPayments}
      <button className="add-payment">+ add payback</button>
    </div>
  )
}

function Person(props) {
  return (
    <div className="person grid-row">
      <span className="name">{props.person.name}</span>
      <span className="breakdown">
        $<input type="text" className="amount" />
        <input type="text" className="percentage" />%
      </span>
      <span className="should">{props.person.should}</span>
      <span className="paid">{props.person.paid}</span>
      <span className="remaining">{props.person.remaining}</span>
    </div>
  )
}

function People(props) {
  const noPeople = (
    <p className="no-content">oh well ain't no people here</p>
  );

  let people = [];
  if (props.people) {
    props.people.map((person) => {
      return people.push(<Person key={person.id} person={person} />);
    });
  }

  return (
    <div className="people">
      <h3 className="header">Breakdown by Person</h3>
      <div className="person grid-row header">
        <span className="name">Person</span>
        <span className="breakdown">Breakdown</span>
        <span className="should">Should</span>
        <span className="paid">Paid</span>
        <span className="remaining">Left</span>
      </div>
      {people.length ? people : noPeople}
      <button className="add-person">+ add person</button>
    </div>
  )
}

function TransactionDetails(props) {
  return (
    <div className="transaction-details">
      <People people={props.people} />
      <Payments payments={props.payments} />
    </div>
  )
}

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  handleClick() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    let transactionClassNames = ['transaction'];
    if (this.state.expanded === true) {
      transactionClassNames.push('expanded');
    }

    return (
      <div className={transactionClassNames.join(' ')}>
        <div className="transaction-main grid-row">
          <span className="date">{this.props.transaction.date}</span>
          <span className="description left">{this.props.transaction.description}</span>
          <span className="amount">{this.props.transaction.amount}</span>
          <span className="my-stats">paid/should</span>
          <span className="remaining">left goes here</span>
          <span className="toggle-details" onClick={() => this.handleClick()}>
            <button>
              {this.state.expanded === true ? '-' : '+'}
            </button>
          </span>
        </div>
        <TransactionDetails
          people={this.props.transaction.people}
          payments={this.props.transaction.payments} />
      </div>
    )
  }
}

function Transactions(props) {
  const noTransactions = (
    <p className="no-content">no transactions yet!</p>
  );

  const transactions = [];
  props.transactions.map((transaction) => {
    return transactions.push(<Transaction key={transaction.id} transaction={transaction} />);
  });

  return (
    <div className="transactions">
      <h2>this is the transactions duh</h2>
      <div className="transaction-main grid-row header">
        <span className="date">date</span>
        <span className="description left">description</span>
        <span className="amount">amount</span>
        <span className="my-stats">paid/should</span>
        <span className="remaining">remaining</span>
        <span className="toggle-details"></span>
      </div>
        { transactions.length ? transactions : noTransactions }
    </div>
  )
}

export default function App(props) {

  return (
    <div>
      <h1>it's the app!</h1>
      <Transactions transactions={MOCKS} />
      <p>TODO: add transaction button goes here</p>
    </div>
  )
}
