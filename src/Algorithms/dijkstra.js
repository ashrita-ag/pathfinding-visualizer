import { getCurrentNeighbors, sortNodes } from './common'

export function dijkstra(startNode, stopNode, allNodes) {
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
    updateUnvisitedNeighbors(cur, allNodes, Heap)
  }
}

function updateUnvisitedNeighbors(current, allNodes, Heap) {
  const currentNeighbors = getCurrentNeighbors(current, allNodes)
  for (const neighbor of currentNeighbors) {
    if (neighbor.isWall || neighbor.isVisited) continue
    neighbor.distance = current.distance + 1
    neighbor.previousNode = current
    Heap.push(neighbor)
  }
}
