import './App.css'
import PathfindingVisualizer from './Pathfinding/PathfindingVisualizer'
import { Provider } from 'react-redux'
import store from './Pathfinding/reducer/store'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <PathfindingVisualizer />
      </div>
    </Provider>
  )
}

export default App
