import React, {Component} from 'react';
import axios from 'axios';
import validatorApi from "./validatorApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { WindMillLoading } from 'react-loadingg';
import IndicatorGroup from "./reports/indicators/IndicatorGroup";
import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import PieChart from "./graphs/PieChart";
import ReportStats from "./reports/ReportStats";
import MathUtils from "./util/Math";
import ErrorAlert from "./util/ErrorAlert";

export const GroupCard = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 20px 25px;  
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

class Report extends Component {

    // Plan route data
    period = this.props.match.params.period;
    component = this.props.match.params.component;

    state = {
        name: '',
        description: '',
        stats: {},
        groups: [],
        isLoading: true,
        error: undefined
    }

    componentDidMount() {
        this.getPlanReport(this.period, this.component);
    }

    getPlanReport = (periodo = '46c50734-4710-008a-e053-ac10360c415f', componente = 'UTPL-TNCIV0055') => {
        axios.get(validatorApi.urls().report(periodo, componente))
            .then(response => {
                let data = response.data;
                this.setState({
                    name: data.nombre,
                    description: data.descripcion,
                    stats: data.resumen,
                    groups: data.grupos,
                    isLoading: false
                })
            })
            .catch(error => {
                let errorBody = {}
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.data.status) {
                        // console.log(error.response.data); // Handle custom error response
                        errorBody.status = error.response.data.status;
                        errorBody.message = error.response.data.message;
                    } else {
                        errorBody.status = error.response.status;
                        errorBody.message = error.message;
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    errorBody.status = 500;
                    errorBody.message = error.message;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    errorBody.status = 500;
                    errorBody.message = error.message;
                }
                console.log('Error analizando y recolectando datos del API', error)
                // Change state and show error
                this.setState({
                    isLoading: false,
                    error: errorBody
                })
            });
    };

    getGroups = () => {
        return this.state.groups.map((group, index) => (
            <IndicatorGroup
                key={index}
                name={group.nombre}
                data={group.indicadores}
            />
        ));
    }

    buildChartData = (failed, successful) => {
        let chartData = []
        chartData.push({
            "id": "Cumplen",
            "label": "Cumplen",
            "value": successful,
            "color": "#9ACD32"
        })
        chartData.push({
            "id": "No cumplen",
            "label": "No cumplen",
            "value": failed,
            "color": "#E30613"
        })
        return chartData
    }


    render() {
        const { isLoading, error, name, description, stats } = this.state;

        let successPercentage = 0;
        if (!isLoading)
            successPercentage = MathUtils.calculatePercentage(stats.exitosos, stats.totalIndicadores);

        return (
            <Container>
                { !isLoading ?
                    <div>
                        { !error ?
                            <div>
                                <GroupCard>
                                    <Row>
                                        <Col xl={8} lg={7}>
                                            <h1 style={{color: "#303F9F"}}>{name}</h1>
                                            <p style={{textAlign: "justify"}}>{description}</p>
                                            <ReportStats
                                                total={stats.totalIndicadores}
                                                successful={stats.exitosos}
                                                failed={stats.fallidos}
                                            />
                                        </Col>
                                        <Col xl={4} lg={5}>
                                            <PieChart
                                                successPercentage={successPercentage}
                                                data={this.buildChartData(stats.fallidos, stats.exitosos)}
                                            />
                                        </Col>
                                    </Row>
                                </GroupCard>
                                {this.getGroups()}
                            </div>
                        :
                            <ErrorAlert
                                {...error}
                            />
                        }
                    </div>
                    :
                    <div>
                        <WindMillLoading
                            color="#388E3C"
                            size="large"
                        />
                    </div>
                }
            </Container>
        )
    }
}

export default Report;
