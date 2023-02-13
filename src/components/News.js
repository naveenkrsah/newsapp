import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps ={
    country :'in',
    pagesize : 5,
    category: 'general'
  }
  static propTypes ={
    country: PropTypes.string,
    pagesize : PropTypes.number,
    category: PropTypes.string
  }
  capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log("hello i am a constructor from news.js");
    this.state = {
      articles : [],
      loading : false,
      page : 1,
      totalResults :0 
    }
    document.title = `NewsMonkey - ${this.capitalize(this.props.category)}`;
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef80a7ce8824b3995e4347524b8c596&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles ,
      totalresults: parsedData.totalResults})

  }
  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef80a7ce8824b3995e4347524b8c596&pagesize=${this.props.pagesize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles ,totalresults: parsedData.totalResults})
    this.updateNews();
  }


  handleprevclick = async ()=>{
    // console.log("prev");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef80a7ce8824b3995e4347524b8c596&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({page: this.state.page-1,
    //   articles: parsedData.articles,
    //   loading:false
    // });
    this.setState({page: this.state.page-1});
    this.updateNews();
  }

  handlenextclick = async ()=>{
    // console.log("next");
    // if(this.state.page +1 > Math.ceil(this.state.totalresults/this.props.pagesize)){

    // }
    // else{
    //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef80a7ce8824b3995e4347524b8c596&page= ${this.state.page+1}&pagesize=${this.props.pagesize}`;
    //       this.setState({loading:true});
    //       let data = await fetch(url);
    //       let parsedData = await data.json();
    //       console.log(parsedData);
    //       this.setState({
    //         page: this.state.page+1,
    //         articles: parsedData.articles,
    //         loading: false
    //       });
    this.setState({page: this.state.page+1});
    this.updateNews();
  }
  fetchMoreData = async () =>{
    this.setState({page:this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9ef80a7ce8824b3995e4347524b8c596&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles) ,
      totalresults: parsedData.totalResults,
      loading: false
    })

  }
    
  
  
  render() {
    return (
      <>
      // <div className='container my-3'>
        <h1 className="text-center" style={{margin :'35px 0px'}}>Newsmonkey-Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading &&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
            <div className="container">
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4 my-3" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl = {element.urlToImage}
                newsurl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
          })}
          </div>
        </div>
          </InfiniteScroll>
        {/* <div className="container my-4 d-flex justify-content-between ">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr;Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalresults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next&rarr;</button>
        </div> */}
       
        
      // </div>
      </>
    )
  }
}

export default News
