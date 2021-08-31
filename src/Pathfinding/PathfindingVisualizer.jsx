import React, { Component, createRef } from 'react'
import {
  ASTAR,
  BEST_FIRST,
  BFS,
  DIJKSTRA,
  INIT_NODES,
  MOUSE_UP,
  RESET_PREVIOUS_NODE,
  SET_SHORTEST_ANIMATE_FALSE,
  SET_SHORTEST_ANIMATE_TRUE,
  SET_START_NODE,
  SET_STOP_NODE,
  SET_VISIT_ANIMATE_FALSE,
  SET_VISIT_ANIMATE_TRUE,
  START_NODE_COL,
  START_NODE_ROW,
  STOP_NODE_COL,
  STOP_NODE_ROW,
  TOTAL_COLS,
  TOTAL_ROWS,
} from './constant/constants'
import store from './reducer/store'
import Node from './node/Node'
import Grid from './grid/Grid'
import InfoBar from './infobar/InfoBar'
import { findShortestPath } from '../Algorithms/common'
import { dijkstra } from '../Algorithms/dijkstra'
import { astar } from '../Algorithms/astar'
import { bestFirst } from '../Algorithms/bestfirst'
import { bfs } from '../Algorithms/bfs'
import Tutorial, { setVisibleFalse, setVisibleTrue } from './tutorial/Tutorial'
import { Affix, Button, Tooltip } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import './PathfindingVisualizer.css'

export default class PathfindingVisualizer extends Component {
  // let visitingAnimationTimer=null,shortestPathAnimationTimer=null,shortestPathAnimationStartTimer;

  constructor(props) {
    super(props)
    this.state = {
      nodes: [],
    }

    this.nodeRefs = []
    for (let i = 0; i < TOTAL_ROWS; i++) {
      let refRow = []
      for (let j = 0; j < TOTAL_COLS; j++) {
        let refNode = createRef()
        refRow.push(refNode)
      }
      this.nodeRefs.push(refRow)
    }
    this.tutorialRef = createRef()
  }

  componentDidMount() {
    const nodes = getInitialGrid()
    initStoreNodes(nodes)
    this.setState({ nodes: nodes })
  }

  implementAlgorithm(algoName) {
    if (!store.getState().visitingAnimation) {
      setVistingAnimationTrue()
      const { nodes } = store.getState()
      const startNodeRow = store.getState().startNode[0]
      const startNodeCol = store.getState().startNode[1]
      const stopNodeRow = store.getState().stopNode[0]
      const stopNodeCol = store.getState().stopNode[1]
      const startNode = nodes[startNodeRow][startNodeCol]
      const stopNode = nodes[stopNodeRow][stopNodeCol]
      const visitedNodeInorder =
        algoName === DIJKSTRA
          ? dijkstra(startNode, stopNode, nodes)
          : algoName === ASTAR
          ? astar(startNode, stopNode, nodes)
          : algoName === BFS
          ? bfs(startNode, stopNode, nodes)
          : algoName === BEST_FIRST
          ? bestFirst(startNode, stopNode, nodes)
          : []
      const shortestPathNodes = findShortestPath(stopNode)
      this.animateAlgorithm(visitedNodeInorder, shortestPathNodes)
    }
  }

  animateAlgorithm(visitedNodeInorder, shortestPathNodes) {
    for (let i = 0; i < visitedNodeInorder.length; i++) {
      if (i === visitedNodeInorder.length - 1) {
        // shortestPathAnimationStartTimer =
        setTimeout(() => {
          setShortestPathAnimationTrue()
          this.animateShortestPath(shortestPathNodes)
        }, 10 * i)
      } else {
        const { col, row } = visitedNodeInorder[i]
        // visitingAnimationTimer =
        setTimeout(() => {
          this.makeOtherNodeRender(row, col)
        }, 10 * i)
      }
    }
  }

