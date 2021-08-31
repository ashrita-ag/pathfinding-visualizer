import { getCurrentNeighbors, manhattanDistance, sortNodes } from './common'

export function bestFirst(startNode, stopNode, allNodes) {
  startNode.distance = 0
  const Heap = [startNode]
  const visited = []
  while (true) {
    if (Heap.length === 0) {
      visited.push(visited[visited.length - 1])
      return visited
    }
    sortNodes(Heap)

    const cur = Heap.shift()
    if (cur.isVisited || cur.isWall) continue
    cur.isVisited = true
    visited.push(cur)
    if (cur === stopNode) return visited
    updateUnvisitedNeighbors(cur, allNodes, Heap,stopNode)
  }
}

function updateUnvisitedNeighbors(current, allNodes, Heap,stopNode) {
  const currentNeighbors = getCurrentNeighbors(current, allNodes)
  for (const neighbor of currentNeighbors) {
    if (neighbor.isWall || neighbor.isVisited) continue
    neighbor.distance = manhattanDistance(neighbor, stopNode)
    neighbor.previousNode = current
    Heap.push(neighbor)
  }
}
