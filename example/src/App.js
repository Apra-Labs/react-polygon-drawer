import React from 'react'
import logo from './Demo.png'

import ReactPolygonDrawer from 'react-polygon-drawer'

const App = () => {
  const width = 400;
  const height = 400;
  return <div style={{
    backgroundColor:'black',
    width,
    height
  }}>
    <img src={logo}/>
    <ReactPolygonDrawer 
      width={width} 
      height={height} 
    />
  </div>
}

export default App
