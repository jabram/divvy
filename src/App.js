import React from 'react';
import MOCKS from './mock.json';

function Payment(props) {
  return (
    <div className="payment grid-row">
      <div className="date">{props.payment.date}</div>
      <div className="person">{props.payment.person}</div>
      <div className="description">{props.payment.description}</div>
      <div className="amount">{props.payment.amount}</div>
      <div className="paid">{props.payment.paid}</div>
      <div className="remaining">{props.payment.left}</div>
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
        <div className="date">Date</div>
        <div className="person">Person</div>
        <div className="description">Description</div>
        <div className="amount">Amount</div>
        <div className="paid">Total Paid</div>
        <div className="remaining">Now Left</div>
      </div>
      {payments.length ? payments : noPayments}
      <button className="add-payment">+ add payback</button>
    </div>
  )
}

function Person(props) {
  return (
    <div className="person grid-row">
      <div className="name">{props.person.name}</div>
      <div className="breakdown">
        $<input type="text" className="amount" />
        <input type="text" className="percentage" />%
      </div>
      <div className="should">{props.person.should}</div>
      <div className="paid">{props.person.paid}</div>
      <div className="remaining">{props.person.remaining}</div>
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
        <div className="name">Person</div>
        <div className="breakdown">Breakdown</div>
        <div className="should">Should</div>
        <div className="paid">Paid</div>
        <div className="remaining">Left</div>
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
          <div className="date">{this.props.transaction.date}</div>
          <div className="description left">{this.props.transaction.description}</div>
          <div className="amount">{this.props.transaction.amount}</div>
          <div className="my-stats">paid/should</div>
          <div className="remaining">left goes here</div>
          <div className="toggle-details" onClick={() => this.handleClick()}>
            <button>
              {this.state.expanded === true ? '-' : '+'}
            </button>
          </div>
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
        <div className="date">date</div>
        <div className="description left">description</div>
        <div className="amount">amount</div>
        <div className="my-stats">paid/should</div>
        <div className="remaining">remaining</div>
        <div className="toggle-details"></div>
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
