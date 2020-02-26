import React, {Component} from 'react';
import styled from "styled-components";
import {device} from '../../device'
import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import ArrowIcon from "../../icons/ArrowIcon";
import InfoIcon from "../../icons/InfoIcon";
import IndicatorDetails from "./IndicatorDetails";

import MathUtils from "../../util/Math";

const colorSuccess = '#9ACD32';
const colorFailure = '#E30613';
const colorWarning = '#FFDB01';

const NumberCircle = styled.div`
    background: #fff;
    text-align: center;
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 5px 0;
    border-radius: 100%;
    font-weight: bold;
    transition: box-shadow .8s;
    > p {
        line-height: 40px;
    }
`;

const IndicatorItem = styled(Row)`
    background: #F9F9F9;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    z-index: 50;
    &:hover {
        ${NumberCircle} {
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        }
    }
    @media ${device.medium} {
        & {
            border-radius: 100px;
        }
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

const SuccessBar = styled(({color, ...props}) => <ProgressBar {...props} />)`
    height: .5rem;
    .progress-bar {
      background-color: ${props => props.color};
    }
`;

const RangeResult = styled.p`
    font-weight: bold;
    display: inline-block;
    position: absolute;
    vertical-align: middle;
    height: 53px;
    line-height: 53px;
    right: 15px;
    margin: 0;
`;

const RangeMinMax = styled.p`
    font-size: .8em;
    margin: 0;
    display: inline-block;
`;

const rangeColumnNumberStyles = {
    paddingLeft: '8px',
    paddingRight: '8px',
    textAlign: 'center'
}

const BinaryResultText = styled.p`
    font-size: 1.2em;
    margin: 0;
    color: ${props => props.color};
`;

class Indicator extends Component {

    state = {
        isopen: false
    }

    handleOpenClose = () => {
        this.setState(prevState => ({
            isopen: !prevState.isopen
        }))
    }

    render() {
        const { isopen } = this.state;
        const {index, type, name, result, description, errors} = this.props;

        // Find out if it has errors according to its type
        let hasErrors = errors.length > 0;

        return (
            <div className="mb-3">
                <Container>
                    <IndicatorItem
                        onClick={this.handleOpenClose}
                    >
                        <Col xs={12} md={7} lg={8} className="indicator-section">
                            <NumberCircle>
                                <p className="m-0">{index}</p>
                            </NumberCircle>
                            <IndicatorName>{name}</IndicatorName>
                            {type === 1 ?
                                <RangeResult>{result.resultado}</RangeResult>
                                : null
                            }
                        </Col>
                        <Col xs={9} md={3} lg={3} className="indicator-section position-relative">
                            {type === 1 ?
                                <RangeTypeResult
                                    result={result}
                                />
                                :
                                <BinaryTypeResult
                                    result={result}
                                />
                            }
                        </Col>
                        <Col xs={3} md={2} lg={1} className="indicator-section border-0">
                            <ItemsContainer>
                                <CenterWrapper
                                    className="text-right"
                                >
                                    <InfoIcon
                                        successful={!hasErrors}
                                    />
                                    <ArrowIcon
                                        isopen={isopen}
                                    />
                                </CenterWrapper>
                            </ItemsContainer>
                        </Col>
                    </IndicatorItem>
                    <IndicatorDetails
                        isopen={isopen}
                        description={description}
                        errors={errors}
                    />
                </Container>
                <div style={{height: '30px'}}></div>
            </div>
        )
    }

}

const BinaryTypeResult = ({result}) => {

    return (
        <ItemsContainer>
            <CenterWrapper className="text-center">
                <BinaryResultText
                    color={result ? colorSuccess : colorFailure}
                >{result ? 'Cumple' : 'No cumple'}</BinaryResultText>
            </CenterWrapper>
        </ItemsContainer>
    )
}

const RangeTypeResult = ({ result }) => {
    const {resultado, min, max} = result;

    const barPercentage = MathUtils.calculateRangePercentage(min, max, resultado);
    let barColor = colorFailure;
    if (barPercentage > 20 && barPercentage < 80)
        barColor = colorWarning;
    if (barPercentage >= 40 && barPercentage <= 60)
        barColor = colorSuccess;

    return (
        <Row>
            <Col xs={2} style={rangeColumnNumberStyles}>
                <ItemsContainer>
                    <CenterWrapper>
                        <RangeMinMax>{min}</RangeMinMax>
                    </CenterWrapper>
                </ItemsContainer>
            </Col>
            <Col xs={8} className="p-0">
                <ItemsContainer>
                    <CenterWrapper>
                        <SuccessBar
                            now={barPercentage}
                            color={barColor}
                        />
                    </CenterWrapper>
                </ItemsContainer>
            </Col>
            <Col xs={2} style={rangeColumnNumberStyles}>
                <ItemsContainer>
                    <CenterWrapper>
                        <RangeMinMax>{max}</RangeMinMax>
                    </CenterWrapper>
                </ItemsContainer>
            </Col>
        </Row>
    )
}

export default Indicator;
