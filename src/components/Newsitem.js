import React, { Component } from 'react'



export class Newsitem extends Component {
 
  render() {
    let {title, description,imageurl,newsurl,author,date,source} = this.props;
    return (
   
      <div className=''>
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger border border-black" style={{left:"90%",zIndex:'1'}}>{source}</span>
  <img src={!imageurl?"https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1280px-Flag_of_India.svg.png":imageurl} className="card-img-top" alt="img"/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsurl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem