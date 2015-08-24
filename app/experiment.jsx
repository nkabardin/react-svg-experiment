import React from 'react'
import './experiment.sass'

// color scheme: https://color.adobe.com/Vitamin-C-color-theme-492199/
const COLORS = [
  '#FD7400',
  '#FFE11A',
  '#BEDB39'
]

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

  _renderPoints = () => {
    return this.state.points.map((point, index) => {
      return <circle
        draggable='true'
        onMouseDown={this._startDrag.bind(this, index)}
        cx={point.x}
        cy={point.y}
        r={RADIUS}
        fill={COLORS[index]}
        key={index}
      />
    })
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
