import React, { Component } from 'react'
import { NewsItem } from '../NewsItem'


export  class News extends Component {
    // articles ek array hai
    

    constructor(){
        super();
        console.log("i am a constructor from news component");
        // this.state={} --> ye  humlog ne ek object banaya hai
        this.state={     
            articles: [],  
            loading: false,
            page:1    

        }
    }
    async componentDidMount(){
        console.log("cdm");
        let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=544b1919f1a648b4aba16d29cc586a15&pageSize=20";
        let data= await fetch(url);
        let parsedData= await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles , totalResults: parsedData.totalResults})
    }
    handlePrevClick = async () =>{
        console.log("previous");
        let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=544b1919f1a648b4aba16d29cc586a15&page=${this.state.page -1}&pageSize=20`;
            let data= await fetch(url);
            let parsedData= await data.json();
            console.log(parsedData);
            
        this.setState({
            page: this.state.page -1,
            articles: parsedData.articles
            


        })   
    }
    handleNextClick =async () =>{
        console.log("next");
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

        }
        else{
        let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=544b1919f1a648b4aba16d29cc586a15&page=${this.state.page +1}&pageSize=20`;
            let data= await fetch(url);
            let parsedData= await data.json();
            console.log(parsedData);
            
        this.setState({
            page: this.state.page +1,
            articles: parsedData.articles
            


        }) }  

        
    }
        
    
    render() {
        console.log("render");
        return (
            
            <div className="container  my-4">
                <h2 className="text-center">NewsPanda- Top Headlines</h2>
                <div className="row">
                {this.state.articles.map((element)=>{
                       return <div className="col-md-4" key={element.url}>
                
                        <NewsItem   title={element.title?element.title.slice(0,48):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                        </div>

                })}
                </div>
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
                <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>


                </div>
            </div>

                
            
        )
    }
   

}


    



