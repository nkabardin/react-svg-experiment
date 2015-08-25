import React from 'react'
import './about.sass'

export default class About extends React.Component {
  render() {
    return <div className='about'>
      <h1>React SVG Experiment</h1>
      <p>JavaScript programming assignment.</p>
      <p>Created by <a href='http://kabardin.com'>Nikita Kabardin</a> in the august 2015.</p>
      <p>Tools and libraries used: </p>
      <ul>
        <li>ES6 with <a href='https://babeljs.io/'>babel</a> as a programming language</li>
        <li><a href='http://facebook.github.io/react/'>React</a> as a main library</li>
        <li><a href='http://webpack.github.io/'>Webpack</a> as a build system</li>
        <li><a href='http://sass-lang.com/'>SASS</a> and <a href='https://github.com/postcss/autoprefixer'>Autoprefixer</a> for styling</li>
        <li><a href='http://eslint.org/'>ESLint</a> to ensure that the code is beautiful</li>
        <li><a href='http://karma-runner.github.io/'>Karma</a>, <a href='https://mochajs.org/'>Mocha</a> and <a href='https://github.com/power-assert-js/power-assert'>power-assert</a> to develop tests</li>
        <li><a href='https://travis-ci.org/'>Travis</a> to run tests in the cloud</li>
      </ul>
      <button onClick={this._close}>
        OK!
      </button>
    </div>
  }

  _close = () => {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}
