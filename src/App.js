import React, {Component} from 'react';
import axios from 'axios';
import validatorApi from "./validatorApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import IndicatorGroup from "./reports/indicators/IndicatorGroup";
import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import PieChart from "./graphs/PieChart";

export const GroupCard = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 20px 25px;  
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const data = [
    {
        "id": "ruby",
        "label": "ruby",
        "value": 201,
        "color": "hsl(319, 70%, 50%)"
    },
    {
        "id": "java",
        "label": "java",
        "value": 593,
        "color": "hsl(39, 70%, 50%)"
    },
    {
        "id": "c",
        "label": "c",
        "value": 258,
        "color": "hsl(205, 70%, 50%)"
    },
    {
        "id": "make",
        "label": "make",
        "value": 352,
        "color": "hsl(343, 70%, 50%)"
    },
    {
        "id": "rust",
        "label": "rust",
        "value": 490,
        "color": "hsl(100, 70%, 50%)"
    }
]

class App extends Component {

    state = {
        name: '',
        description: '',
        stats: {},
        groups: [],
        isLoading: true
    }

    componentDidMount() {
        this.getPlanReport();
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
                if (error.response.data.status !== undefined)
                    console.log(error.response.data); // Handle custom error response
                else
                    console.log('Error analizando y recolectando datos del API', error)
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
        const { isLoading, name, description, stats } = this.state;

        return (
            <Container>
                { !isLoading ?
                    <div>
                        <GroupCard>
                            <Row>
                                <Col md={8}>
                                    <h1>{name}</h1>
                                    <p>{description}</p>
                                    {/*<h4>Indicadores</h4>
                                    <p><strong>Total: </strong>{stats.totalIndicadores}</p>
                                    <p><strong>Cumplen: </strong>{stats.exitosos}</p>
                                    <p><strong>No cumplen: </strong>{stats.fallidos}</p>*/}
                                </Col>
                                <Col md={4}>
                                    <PieChart
                                        data={this.buildChartData(stats.fallidos, stats.exitosos)}
                                    />
                                </Col>
                            </Row>
                        </GroupCard>
                        {this.getGroups()}
                    </div>
                    :
                    <p>Cargando...</p>
                }
            </Container>
        )
    }
}

export default App;
