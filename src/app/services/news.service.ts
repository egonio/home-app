import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



interface Response {
  articles: [{
    author: string;
    description: string;
    publishedAt: string;
    source: {
      id: number;
      name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
    }
  ];
}

interface SearchResponse {
  __zone_symbol__value: {
    articles: [{
      author: string;
      description: string;
      publishedAt: string;
      source: {
        id: number;
        name: string;
      };
      title: string;
      url: string;
      urlToImage: string;
      }
    ];
  };
}

@Injectable()
export class NewsService  {
  constructor(private http: HttpClient) { }

  newsApi = '&apiKey=a4726bfdbb7348afbf04b04143f03a30';
  topHeadlinesURL = 'https://newsapi.org/v2/top-headlines?';
  topHeadLinesSearchURL = this.topHeadlinesURL + 'country=ca' + this.newsApi;
  everythingURL = 'https://newsapi.org/v2/everything?';


  getTopNews() {
    return this.http.get<Response>(this.topHeadLinesSearchURL).toPromise();
  }

  searchNews(phrase: string) {
    // return this.http.get('https://newsapi.org/v2/top-headlines?q=trump&apiKey=a4726bfdbb7348afbf04b04143f03a30').toPromise();
    return this.http.get<Response>(this.everythingURL + 'q=' + phrase + this.newsApi).toPromise();
  }

  getTopWorldNews() {
    return this.http.get<Response>(this.everythingURL + 'apiKey=a4726bfdbb7348afbf04b04143f03a30').toPromise();
  }

  getCategory( cat: string) {
    return this.http.get<Response>(this.topHeadlinesURL + 'category=' + cat + '&country=ca' + this.newsApi).toPromise();
  }



}

