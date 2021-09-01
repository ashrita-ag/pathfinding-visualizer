import React, { Component } from 'react'
import './Node.css'
import store from '../reducer/store'
import {
  DELETE_NODES,
  DRAG_START,
  DRAG_STOP,
  MOUSE_CLICKED,
  MOUSE_UP,
  RESET_PREVIOUS_NODE,
  SET_PREVIOUS_NODE,
  SET_START_NODE,
  SET_STOP_NODE,
  UPDATE_START,
  UPDATE_STOP,
  UPDATE_WALL,
} from '../constant/constants'

export default class Node extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.nodeRef = React.createRef()
  }

  handleMouseDown() {
    let row = this.props.row
    let col = this.props.col
    if (store.getState().nodes[row][col].isStart) {
      if (store.getState().dragStartPoint) return
      actionDragStart()
    } else if (store.getState().nodes[row][col].isStop) {
      if (store.getState().dragStopPoint) return
      actionDragStop()
    } else {
      if (store.getState().mouseIsClicked) return
      mouseClickTrue()
      updateToggledWall(row, col)
    }
    if (!store.getState().visitingAnimation) {
      this.setState({})
    }
  }

  handleMouseUp() {
    // if (
    //   !store.getState().mouseIsClicked &&
    //   !store.getState().dragStartPoint &&
    //   !store.getState().dragStopPoint
    // )
    //   return

    let row = this.props.row
    let col = this.props.col
    if (
      store.getState().dragStartPoint &&
      !store.getState().nodes[row][col].isStop
    )
      setStartNode(row, col)
    else if (
      store.getState().dragStopPoint &&
      !store.getState().nodes[row][col].isStart
    )
      setStopNode(row, col)

    actionMouseUp()
  }

  handleMouseEnter() {
    let row = this.props.row
    let col = this.props.col
    if (
      !store.getState().nodes[row][col].isStart &&
      !store.getState().nodes[row][col].isStop
    ) {
      if (store.getState().dragStopPoint) {
        let preRow = store.getState().previousNode[0]
        let preCol = store.getState().previousNode[1]
        updateStopNode(row, col)
        deleteNode(preRow, preCol)
        this.setState({})
        this.props.makeOtherNodeRender(preRow, preCol)
      } else if (store.getState().dragStartPoint) {
        let preRow = store.getState().previousNode[0]
        let preCol = store.getState().previousNode[1]
        updateStartNode(row, col)
        deleteNode(preRow, preCol)
        this.setState({})
        this.props.makeOtherNodeRender(preRow, preCol)
      } else if (store.getState().mouseIsClicked) {
        updateToggledWall(row, col)
        this.setState({})
      } else return
    }
  }

  handleMouseLeave() {
    let row = this.props.row
    let col = this.props.col
    if (
      store.getState().dragStartPoint &&
      !store.getState().nodes[row][col].isStop
    )
      registerPreviousNode(row, col)
    else if (
      store.getState().dragStopPoint &&
      !store.getState().nodes[row][col].isStart
    )
      registerPreviousNode(row, col)
  }

  render() {
    const { row, col } = this.props
    if (store.getState().shortestPathAnimation)
      return (
        <div id={`node-${col}-${row}`} className='node-shortest-path'></div>
      )
    else if (!store.getState().visitingAnimation) {
      const { isWall, isStart, isStop } = store.getState().nodes[row][col]

      const nodeClass = isStop
        ? 'node-stop'
        : isStart
        ? 'node-start'
        : isWall
        ? 'node-wall'
        : 'node-item'
      return (
        <div
          draggable={false}
          id={`node-${col}-${row}`}
          className={nodeClass}
          onMouseDown={() => {
            this.handleMouseDown()
          }}
          onMouseUp={() => {
            this.handleMouseUp()
          }}
          onMouseEnter={() => {
            this.handleMouseEnter()
          }}
          onMouseLeave={() => {
            this.handleMouseLeave()
          }}
          onDragStart={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}></div>
      )
    } else return <div id={`node-${col}-${row}`} className='node-visited'></div>
  }
}

const updateToggledWall = (row, col) => {
  let nodes = store.getState().nodes
  nodes[row][col].isWall = !nodes[row][col].isWall
  const action = {
    type: UPDATE_WALL,
    value: nodes,
  }
  store.dispatch(action)
}

const mouseClickTrue = () => {
  const action = {
    type: MOUSE_CLICKED,
  }
  store.dispatch(action)
}

export const actionMouseUp = () => {
  const action = {
    type: MOUSE_UP,
  }
  store.dispatch(action)
}

const actionDragStart = () => {
  const action = {
    type: DRAG_START,
  }
  store.dispatch(action)
}

const actionDragStop = () => {
  const action = {
    type: DRAG_STOP,
  }
  store.dispatch(action)
}

const updateStartNode = (row, col) => {
  let nodes = store.getState().nodes
  if (!nodes[row][col].isStop) {
    nodes[row][col].isStart = true
    nodes[row][col].isWall = false
    const action = {
      type: UPDATE_START,
      value: nodes,
    }
    store.dispatch(action)
  }
}

const updateStopNode = (row, col) => {
  let nodes = store.getState().nodes
  if (!nodes[row][col].isStart) {
    nodes[row][col].isStop = true
    nodes[row][col].isWall = false
    const action = {
      type: UPDATE_STOP,
      value: nodes,
    }
    store.dispatch(action)
  }
}

const deleteNode = (row, col) => {
  let nodes = store.getState().nodes
  nodes[row][col].isStop = false
  nodes[row][col].isStart = false
  nodes[row][col].isWall = false
  const action = {
    type: DELETE_NODES,
    value: nodes,
  }
  store.dispatch(action)
}

const registerPreviousNode = (row, col) => {
  const action = {
    type: SET_PREVIOUS_NODE,
    value: [row, col],
  }
  store.dispatch(action)
}

export const setStopNode = (row, col) => {
  const action = {
    type: SET_STOP_NODE,
    value: [row, col],
  }
  store.dispatch(action)
}

export const setStartNode = (row, col) => {
  const action = {
    type: SET_START_NODE,
    value: [row, col],
  }
  store.dispatch(action)
}

export const resetPreviousNode = () => {
  const action = {
    type: RESET_PREVIOUS_NODE,
  }
  store.dispatch(action)
}
