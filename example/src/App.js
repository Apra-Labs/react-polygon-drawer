import React from 'react'

import ReactPolygonDrawer from 'react-polygon-drawer'
import 'react-polygon-drawer/dist/index.css'

const App = () => {
  const width = 300;
  const height = 300;
  return <div style={{
    backgroundColor:'black',
    width,
    height
  }}>
    <ReactPolygonDrawer 
      width={width} 
      height={height} 
    />
  </div>
}

export default App
