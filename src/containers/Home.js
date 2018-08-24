import React, { Component } from 'react'
import {  withRouteData } from 'react-static'
import { Link } from 'react-static'
import Slider from '../components/Slider'
import styled from 'styled-components'
import axios from 'axios'

const HomeFeaturedContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  height: 500px;
  background: grey url(${props => props.headerBackground ? props.headerBackground : '' }) no-repeat center;
  background-size: cover;
  @media(max-width: 500px) {
    height: 200px;
  }
`
const HomeFilter = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgb(40,46,68);
  background: linear-gradient(90deg, rgba(40,46,68,0.8953956582633054) 6%, rgba(41,41,41,0.9486169467787114) 100%);
  opacity: .89;
` 

const HeaderDescription = styled.div`
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 2;
  h5, h1, h4, button {
    margin: 0;
    color: white;
  }
  h5 {
    text-align: center;
    background: black;
    padding: 7px 5px 5px 5px;
    width: 130px;
    border-radius: 8px;
  }
  h1 {
    font-size: 90px;
    font-weight: 850px;
    @media(max-width: 1172px) {
        font-size: 50px;
      }
      @media(max-width: 850px) {
        font-size: 35px;
      }
      @media(max-width: 550px) {
        font-size: 20px;
      }
  }
  h4 {
    font-weight: light;
  }

  @media(max-width: 500px) {
    h4 {
      font-size: 11px;
    }
    h5 {
      font-size: 10px;
      width: 115px;
      padding: 5px 0 4px 0;
      margin-bottom: 6px;
    }
  }
`
const MoreInfo = styled(Link)`
  margin-top: 100px;
  border: 2px solid #707070;
  border-radius: 8px;
  background: none;
  padding: 15px 0 13px 0;
  font-size: 15px;
  text-align: center;
  width: 160px;
  cursor: pointer;
  @media(max-width: 500px) {
    margin-top: 40px;
    font-size: 11px;
    width: 90px;
    padding: 5px 0 4px 0;
    border: 1px solid #707070;
  }
`

class Home extends Component {
  state = {
    movies: [],
    headerBackground: '',
    headerMovie: '',
    headerGenres: []
  }
  async componentDidMount() {

    const { movies, data } = this.props

    this.setState({ 
      movies: movies, 
      headerBackground: movies[0].movieBackdrop,
      headerMovie: data.results[0].title,
      headerMovieId: data.results[0].id,
      headerGenres: data.results[0].genres
    })
  }
  render(){
    
    return (
      <div>
        <HomeFeaturedContainer headerBackground={ this.state.headerBackground }>
          <HomeFilter></HomeFilter>
          <HeaderDescription>
            <h5>FEATURED MOVIE</h5>
            <h1>{ this.state.headerMovie.toUpperCase() }</h1>
            <h4>{ this.state.headerGenres.map( (genre, idx) => {
              if( this.state.headerGenres.length != (idx + 1) ) {
                return genre.name.toUpperCase() + ', '
              }
              return genre.name.toUpperCase()
            })}</h4>
            <MoreInfo style={{color: "white"}} to={`/movie/${this.state.headerMovie}/${this.state.headerMovieId}`}>
              MORE INFO
            </MoreInfo>
          </HeaderDescription>     
        </HomeFeaturedContainer>

        <Slider 
          header={ "latest movies" }
          background={ '#EEEEEE' }
          movies={ this.state.movies.filter((movie, idx) => idx !== 0 && idx < 9) }
          />
        <Slider 
          header={ "latest movies" }
          background={ "#DEDDDD" }
          movies={ this.state.movies.filter((movie, idx) => idx > 9) }
        />
      </div>
    )
  }
}
export default withRouteData(Home);