import React, { Component } from 'react'
import styled from 'styled-components'


const MoviecardContainer = styled.div`
    background: ${ props => props.poster ? `url(${props.poster}) no-repeat center` : 'black'};
    background-size: 100%;
    height: 240px;
    width: 160px;
    flex-shrink: 0;
    margin: 0 20px;
    transition: all 0.5s;
    &:hover {
        height: 300px;
        width: 200px;
    }
    @media(max-width: 1172px) {
        height: 200px;
        width: 120px;
        &:hover {
            height: 300px;
            width: 200px;
        }
    }
    @media(max-width: 850px) {
        height: 150px;
        width:80px;
        &:hover {
            height: 200px;
            width: 120px;
        }
    }
    @media(max-width: 550px) {
        height: 130px;
        width: 60px;
        &:hover {
            height: 150px;
            width: 90px;
        }
    }
`

class MovieCard extends Component {
    
    
    render() {
        const { moviePoster } = this.props.movie
        return (
            <MoviecardContainer  poster={ moviePoster } >
            </MoviecardContainer>
        )
    }
}

export default MovieCard