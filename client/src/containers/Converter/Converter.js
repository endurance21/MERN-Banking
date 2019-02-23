import React from 'react';
import {Button} from 'reactstrap';
import styled from 'styled-components';
import { connect } from "react-redux";
import {getCurrencies} from '../../actions/converterActions';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Input } from 'reactstrap';
class Converter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             currencies: [],
             from: 'EUR',
             to: 'USD',
             result: null,
             amount: 1

        };
    }
    componentDidMount() {
      axios
      .get('https://cors-anywhere.herokuapp.com/https://data.fixer.io/api/latest?access_key=584b3f3eea42ceda55cd121bd432d4b5')
      .then(response => {
        const currencyArr = [];
        for(const key in response.data.rates) {
            currencyArr.push(key);

        }
        this.setState({
            currencies: currencyArr.sort()
        })
      })
      .catch(err => {
            console.log("Opps", err.message);
      });
      console.log(this.response)
    }

    render() {
      console.log(this.state.currencies);
      return (
        <ConverterWrapper>
            <div className="header-wrapper">
                 <h6 className="header text-white">Currency Converter</h6>
            </div>
            <Container>
              <Row>
                <div className="card">
                <div className="card-body mx-auto">
                                  <form>
                                  <span className="amount text-white">Amount</span>
                                    <div className="form-group">
                                    <input
                                          className="amount-input"
                                          type="text"
                                          name="amount"
                                          value={this.state.amount}
                                          onChange={(event) => this.setState({
                                              amount: event.target.value
                                          })}
                                      />
                                    </div>
                                    <div className="form-group">
                                    <span className="from text-white">From</span>
                                        <select
                                            name="from"
                                            onChange={(event) => this.handleSelection(event)}
                                            value={this.state.from}>
                                            {this.state.currencies.map((cur, i) => (
                                                <option key={i}>{cur}</option>
                                            ))}
                                          </select>
                                        <span className="to text-white">To</span>
                                        <select
                                            name="to"
                                            onChange={(event) => this.handleSelection(event)}
                                            value={this.state.to}>
                                        {this.state.currencies.map((cur, i) => (
                                            <option key={i}>{cur}</option>
                                        ))}
                                      </select>
                                    </div>
                                  </form>
                                  {this.state.result && <h3 className="result py-3">{this.state.result}</h3>}
                                  <Button color="primary" size="lg">Convert</Button>
                              </div>
                </div>
              </Row>
            </Container>
        </ConverterWrapper>
      );
    }

  }


const ConverterWrapper = styled.div`
margin-left: 2rem;
width: 70rem;
height: auto;
background-color: #3a4149;
border: 1px solid #000;
.header {
  text-align: left;
  font-family: 'Open Sans';
  padding: 1.3rem 1rem 1rem 1rem;
}
.text-white {
  font-family: Open Sans;
}
.header-wrapper {
  background-color: #343b41;
  border-bottom: 1px solid #000;
}
.horizontal-line {
  border-bottom: 1px solid #fff;
  width: 100%;
}
`;

const mapStateToProps = state => {
  return {
    currencies: state.cur
  }
}

export default connect(mapStateToProps, {getCurrencies})(Converter);