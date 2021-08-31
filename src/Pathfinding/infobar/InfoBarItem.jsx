import React, { Component } from 'react'

export default class InfoBarItem extends Component {
  render() {
    const { infoBarItemClass, text } = this.props
    return (
      <li className='info-bar-item'>
        <div className={infoBarItemClass + ' info-bar-item-box'}></div>   {text}
      </li>
    )
  }
}
