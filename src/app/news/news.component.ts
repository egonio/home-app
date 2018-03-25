import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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

  newsCards: Article[];
  searchForm: FormGroup;
  message = '';

  ngOnInit() {
    this.searchForm =  new FormGroup({
      search: new FormControl('', Validators.required)
    });
  }

  async getHeadLines() {
    try {
      this.message = 'Top Headlines';
      const topNews = await this.newsService.getTopNews();
      this.newsCards = topNews.articles;
      console.log(this.newsCards);
    } catch (error) {
      console.log(error);
    }
  }

  async search(phrase: any) {
    try {
      console.log(phrase.value.search);
      const search = await this.newsService.searchNews(phrase.value.search);
      this.newsCards = search.articles;
      this.message = 'Searches for: ' + phrase.value.search;
      this.searchForm.reset();
    } catch (error) {
      console.log(error);
    }
  }

  async getCategory(category: string) {
    try {
      this.message = category.toUpperCase();
      const categoryNews = await this.newsService.getCategory(category);
      this.newsCards = categoryNews.articles;
    } catch (error) {
      console.log(error);
    }

  }

}
