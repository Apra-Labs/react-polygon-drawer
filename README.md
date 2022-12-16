# react-polygon-drawer

> Draw polygon over any element

[![NPM](https://img.shields.io/npm/v/react-polygon-drawer.svg)](https://www.npmjs.com/package/react-polygon-drawer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<p align="center"><img src="example\src\Demo.gif" width="300"/></p>

## Install

```bash
npm i react-polygon-drawer
```

## Usage

```jsx
import React from 'react'
import logo from './Demo.png'

import ReactPolygonDrawer from 'react-polygon-drawer'

const App = () => {
  return <div>
    <img src={logo}/>
    <ReactPolygonDrawer/>
  </div>
}

```
## Props

|Prop Name|Type|Description|Default Value|
|--|-------|---------|------|
|height|number|Pass height of the image|400|
|width|number|Pass width of the image|400|
|lineWidth|number?|Width of the line to be sketched on canvas|3|
|lineColor|string?|Color of the line to be sketched on canvas|'#FF3333'|
|pointColor|string?|Color of the point to be dotted on canvas|'#FF3333'|
|fillColor|string?|Color of the fill region of polygon|'rgba(205, 92, 92, 0.5)'|
|disableAutoClosing|boolean?| if false, double click closes the polygon automatically, else select the closing coordinates manually by clicking|false|
|proximity|number?|Approximated value near inital start point of polygon, in the vicinity of which if user clicks, polygon closes|20|
|existingCoordinates|Coordinate[]|List of {x,y} coordinates to be rendered|-|
|minPoints|number?|Minimum number of points in polygon|-|
|maxPoints|number?|Maximum number of points in polygon|-|
|onFinish|(coordinates: Coordinate[])=>void|Callback function once polygon is drawn|-|
|onPoint|(coordinate: Coordinate)=>void|Callback function once point is dotted|-|

```
/**
 * @typedef {Object} Coordinate
 * @prop {number} x
 * @prop {number} y
 */
```

## For Contribution and Run Example
```bash
git clone "https://github.com/apra-Labs/react-polygon-drawer.git"
cd react-polygon-drawer
npm i
cd examples
npm i
npm start
```

## License

MIT © [apra-labs](https://github.com/Apra-Labs)


## Contributors

* [dpk-jha](https://github.com/dpk-jha)
* [mansi-rthd](https://github.com/mansirthd)