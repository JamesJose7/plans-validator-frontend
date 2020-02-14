import React, {useEffect} from "react";
import styled from "styled-components";
import {Row} from "react-bootstrap";

const DetailsContainer = styled(Row)`
    min-height: 0px;
    transition: all .5s;
    background-color: #F0F0F0;
    margin-top: -25px;
    border-radius: 0px 0px 30px 30px;
    padding: ${props => props.isOpen ? '35px 10px 10px 10px' : '0'};
    height: ${props => props.isOpen ? '200px' : '0'};
`;

const IndicatorDetails = ({ isOpen }) => {

    return (
        <DetailsContainer
            isOpen={isOpen}
        >
        </DetailsContainer>
    );
}

export default IndicatorDetails;
