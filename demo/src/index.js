import React, {Component} from 'react'
import {render} from 'react-dom'

import ReactTimepicki from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-timepicki Demo</h1>
      <ReactTimepicki timeFormat="12" />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
