import React, { Component } from 'react'
import loading from './Loading.gif'

export class Loading extends Component {
  render() {
    return (
      <div>
        <div className='text-center p-2' >
        <img src={loading} alt="loading" />
      </div> </div>
    )
  }
}
export default Loading