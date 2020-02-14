import React, {Component} from 'react';
import styled from "styled-components";
import {device} from '../../device'
import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import ArrowIcon from "../../icons/ArrowIcon";
import InfoIcon from "../../icons/InfoIcon";
import IndicatorDetails from "./IndicatorDetails";

class Indicator extends Component {

    state = {
        isOpen: false
    }

    handleOpenClose = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    render() {
        const { isOpen } = this.state;
        const {index, name, successful} = this.props;

        const NumberCircle = styled.div`
            background: #fff;
            text-align: center;
            display: inline-block;
            width: 40px;
            height: 40px;
            margin: 5px 0;
            border-radius: 100%;
            transition: box-shadow .8s;
            > p {
                line-height: 40px;
            }
        `;

        const IndicatorItem = styled(Row)`
            background: #F9F9F9;
            border-radius: 100px;
            cursor: pointer;
            position: relative;
            &:hover {
                ${NumberCircle} {
                    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
                }
            }
            @media ${device.medium} {
                .indicator-section {
                    border-right: 5px solid #fff;
                }
                .indicator-section:last-child {
                    padding-left: 0;
                }
            }
        `;

        const IndicatorName = styled.p`
            display: inline-block;
            margin-left: 15px;
        `;

        const ItemsContainer = styled.div`
            height: 53px;
            display: table;
            width: 100%;
        `;

        const CenterWrapper = styled.div`
            display: table-cell;
            vertical-align: middle;
        `;

        const colorSuccess = '#9ACD32'
        const colorFailure = '#E30613'
        const SuccessBar = styled(ProgressBar)`
            height: .5rem;
            .progress-bar {
              background-color: ${successful ? colorSuccess : colorFailure};
            }
        `;

        return (
            <div className="mb-3">
                <Container>
                    <IndicatorItem>
                        <Col md={7} lg={8} className="indicator-section">
                            <NumberCircle>
                                <p className="m-0">{index}</p>
                            </NumberCircle>
                            <IndicatorName>{name}</IndicatorName>
                        </Col>
                        <Col md={3} lg={3} className="indicator-section position-relative">
                            <ItemsContainer>
                                <CenterWrapper>
                                    <SuccessBar now={100}/>
                                </CenterWrapper>
                            </ItemsContainer>
                        </Col>
                        <Col md={2} lg={1} className="indicator-section border-0">
                            <ItemsContainer>
                                <CenterWrapper
                                    className="text-right"
                                >
                                    <InfoIcon
                                        successful={successful}
                                    />
                                    <ArrowIcon
                                        toggleOpenClose={this.handleOpenClose}
                                        isOpen={isOpen}
                                    />
                                </CenterWrapper>
                            </ItemsContainer>
                        </Col>
                    </IndicatorItem>
                    <IndicatorDetails
                        isOpen={isOpen}
                    />
                </Container>
                <div style={{height: '30px'}}></div>
            </div>
        )
    }

}

export default Indicator;
