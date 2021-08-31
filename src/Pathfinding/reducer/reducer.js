import {
  DELETE_NODES,
  DRAG_START,
  DRAG_STOP,
  INIT_NODES,
  MOUSE_CLICKED,
  MOUSE_UP,
  RESET_PREVIOUS_NODE,
  SET_PREVIOUS_NODE,
  SET_SHORTEST_ANIMATE_FALSE,
  SET_SHORTEST_ANIMATE_TRUE,
  SET_START_NODE,
  SET_STOP_NODE,
  SET_VISIBLE_FALSE,
  SET_VISIBLE_TRUE,
  SET_VISIT_ANIMATE_FALSE,
  SET_VISIT_ANIMATE_TRUE,
  START_NODE_COL,
  START_NODE_ROW,
  STOP_NODE_COL,
  STOP_NODE_ROW,
  UPDATE_START,
  UPDATE_STOP,
  UPDATE_WALL,
} from '../constant/constants'

const initialState = {
  mouseIsClicked: false,
  dragStartPoint: false,
  dragStopPoint: false,
  visitingAnimation: false,
  shortestPathAnimation: false,
  tutorialVisible: false,
  nodes: [],
  previousNode: [],
  startNode: [START_NODE_ROW, START_NODE_COL],
  stopNode: [STOP_NODE_ROW, STOP_NODE_COL],
}

export default function reducer(state = initialState, action) {
  if (!state.visitingAnimation && action.type === MOUSE_CLICKED) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.mouseIsClicked = true
    return newState
  }
  if (action.type === MOUSE_UP) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.mouseIsClicked = false
    newState.dragStartPoint = false
    newState.dragStopPoint = false
    return newState
  }
  if (action.type === INIT_NODES || action.type === DELETE_NODES) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.nodes = action.value
    return newState
  }
  if (
    !state.visitingAnimation &&
    (action.type === UPDATE_WALL ||
      action.type === UPDATE_START ||
      action.type === UPDATE_STOP)
  ) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.nodes = action.value
    return newState
  }
  if (!state.visitingAnimation && action.type === DRAG_START) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.dragStartPoint = true
    return newState
  }
  if (!state.visitingAnimation && action.type === DRAG_STOP) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.dragStopPoint = true
    return newState
  }
  if (action.type === SET_PREVIOUS_NODE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.previousNode = action.value
    return newState
  }
  if (action.type === SET_START_NODE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.startNode = action.value
    return newState
  }
  if (action.type === SET_STOP_NODE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.stopNode = action.value
    return newState
  }
  if (action.type === SET_VISIT_ANIMATE_TRUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.visitingAnimation = true
    return newState
  }
  if (action.type === SET_VISIT_ANIMATE_FALSE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.visitingAnimation = false
    return newState
  }
  if (action.type === RESET_PREVIOUS_NODE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.previousNode = []
    return newState
  }
  if (action.type === SET_VISIBLE_FALSE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.tutorialVisible = false
    return newState
  }
  if (action.type === SET_VISIBLE_TRUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.tutorialVisible = true
    return newState
  }

  if (action.type === SET_SHORTEST_ANIMATE_FALSE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.shortestPathAnimation = false
    return newState
  }
  if (action.type === SET_SHORTEST_ANIMATE_TRUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.shortestPathAnimation = true
    return newState
  }

  return state
}
