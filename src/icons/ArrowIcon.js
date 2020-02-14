import React from "react";
import styled from "styled-components";

const IconWrapper = styled.div`
        display: inline-block;
        svg {
            fill-opacity: 54%;
            transition: transform .3s ease-in-out;
            transform: ${props => props.isopen ? 'rotate(180deg)' : 'rotate(0deg)'};
        }
    `;

const ArrowIcon = ({ isopen }) => {

    return (
        <IconWrapper
            isopen={isopen}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"
                >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                <path d="M0 0h24v24H0V0z" fill="none"/>
            </svg>
        </IconWrapper>
    );
}

export default ArrowIcon;
