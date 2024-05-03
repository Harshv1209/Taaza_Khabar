import React, { Component } from "react";
import Newsitem from "./Newsitem";
import { Loading } from "./Loading";
import PropTypes from 'prop-types';
import Infinitescroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:5,
    category:"general"
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title=`${this.capitalizefirstletter(this.props.category)}-Taaza Khabar`
  }
  capitalizefirstletter=(string)=>{
    return string.charAt(0).toUpperCase() +string.slice(1)
  }
  async updateNews(pageno){
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e4b54e2fc9e434abb820219c1532f5a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }
  handleprevclick = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();
  };
  handlenextclick = async () => {
    this.setState({page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData=async()=>{
    this.setState({page: this.state.page + 1 });
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e4b54e2fc9e434abb820219c1532f5a&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({
    articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
    loading:false,
  });
  
  }
  render(){
    return (
      <>
        <h1 className="text-center" >Taaza Khabar:- Top {this.capitalizefirstletter(this.props.category)} Headlines</h1>
       {/* {this.state.loading&&<Loading/>} */}
       <Infinitescroll
       dataLength={this.state.articles.length}
       next={this.fetchMoreData}
       hasMore={this.state.articles.length!==this.state.totalResults}
       loader={<Loading/>}>
        <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title}
                  description={element.description}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}

                />
              </div>
            );
          })}
        </div>
        </div>
        </Infinitescroll>
        
      </>
    );
  }
}

export default News;
