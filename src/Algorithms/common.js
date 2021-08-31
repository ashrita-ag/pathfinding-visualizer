export function getCurrentNeighbors(currentNode, allNodes) {
  const neighbors = []
  const { col, row } = currentNode
  if (row > 0) neighbors.push(allNodes[row - 1][col])
  if (col > 0) neighbors.push(allNodes[row][col - 1])
  if (row < allNodes.length - 1) neighbors.push(allNodes[row + 1][col])
  if (col < allNodes[0].length - 1) neighbors.push(allNodes[row][col + 1])
  return neighbors.filter((neighbor) => !neighbor.isVisited)
}

export function findShortestPath(stopNode) {
  if (stopNode.previousNode == null) return []
  const shortestPathNodes = [stopNode]
  while (shortestPathNodes[0].isStart === false)
    shortestPathNodes.unshift(shortestPathNodes[0].previousNode)
  return shortestPathNodes
}

export function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

export function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.col - nodeB.col) + Math.abs(nodeA.row - nodeB.row)
}
