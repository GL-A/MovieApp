import React, { Component } from 'react'
import { Link } from 'react-static'
import MovieCard from './MovieCard'
import styled from 'styled-components'

const SliderContainer = styled.section`
    background: ${ props => props.background ? props.background : '#fff' };
    padding: 40px 10px;
    overflow: hidden;
    @media(max-width: 1172px) {
        padding: 30px 8px;
    }
`
const SliderHeader = styled.h6`
    margin: 0 0 40px 0;
    font-weight: 10;
    padding-left: 40px;
    @media(max-width: 1172px) {
        margin: 0 0 30px 0;
    }
    @media(max-width: 850px) {
        margin: 0 0 20px 0;
    }
`
const SliderDiv = styled.div`
    height: 320px;
    position: relative;
    display: flex;
    justify-content: space-between;
    overflow-x: scroll;
    @media(max-width: 1172px) {
        height: 280px;
    }
    @media(max-width: 850px) {
        height: 220px;
    }
    @media(max-width: 550px) {
        height: 180px;
    }
`
class Slider extends Component {
    componentDidMount() {
        
    }
    render() {
        const { header, background, movies } = this.props
        return (
            <SliderContainer background={ background }>
                <SliderHeader>{ header.toUpperCase() }</SliderHeader>
                <SliderDiv>
                    { movies.map( movie => {
                        return <Link key={ movie.id } to={`/movie/${movie.title}/${movie.id}`}><MovieCard movie={ movie } /></Link>
                    })}
                </SliderDiv>
            </SliderContainer>
        )
    }
}

export default Slider;