import React, { Component } from 'react'
import { Router, Link, withSiteData } from 'react-static'
import styled from 'styled-components'
//
import logoImg from '../logo.png'

const NavContainer = styled.nav`
  background: #292929;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
  color: purple;
`
const MovieLogo = styled(Link)`
  display: flex;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 20px;
  p:nth-child(1){
    color: #7C32E0;
  }
  p:nth-child(2){
    color: white;
  }
`
const Hamburger = styled.div`
  position: relative;
  cursor: pointer;
  span {
    position: relative;
    background: #ffffff;
    display: block;
    width: 30px;
    height: 3px;
    margin-bottom: 5px;
    top: 0;
  } 
  span:nth-child(1) {
      transition: all ease-in-out 0.3s;
      transform: ${ props => props.open ? 'rotate(-45deg)' : 'rotate(0deg)' };
      top: ${ props => props.open ? '7px' : '' }
  }
  span:nth-child(2) {
      transition: all ease-in-out 0.5s;
      width: ${ props => props.open ? '0px' : '30px' };
      opacity: ${ props => props.open ? '0' : '1' }
  }
  span:nth-child(3) {
      transition: all ease-in-out 0.3s;
      transform: ${ props => props.open ? 'rotate(45deg)' : 'rotate(0deg)' };
      top: ${ props => props.open ? '-7px' : '' }
 }
`

class Nav extends Component {
  state = {
    open: false
  }
  openMenu = () => {
    this.setState({ open: !this.state.open })
  }
  render() {
    return (
    <NavContainer>
      <MovieLogo to="/">
          <p>Movie</p>
          <p>App</p>
      </MovieLogo>
      <Hamburger open={this.state.open} onClick={ this.openMenu }>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
    </NavContainer>
    )
  }
}
export default withSiteData(Nav);
