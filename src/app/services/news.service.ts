import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



interface HeadlineResponse {
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

@Injectable()
export class NewsService  {
  constructor(private http: HttpClient) { }

  newsApi = 'a4726bfdbb7348afbf04b04143f03a30';

  topHeadLinesUrl = 'https://newsapi.org/v2/top-headlines?' + 'country=ca&' + 'apiKey=' +  this.newsApi;

  getTopNews() {
    return this.http.get<HeadlineResponse>(this.topHeadLinesUrl).toPromise();
  }


}

