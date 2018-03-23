import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';


interface Article {
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

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  headlines: Article[];

  ngOnInit() {
  }

  async getHeadLines() {
    try {
      const topNews = await this.newsService.getTopNews();
      this.headlines = topNews.articles;
      console.log(this.headlines);
    } catch (error) {

    }
  }



}
