import React, { Component } from 'react'
import { withRouteData } from 'react-static'
import axios from 'axios'
import styled from 'styled-components'

class Search extends Component {
    render () {
        console.log("props", this.props)
        return (
            <div>search</div>
        )
    }
}

export default withRouteData(Search)