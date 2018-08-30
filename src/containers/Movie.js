import React, { Component } from 'react'
import { withRouteData } from 'react-static'
import axios from 'axios'
import styled from 'styled-components'
//
const MovieBackdrop = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  height: 800px;
  background: ${props => props.backDrop ? `url(${ props.backDrop }) center no-repeat` : ''};
  background-size: cover;
  @media(max-width: 550px) {
    height: 600px;
  }
`
const BackdropFilter = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image:
    radial-gradient(transparent, #292929),
    linear-gradient(to top, #213d62, transparent);
` 
const MovieJumbotron = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  color: white;
`
const MovieHeaderContainer = styled.div`
  padding-left: 40px;
  display: flex;
  justify-content: flex-start;
  img {
    height: 280px;
    width: 180px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    height: 280px;
    padding: 0 0 0 40px;
    @media(max-width: 550px) {
      padding: 0 0 0 20px;
    }
    h2 {
      font-size: 60px;
      font-weight: 650px;
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
      @media(max-width: 850px) {
        font-size: 15px;
      }
      @media(max-width: 550px) {
        font-size: 10px;
      }
    }
    button {
      border: 2px solid #707070;
      border-radius: 8px;
      background: none;
      padding: 15px 0 13px 0;
      font-size: 15px;
      text-align: center;
      width: 160px;
      cursor: pointer;
      color: white;
      font-weight: bold;
    }
  }
  @media(max-width: 1172px) {
    img {
      height: 200px;
      width: 120px;
    }
    div {
      height: 200px;
      h4 {

      }
      button {
        width: 120px;
        font-size: 12px;
        padding: 10px 0 8px 0;
        border: 1px solid #707070;
      }
    }
  }
  @media(max-width: 550px) {
    div {
      height: 110px;
      button {
        width: 100px;
        font-size: 10px;
        padding: 5px 0 4px 0;
      }
    }
    img {
      height: 110px;
      width: 75px;
    }
  }
  
`
const MovieHeaderInfo = styled.div`
  background: #000000;
  height: 100px;
  margin-top: 50px;
  opacity: 0.75;
  display: flex;
  padding: 0 40px;
  justify-content: space-between;
  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    h3 {
      font-weight: light;
      padding-bottom: 2px;
    }
    h5 {
      font-weight: 650;
      color: #707070;
      padding-top: 2px;
    }
  }
  @media(max-width: 850px) {
    height: 65px;
    div {
      h3 {
        font-size: 13px;
        padding-bottom: 3px;
      }
      h5 {
        font-size: 11px;
        padding-top: 3px;
      }
    }
  }
`
const MovieHeaderOverview = styled.p`
  margin-top: 50px;
  padding: 0 30px;
  letter-spacing: 2px;
  line-height: 40px;
  @media(max-width: 850px) {
    font-size: 13px;
    line-height: 25px;
  }
`
const MovieCast = styled.div`
  display: flex;
  padding: 0 40px;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #292929;
  color: white;
  @media(max-width: 850px) {
    padding: 40px 20px;
    }
  div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 150px;
    margin: 40px;
    text-align: center;
    @media(max-width: 850px) {
      margin: 10px;
      h5 {
      font-size: 12px;
      }
    }
  }
  @media(max-width: 550px) {
    div {
      width: 80px;
      height: 150px;
      margin: 0;
      justify-content: flex-start;
      h5 {
        font-size: 10px;
      }
    }
  }
`
const ActorImg = styled.span`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background: white;
  margin-bottom: 20px;
  border: solid 1px grey;
  display: inline-block;
  background: ${ props => props.image ? `url(${ props.image }) center no-repeat` : '' };
  background-size: 100%;
  cursor: pointer;
  @media(max-width: 850px) {
    height: 80px;
    width: 80px;
  }
  @media(max-width: 550px) {
    height: 52px;
    width: 52px;
  }
`
class Movie extends Component {
  state = {
    runtime: '',
    cast: []
  }
  async componentDidMount() {
    const { data: { cast } }  = await axios.get(`http://api.themoviedb.org/3/movie/${this.props.movie.id}/casts?api_key=5c7131bf729da8105e48fe7b685bf91c`)
    const { data: { runtime }} = await axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=5c7131bf729da8105e48fe7b685bf91c&append_to_response=releases`)
    this.setState({ runtime: `${runtime} minutes`, cast: [...cast].splice(0, 8) })
  }
  render() {
    const { movie } = this.props
    return (
      <div>
        <MovieBackdrop backDrop={ movie.movieBackdrop }>
        <BackdropFilter/>
          <MovieJumbotron>
            <MovieHeaderContainer>
            <img src={ movie.moviePoster } />
            <div>
              <h2>{ movie.title.toUpperCase() }</h2>
              <h4>{ movie.genres.map((genre, idx, arr) => {
                if( arr.length != (idx + 1)) {
                  return genre.name.toUpperCase() + ', '
                }
                return genre.name.toUpperCase()
              })}
              </h4>
              <button>ADD TO SEEN</button>
            </div>
            </MovieHeaderContainer>
            <MovieHeaderInfo>
              {[['Score', movie.vote_average], ['ReleaseDate',movie.release_date], ['RunTime',this.state.runtime]]
              .map((i,idx) => {
                return <div key={idx}>
                  <h3>{ i[0] }</h3>
                  <h5>{ i[1] }</h5>
                </div>
              }) }
            </MovieHeaderInfo>
            <MovieHeaderOverview>{movie.overview}</MovieHeaderOverview>
          </MovieJumbotron>
      </MovieBackdrop>
      <MovieCast>
        { this.state.cast.map((actor, idx) => {
          console.log("cast", actor)
          return <div key={ actor.id }>
            <ActorImg  image={ `http://image.tmdb.org/t/p/w185//${actor.profile_path}` }/>
            <h5>{ actor.name }</h5>
          </div>
        })}
      </MovieCast>
      </div>
    )
  }
}

export default withRouteData(Movie)