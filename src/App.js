import React, {Component} from 'react';
import axios from 'axios';
import validatorApi from "./validatorApi";
import './App.css';

class App extends Component {

    componentDidMount() {
        this.getPlanReport();
    }

    getPlanReport = (periodo = '46c50734-4710-008a-e053-ac10360c415f', componente = 'UTPL-TNCIV0055') => {
        axios.get(validatorApi.urls().report(periodo, componente))
            .then(response => console.log(response.data))
            .catch(error => {
                if (error.response.data.status !== undefined)
                    console.log(error.response.data); // Handle custom error response
                else
                    console.log('Error analizando y recolectando datos del API', error)
            });
    };

    render() {
        return (
            <div className="App">

            </div>
        )
    }
}

export default App;
