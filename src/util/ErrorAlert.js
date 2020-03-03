import React from "react";
import {GroupCard} from "../Report";
import styled from "styled-components";

const ErrorTitle = styled.h1`
    color: #D32F2F;
    font-size: 2.4em;
    margin-bottom: 20px;
`;

const StatusCode = styled.p`
    color: ${props => props.color};
    font-size: 3.8em;
    margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
    color: #212121;
    font-size: 1.2em;
`;

const ErrorAlert = ({ message, status }) => {
    // Status color code
    let color = "#212121";
    if (status >= 400)
        color = "#536DFE";
    if (status >= 500)
        color = "#F44336"

    return (
        <GroupCard style={{textAlign: "center", padding: "40px 30px"}}>
            <StatusCode
                color={color}
            >
                {status}
            </StatusCode>
            <ErrorTitle>Ha ocurrido un error!</ErrorTitle>
            <ErrorMessage>{message}</ErrorMessage>
        </GroupCard>
    )
}

export default ErrorAlert;
