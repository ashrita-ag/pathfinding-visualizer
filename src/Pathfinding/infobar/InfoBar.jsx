import React, { Component } from 'react'
import InfoBarItem from './InfoBarItem'
import "./InfoBar.css"

export default class InfoBar extends Component {
  render() {
    return (
      <div className='info-bar-container'>
        <InfoBarItem infoBarItemClass='info-bar-start' text='Start Node' />
        <InfoBarItem infoBarItemClass='info-bar-stop' text='Stop Node' />
        <InfoBarItem infoBarItemClass='info-bar-wall' text='Wall' />
        <InfoBarItem infoBarItemClass='info-bar-unvisited' text='Unvisited Node' />
        <InfoBarItem infoBarItemClass='info-bar-visited' text='Visited Node' />
        <InfoBarItem infoBarItemClass='info-bar-shortestpath' text='Shortest-path Node' />
        {/* <InfoBarItem infoBarItemClass='info-bar-reset' text='Reset' /> */}
      </div>
    )
  }
}
