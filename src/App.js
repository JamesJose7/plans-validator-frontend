import React, {Component} from 'react';
import axios from 'axios';
import validatorApi from "./validatorApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import IndicatorList from "./reports/indicators/IndicatorList";
import {Container} from "react-bootstrap";

class App extends Component {

    state = {
        indicators: [],
        isLoading: true
    }

    componentDidMount() {
        this.getPlanReport();
    }

    getPlanReport = (periodo = '46c50734-4710-008a-e053-ac10360c415f', componente = 'UTPL-TNCIV0055') => {
        axios.get(validatorApi.urls().report(periodo, componente))
            .then(response => {
                this.setState({
                    indicators: response.data.indicadores,
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

    render() {
        const { indicators, isLoading } = this.state;

        return (
            <Container>
                { !isLoading ?
                    <IndicatorList
                        data={indicators}
                    />
                    :
                    <p>Cargando...</p>
                }
            </Container>
        )
    }
}

export default App;
