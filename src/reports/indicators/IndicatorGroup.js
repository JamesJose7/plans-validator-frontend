import React from 'react';
import styled from "styled-components";
import Indicator from "./Indicator";
import {Container} from "react-bootstrap";

const GroupCard = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 20px 25px;  
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const IndicatorGroup = ({ name, data }) => {

    let indicators;
    if (data.length > 0) {
        indicators = data.map( (indicator, index) =>
            <Indicator
                key={indicator.id}
                index={index + 1}
                type={indicator.tipo}
                name={indicator.nombre}
                result={indicator.resultado}
                criteria={indicator.criterio}
                description={indicator.descripcion}
                errors={indicator.errores === null ? [] : indicator.errores}
            />
        )
    } else
        indicators = <p>No hay indicadores en este reporte</p>

    return (
        <div>
            <GroupCard>
                <h2 className="mb-3">{name}</h2>
                <Container>
                    {indicators}
                </Container>
            </GroupCard>
        </div>
    );
}

export default IndicatorGroup;
