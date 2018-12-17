import React, { Component } from 'react'

export default class Chart extends Component {
  render() {
    if (this.props.render) {
      return this.props.render();
    }
    return (
      <div>
        Chart
      </div>
    )
  }
}
