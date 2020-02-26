import React from "react";
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import {device} from "../device";

const StatItem = styled.div`
    background-color: #F9F9F9;
    padding: 10px 15px;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 30px;
    .title, .stat {
        margin: 0;
    }
    .title {
        font-size: .8em;
    }
    .stat {
        font-size: 1.5em;
        margin-bottom: 5px;
        color: #303F9F;
    }
    
    @media ${device.medium} {
          & {
              margin-bottom: 0;  
          }
    }
`;

const ReportStats = ({ total, successful, failed }) => {
    return (
        <Container>
            <Row>
                <Col md={4} xs={12}>
                    <StatItem>
                        <p className="stat">{total}</p>
                        <p className="title">Total</p>
                    </StatItem>
                </Col>
                <Col md={4} xs={6}>
                    <StatItem>
                        <p className="stat">{successful}</p>
                        <p className="title">Cumplen</p>
                    </StatItem>
                </Col>
                <Col md={4} xs={6}>
                    <StatItem>
                        <p className="stat">{failed}</p>
                        <p className="title">No cumplen</p>
                    </StatItem>
                </Col>
            </Row>
        </Container>
    )
}

export default ReportStats;
