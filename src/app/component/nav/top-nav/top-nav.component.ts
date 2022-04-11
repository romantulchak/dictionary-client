import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterConstant } from 'src/app/constants/router.constant';
import { WordService } from 'src/app/service/word.service';
import { WordsComponent } from '../../profile/words/words.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public isSearch: boolean = false;
  public isShowSearchBlock: boolean = false;
  private readonly URL_TO_SHOW_SEARCH = `/${RouterConstant.PROFILE_URL}/${RouterConstant.WORDS_URL}`; 

  constructor(private wordService: WordService,
              private router: Router) { }

  ngOnInit(): void {
    this.detectRouteChange();
  }


  public search(value: string): void{
    if(value.length > 1){
      this.isSearch = true;
      setTimeout(() => {
        this.wordService.getWordsByLetter(value).subscribe(
          res=>{
            this.isSearch = false;
            this.wordService.words.next(res);
          }
        );
      }, 500);
    }

    if(value === ''){
      this.getUserWords();
    }
  }

  public detectRouteChange(): void{
    if(this.router.url.startsWith(this.URL_TO_SHOW_SEARCH)){
      this.isShowSearchBlock = true;
    }else{
      this.router.events.subscribe(
        event=> {
          if(event instanceof NavigationEnd && event.url.startsWith(this.URL_TO_SHOW_SEARCH)){
            this.isShowSearchBlock = true;
          }else{
            this.isShowSearchBlock = false;
          }
        }
      )
    }
  }

  private getUserWords(): void{
    this.isSearch = true;
    setTimeout(() => {
        this.wordService.getUserWords().subscribe(
          res=>{
            this.isSearch = false;
            this.wordService.words.next(res);
          }
        );
    }, 500);
  }
}