  animateShortestPath(shortestPathNodes) {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      const { col, row } = shortestPathNodes[i]
      // shortestPathAnimationTimer =
      setTimeout(() => {
        this.makeOtherNodeRender(row, col)
      }, 50 * i)
    }
    setShortestPathAnimationFalse()
  }

  makeOtherNodeRender(row, col) {
    this.nodeRefs[row][col].current.setState({})
  }

  activeTutorial() {
    setVisibleTrue()
    console.log('tutorial activated')
    this.tutorialRef.current.setState({ pageNo: 1 })
  }

  resetNodes() {
    const { nodes } = this.state
    initStoreNodes(nodes)
    // clearTimeout(visitingAnimationTimer)
    // clearTimeout(shortestPathAnimationStartTimer)
    // clearTimeout(shortestPathAnimationTimer)
    this.setState({})
  }

  render() {
    const nodes = store.getState().nodes
    return (
      <>
        {/* <Tutorial ref={this.tutorialRef}></Tutorial> */}

        <div className='navbar'>
          <div className='navbar-title'>Pathfinding Visualizer</div>
          <div className='navbar-algos'>
            {' '}
            <button
              onClick={() => this.implementAlgorithm(ASTAR)}
              className='navbar-button button-algo'>
              A* Search
            </button>
            <button
              onClick={() => this.implementAlgorithm(DIJKSTRA)}
              className='navbar-button button-algo'>
              Dijkstra Algorithm
            </button>
            <button
              onClick={() => this.implementAlgorithm(BFS)}
              className='navbar-button button-algo'>
              Breadth-first Search
            </button>
            <button
              onClick={() => this.implementAlgorithm(BEST_FIRST)}
              className='navbar-button button-algo'>
              Greedy best first search
            </button>
          </div>

          <button
            onClick={() => this.resetNodes()}
            className='navbar-button button-reset'>
            Reset Grid
          </button>
        </div>

        {/* 
        <Affix offsetTop={130} className='tutorial-affix'>
          <Tooltip title='Tutorial' placement='right' mouseEnterDelay='0.1'>
            <Button
              type='default'
              shape='round'
              size='large'
              className='tutorial-btn'
              onClick={() => {
                this.activeTutorial()
              }}
              >
              <div className='tutorial-innerbtn'>
                <FileTextOutlined className='tutorial-icon' />
              </div>
            </Button>
          </Tooltip>
        </Affix> */}

        <InfoBar />
        <Grid>
          {nodes.map((row) =>
            row.map((node) => {
              const { col, row } = node
              return (
                <Node
                  key={[col, row]}
                  col={col}
                  row={row}
                  ref={this.nodeRefs[row][col]}
                  makeOtherNodeRender={(preRow, preCol) => {
                    this.makeOtherNodeRender(preRow, preCol)
                  }}></Node>
              )
            })
          )}
        </Grid>
      </>
    )
  }
}

const getInitialGrid = () => {
  const nodes = []
  for (let row = 0; row < 20; row++) {
    const currentRow = []
    for (let col = 0; col < 50; col++) {
      const currentNode = createNode(row, col)
      currentRow.push(currentNode)
    }
    nodes.push(currentRow)
  }
  return nodes
}

const createNode = (row, col) => {
  return {
    col: col,
    row: row,
    previousNode: null,
    distance: Infinity,
    distanceFromStart: Infinity, //for Astar
    isWall: false,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isStop: row === STOP_NODE_ROW && col === STOP_NODE_COL,
    isVisited: false,
  }
}

const initStoreNodes = (nodes) => {
  setVistingAnimationFalse()
  setShortestPathAnimationFalse()
  actionMouseUp()
  resetPreviousNode()
  setStartNode(START_NODE_ROW, START_NODE_COL)
  setStopNode(STOP_NODE_ROW, STOP_NODE_COL)
  const action = {
    type: INIT_NODES,
    value: nodes,
  }
  store.dispatch(action)
}

const setVistingAnimationFalse = () => {
  const action = {
    type: SET_VISIT_ANIMATE_FALSE,
  }
  store.dispatch(action)
}

const setVistingAnimationTrue = () => {
  const action = {
    type: SET_VISIT_ANIMATE_TRUE,
  }
  store.dispatch(action)
}

const setShortestPathAnimationFalse = () => {
  const action = {
    type: SET_SHORTEST_ANIMATE_FALSE,
  }
  store.dispatch(action)
}

const setShortestPathAnimationTrue = () => {
  const action = {
    type: SET_SHORTEST_ANIMATE_TRUE,
  }
  store.dispatch(action)
}

const actionMouseUp = () => {
  const action = {
    type: MOUSE_UP,
  }
  store.dispatch(action)
}

const setStartNode = (row, col) => {
  const action = {
    type: SET_START_NODE,
    value: [row, col],
  }
  store.dispatch(action)
}
const setStopNode = (row, col) => {
  const action = {
    type: SET_STOP_NODE,
    value: [row, col],
  }
  store.dispatch(action)
}

const resetPreviousNode = () => {
  const action = {
    type: RESET_PREVIOUS_NODE,
  }
  store.dispatch(action)
}
