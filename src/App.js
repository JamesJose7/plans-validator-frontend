import React, {Component} from 'react';
import axios from 'axios';
import validatorApi from "./validatorApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import IndicatorGroup from "./reports/indicators/IndicatorGroup";
import {Container} from "react-bootstrap";

class App extends Component {

    state = {
        groups: [],
        isLoading: true
    }

    componentDidMount() {
        this.getPlanReport();
    }

    getPlanReport = (periodo = '46c50734-4710-008a-e053-ac10360c415f', componente = 'UTPL-TNCIV0055') => {
        axios.get(validatorApi.urls().report(periodo, componente))
            .then(response => {
                this.setState({
                    groups: response.data.grupos,
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


    render() {
        const { isLoading } = this.state;

        return (
            <Container>
                { !isLoading ?
                    <div>{this.getGroups()}</div>
                    :
                    <p>Cargando...</p>
                }
            </Container>
        )
    }
}

export default App;
