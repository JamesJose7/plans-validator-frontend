import React from "react";
import styled from "styled-components";
import {Row} from "react-bootstrap";

const DetailsContainer = styled(({ isopen, ...props}) => <Row {...props} />)`
    transition: all .5s ease-in-out;
    background-color: #F0F0F0;
    margin-top: -25px;
    border-radius: 0px 0px 30px 30px;
    padding: ${props => props.isopen ? '35px 10px 10px 10px' : '0'};
    max-height: ${props => props.isopen ? '900px' : '0'};
`;

const DetailsContent = styled.div`
    width: 100%;
    transition: all .5s ease-in-out;
    position: relative;
    overflow: hidden;
    z-index: 10;
    max-height: ${props => props.isopen ? '900px' : '0'};

`;

const DetailTitle = styled.h5`
    color: ${props => props.color};
    font-size: .8em;
    font-weight: bold;
    margin-bottom: 0;
    text-shadow: 1px 1px 1px rgba(0,0,0,.25);
`;

const Detail = styled.p`
    font-size: 1em;
`;

const IndicatorDetails = ({ isopen, errors, description }) => {

    return (
        <DetailsContainer
            isopen={isopen}
        >
            <DetailsContent
                isopen={isopen}
            >
                <div>
                    <DetailTitle>Descripción</DetailTitle>
                    <Detail>{description !== null || description !== '' ? description : 'Sin  descripción'}</Detail>
                </div>
                { errors.length > 0 ?
                    <div>
                        <DetailTitle color="#E30613">Errores</DetailTitle>
                        {errors.map((error, index) => (
                            <Detail
                                key={index}
                            >{ error }</Detail>
                        ))}
                    </div>
                    :
                    null
                }
            </DetailsContent>
        </DetailsContainer>
    );
}

export default IndicatorDetails;
