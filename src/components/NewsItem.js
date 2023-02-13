import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description, imageUrl,newsurl,author,date} = this.props ;
    return (
      <div>
            <div className="card">
            <img src={imageUrl?imageUrl:"https://i.ytimg.com/vi/zev9anLXeG8/maxresdefault.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author?author:'unknown'} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
