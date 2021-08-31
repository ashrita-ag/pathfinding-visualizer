import React, { Component } from 'react'
import './Grid.css'

export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <div className='grid'>{this.props.children}</div>
  }
}
