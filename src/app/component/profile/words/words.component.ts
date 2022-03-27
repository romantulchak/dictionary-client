import { Component, OnInit } from '@angular/core';
import { WordDTO } from 'src/app/dto/word.dto';
import { AlpahbetService } from 'src/app/service/alphabet.service';
import { LanguageService } from 'src/app/service/language.service';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  
  constructor(private alphabetService: AlpahbetService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
    this.getAlpahbetForLanguage();
    this.getLanguagesWithPreferred();
  }

  private getAlpahbetForLanguage(){
    this.alphabetService.getAlphabetForLanguage('ua').subscribe(
      res=>{
        console.log(res);
      }
    );
  }

  private getLanguagesWithPreferred(){
    this.languageService.getLanguagesWithPreferred().subscribe(
      res=>{
        console.log(res);
      }
    );
  }
}
