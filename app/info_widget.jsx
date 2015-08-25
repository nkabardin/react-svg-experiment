import React from 'react'
import './info_widget.sass'

export default class InfoWidget extends React.Component {
  render() {
    return <div className='info_widget'>{this._getMessage()}</div>
  }

  _getMessage() {
    switch (this.props.points.length) {
      case 0:
        return <div className='message'>
            Hello! :)<br/>
            This is a very basic react/svg experiment.<br/>
            Click somewhere to start.
          </div>
      case 1:
        return <div className='message'>
            Nice click!<br/>
            Now we have a first point.<br/>
            That is great!<br/>
            But its not enough. Could you please create one more?
          </div>
      case 2:
        return <div className='message'>
            What a progress in just a few seconds!<br/>
            Now we have two points in our world.<br/>
            And they are saved in your computer's memory.<br/>
            You can even refresh your browser and they will be still here!<br/>
            Isn't it amazing? :) <br/>
            But let's go forward. We need one more point. Can you do that?
          </div>
      case 4:
        return <div className='message'>
          Like a boss! You have created your own parallelogram and circle. <br/>
          These two figures are sharing the same center and area.<br/>
          Now you can drag your points around and enjoy magical changes of these numbers:<br/>
          Point 1: {this._formatPoint(this.props.points[0])}<br />
          Point 2: {this._formatPoint(this.props.points[1])}<br />
          Point 3: {this._formatPoint(this.props.points[2])}<br />
          Point 4: {this._formatPoint(this.props.points[3])}<br />
          Area: {Math.round(this.props.area)}
        </div>
    }
  }

  _formatPoint(point) {
    return `(${point.x}, ${point.y})`
  }
}
