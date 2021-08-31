import { getCurrentNeighbors } from './common'

export function bfs(startNode, stopNode, allNodes) {
  startNode.distance = 0
  const Heap = [startNode]
  const visited = []
  while (true) {
    if (Heap.length === 0) {
      visited.push(visited[visited.length - 1])
      return visited
    }
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
    neighbor.previousNode = current
    Heap.push(neighbor)
  }
}
