import { Component, OnInit } from '@angular/core';
import { LanguageDTO } from 'src/app/dto/language.dto';
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
  
  private selectedLanguage: LanguageDTO;

  constructor(private alphabetService: AlpahbetService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
    this.getLanguagesWithPreferred();
  }

  private getAlpahbetForLanguage(): void{
    this.alphabetService.getAlphabetForLanguage(this.selectedLanguage.code).subscribe(
      res=>{
        console.log(res);
      }
    );
  }

  private getLanguagesWithPreferred(): void{
    this.languageService.getLanguagesWithPreferred().subscribe(
      res=>{
        if(res){
          this.selectedLanguage = res[0];
          this.getAlpahbetForLanguage();
        }
      }
    );
  }
}
