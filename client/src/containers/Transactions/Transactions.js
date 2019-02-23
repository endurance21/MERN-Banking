import React, { Component } from 'react'
import { Form, FormGroup, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import Modal from '../../components/Modal/Modal';
import SingleTransaction from './SingleTransaction';
import { connect } from 'react-redux';
import { getTransactions } from '../../actions/transactionsActions';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Transactions extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }
  render() {
    return (
      <TransactionsWrapper>
           <div className="header-wrapper">
                 <h6 className="header text-white">Transactions</h6>
            </div>
            <Container>
                <Row>
                    <Col md="4" className="my-5">
                        <Modal/>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Form className="mx-auto">
                            <FormGroup>
                                <Input
                                    className="form-control"
                                    type="text"
                                    name="search"
                                    placeholder="Search for transaction..."
                                    id="search"
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <h4 className="text-white my-3 text-center">History of your transactions</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <SingleTransaction/>
                    </Col>
                </Row>
            </Container>
        </TransactionsWrapper>
    )
  }
}

const TransactionsWrapper = styled.div`
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

Transactions.propTypes = {
    getTransactions: PropTypes.func.isRequired,
    transaction: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    transaction: state.transactions
});


export default connect(mapStateToProps, {getTransactions})(Transactions);