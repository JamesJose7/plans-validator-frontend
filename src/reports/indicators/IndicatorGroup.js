import React from 'react';
import Indicator from "./Indicator";
import {Container} from "react-bootstrap";
import {GroupCard} from "../../Report";
import {device} from '../../device'
import styled from "styled-components";

const IndicatorsContainer = styled(Container)`
    padding-left: 0;
    padding-right: 0;
    @media ${device.medium} {
        & {
            padding-left: 15px;
            padding-right: 15px;
        }
    }
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
                <h2 className="mb-3" style={{color: "#303F9F"}}>{name}</h2>
                <IndicatorsContainer>
                    {indicators}
                </IndicatorsContainer>
            </GroupCard>
        </div>
    );
}

export default IndicatorGroup;
