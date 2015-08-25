import React from 'react'
import './experiment.sass'
import Vector from './math_utils/vector'
import parallelogramArea from './math_utils/parallelogram_area'

// color scheme: https://color.adobe.com/Vitamin-C-color-theme-492199/
const POINT_COLOR = '#DB4831'
const PARALLELOGRAM_COLOR = '#3E606F'
const CIRCLE_COLOR = '#FFE11A'

const DEFAULT_STATE = () => {
  return {
    points: []
  }
}

const RADIUS = 11

export default class Experiment extends React.Component {
  dragging = null

  constructor(props) {
    super(props)
    const localState = window.localStorage.getItem('experiment')
    if (localState) {
      try {
        this.state = JSON.parse(localState)
      } catch(e) {
        this.state = DEFAULT_STATE()
      }
    } else {
      this.state = DEFAULT_STATE()
    }
  }

  render() {
    return (
      <div className='experiment'>
        <svg
          width='100%'
          height='100%'
          onMouseMove={this._drag}
          onMouseUp={this._stopDrag}
          onMouseLeave={this._stopDrag}
          onClick={this._handleClick}
        >
          {this._renderParallelogram()}
          {this._renderCircle()}
          {this._renderPoints()}
        </svg>
        <div className='menu'>
          <div className='logo'>
            React SVG Experiment
          </div>
          <button onClick={this._reset}>
            Abort
          </button>
        </div>
      </div>
    )
  }

  componentWillUpdate = (nextProps, nextState) => {
    window.localStorage.setItem('experiment', JSON.stringify(nextState))
  }

  _points() {
    const points = this.state.points.slice()

    if (points.length === 3) {
      const vector = Vector.fromTwoPoints(points[0], points[1])
      points.push(Vector.fromTwoPoints(vector, points[2]).toPoint())
    }

    return points
  }

  _renderPoints = () => {
    return this._points().map((point, index) => {
      const fillColor = index < 3 ? POINT_COLOR : PARALLELOGRAM_COLOR
      return <circle
        onMouseDown={this._startDrag.bind(this, index)}
        cx={point.x}
        cy={point.y}
        r={RADIUS}
        fill={fillColor}
        key={index}
      />
    })
  }

  _renderParallelogram = () => {
    if (this.state.points.length === 3) {
      const coords = this._points().map((point) => {return `${point.x},${point.y}`})
      return <polygon points={coords.join(',')} stroke={PARALLELOGRAM_COLOR} fill='none' />
    }
  }

  _circleRadius(points) {
    const area = parallelogramArea(points)
    return Math.sqrt(area / Math.PI)
  }

  _renderCircle = () => {
    if (this.state.points.length === 3) {
      const points = this._points()
      const sideA = Vector.fromTwoPoints(points[0], points[1])
      const sideB = Vector.fromTwoPoints(points[1], points[2])
      const diagonal = sideA.sumWithVector(sideB)
      const circleCenter = {
        x: points[0].x + diagonal.x / 2,
        y: points[0].y + diagonal.y / 2
      }
      return <circle
        cx={circleCenter.x}
        cy={circleCenter.y}
        r={this._circleRadius(points)}
        stroke={CIRCLE_COLOR}
        fill='none'
      />
    }
  }

  _handleClick = (event) => {
    if (this.dragging !== null) {
      return
    }

    const x = event.nativeEvent.clientX
    const y = event.nativeEvent.clientY

    if (this.state.points.length < 3) {
      this._addPoint(x, y)
    }
  }

  _startDrag = (index) => {
    this.dragging = index
  }

  _stopDrag = (event) => {
    // to ensure that dragging will be over only after all handlers are executed
    setTimeout(() => {this.dragging = null}, 0)
  }

  _drag = (event) => {
    if (this.dragging !== null) {
      const points = this.state.points
      const point = points[this.dragging]

      if (point) {
        const x = event.nativeEvent.clientX
        const y = event.nativeEvent.clientY

        if (point.x != x || point.y != y) {
          point.x = x
          point.y = y
          this.setState(points)
        }
      }
    }
  }

  _addPoint(x, y) {
    const points = this.state.points
    points.push({x, y})
    this.setState({points})
  }

  _reset = () => {
    this.setState(DEFAULT_STATE())
  }
}
