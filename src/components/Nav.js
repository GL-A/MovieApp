import React, { Component } from 'react'
import { Router, Link, withSiteData } from 'react-static'
import styled, { keyframes } from 'styled-components'
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

const expand = keyframes`
  10% {
    border-radius: 50%;
    height: 10vh;
    width: 10%;
  };
  75% {
    border-radius: 50%;
    height: 70vh;
    width: 80%;
    bottom: 20%;
  };
  100% {
    border-radius: 0%;
    opacity: 1;
    height: 100vh ;
    width: 100%;
    bottom: 0;
  };
`
const NavSideBar = styled.div`
  position: fixed;
  height: calc(100vh - 60px);
  width: 200px;
  right: ${ props => props.open ? '0' : '-200px' };
  bottom: 0;
  background: #27383B;
  transition: ease-in-out 0.3s;
  z-index: 1000;
  ul {
    color: white;
    li {
      
      cursor: pointer;
    
    }
  }
`
const To = styled(Link)`
  
`
class Nav extends Component {
  state = {
    open: false
  }
  onScroll = () => {
    this.setState({ open: false })
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
  openMenu = (open) => {
    this.setState({ open: open })
  }
  render() {
    return (
    <NavContainer>
      <NavSideBar open={ this.state.open }>
        <ul>
          <li onClick={ () => this.openMenu(false) }><Link >In Progress</Link></li>
        </ul>
      </NavSideBar>
      <div onClick={ () => this.openMenu(false) }>
        <MovieLogo  to="/">
            <p>Movie</p>
            <p>App</p>
        </MovieLogo>
      </div>
      <Hamburger open={ this.state.open } onClick={ () => this.openMenu(!this.state.open) }>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>
      
    </NavContainer>
    )
  }
}
export default withSiteData(Nav);
