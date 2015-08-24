import 'normalize.css/normalize.css'
import './index.sass'

import React from 'react'
import Experiment from './experiment'

document.addEventListener('DOMContentLoaded', (event) => {
  React.render(React.createElement(Experiment), document.getElementById('experiment_container'))
})
