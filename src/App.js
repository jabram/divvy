import React, { Component } from 'react';
import MOCKS from './mock.json';


function Header(props) {
  return (
    <div className="header">
      <a href="/dashboard">dashboard</a>
      <div className="actions">
        <a href="/people">People</a>
        <a href="/settings">Settings</a>
      </div>
      <h1>The Name of This Divvy</h1>
    </div>
  )
}

function TotalBalance(props) {
  return (
    <div className="totals">
      <h2>I owe/I am owed <span className="currency">$1000.00</span></h2>

      <div className="breakdown-by-person">
        <h3>breakdown:</h3>
        <div>
          <p className="key">red</p>
          <p className="name">Person A</p>
          <p className="owes">owes me</p>
          <p className="currency">$100.00</p>
        </div>
        <div>
          <p className="key">orange</p>
          <p className="name">Person B</p>
          <p className="owes">I owe</p>
          <p className="currency">$10,000.00</p>
        </div>
        <div>
          <p className="key">yellow</p>
          <p className="name">Person C</p>
          <p className="owes">even</p>
          <p className="currency">$0.00</p>
        </div>
        <div>
          <p className="key">green</p>
          <p className="name">Person D</p>
          <p className="owes">owes me</p>
          <p className="currency">$20.00</p>
        </div>
      </div>
    </div>
  )
}

function IndividualResponsibility(props) {
  return (
    <div>
      <p className="person">{props.individual.person}</p>
      <p className="pay">{props.individual.pay}</p>
      <p className="owe">{props.individual.owe}</p>
    </div>
  );
}

function TransactionBreakdown(props) {
  const fullBreakdown = [];
  props.breakdown.forEach((individual, index) => {
    fullBreakdown.push(
      <IndividualResponsibility individual={individual} key={index} />
    );
  });

  return (
    <div className="breakdown-by-person">
      <p className="breakdown">breakdown:</p>
      <div className="header">
        <p className="person">person</p>
        <p className="pay">will pay</p>
        <p className="owe">will owe</p>
      </div>
      {fullBreakdown}
    </div>
  );
}

function Transaction(props) {
  return (
    <div className="transaction">
      <p className="date">{props.transaction.date}</p>
      <p className="description">{props.transaction.description}</p>
      <p className="amount currency">{props.transaction.amount}</p>
      <p className="my-delta currency">{props.transaction.myDelta}</p>
      <p className="toggle"><button>+ expand</button></p>
      <TransactionBreakdown breakdown={props.transaction.breakdown} />
    </div>
  );
}

function Transactions(props) {
  const allTransactions = [];
  props.transactions.forEach((transaction, index) => {
    allTransactions.push(
      <Transaction transaction={transaction} key={index} />
    )
  });
  return (
    <div className="transactions">
      <h2>All Transactions</h2>
      <div className="header">
        <p className="date">date</p>
        <p className="description">description</p>
        <p className="amount">amount</p>
        <p className="my-delta">my &Delta;</p>
        <p className="toggle"></p>
      </div>
      {allTransactions}
    </div>
  );
}


export default function App(props) {
  return (
    <div>
      <Header />
      <TotalBalance />
      <Transactions transactions={MOCKS} />
    </div>
  )
}
