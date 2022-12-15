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
import React, { Component } from 'react'

import ReactPolygonDrawer from 'react-polygon-drawer'

class Example extends Component {
  render() {
    return <ReactPolygonDrawer />
  }
}

```
## Functionality
This react component has two modes to close the polygon. 
* Double Click mode - Double click the element to close the polygon
* Check for Close mode - User click near the proximity of the initial start point of the polygon, it automatically get closed.

It comes with various user defined props.

|Prop Name|Type|Description|Default Value|
|--|-------|---------|------|
|height|number|Pass height of the image|400|
|width|number|Pass width of the image|400|
|lineWidth|number?|Width of the line to be sketched on canvas|3|
|lineColor|string?|Color of the line to be sketched on canvas|'#FF3333'|
|pointColor|string?|Color of the point to be dotted on canvas|'#FF3333'|
|checkforClose|boolean?|User click near the proximity of the initial start point of the polygon, it automatically get closed|false|
|proximity|number?|Approximated value near inital start point of polygon , in the vicinity of which if user clicks, polygon closes automatically|20|
|showCoordinates|boolean?|Instead of drawing, if existing coordinates are to be rendered on element|false|
|existingCoordinates|Coordinate[]|List of (x,y) coordinates to be rendered|-|
|minPoints|number?|Minimum number of points in polygon|-|
|maxPoints|number?|Maximum number of points in polygon|-|
|onFinish|(coordinates: Coordinate[])=>void|Callback function once polygon is drawn|-|
|onPoint|(coordinate: Coordinate)=>void|Callback function once point is dotted|-|

## For Contribution and Run Example
```bash
git clone "https://github.com/Apra-Labs/react-polygon-drawer.git"
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