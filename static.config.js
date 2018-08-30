import axios from 'axios'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: { genres } } = await axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=5c7131bf729da8105e48fe7b685bf91c")
    const { data } = await axios.get("https://api.themoviedb.org/3/movie/now_playing?append_to_response=credits&api_key=5c7131bf729da8105e48fe7b685bf91c")
    const movies = data.results.map((movie, idx) => {
       movie.moviePoster = `http://image.tmdb.org/t/p/w300//${movie.poster_path}` 
       movie.movieBackdrop = `http://image.tmdb.org/t/p/original//${movie.backdrop_path}` 
       movie.genres = [...genres].filter( (genre, idx) => movie.genre_ids.includes(genre.id))
       return movie;
    })
    
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: async () => ({
          data, movies
        })
        ,children: movies.map(movie => ({
          path: `/movie/${movie.title}/${movie.id}`,
          component: 'src/containers/Movie',
          getData: () => ({
            movie
          }),
        })),
      },
      {
        path: '/search',
        component: 'src/containers/Search',
        getData: async () => ({
          genres
        })
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
