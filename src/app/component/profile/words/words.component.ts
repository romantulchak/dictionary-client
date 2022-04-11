import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { LanguageDTO } from 'src/app/dto/language.dto';
import { LetterDTO } from 'src/app/dto/letter.dto';
import { AlpahbetService } from 'src/app/service/alphabet.service';
import { LanguageService } from 'src/app/service/language.service';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {

  public languages: LanguageDTO[];
  public letters: LetterDTO[] | null;
  public selectedLanguage: LanguageDTO;
  public selectedLetter: LetterDTO | null;
  public showAlphabetLetters: boolean = true;

  constructor(private alphabetService: AlpahbetService,
              private languageService: LanguageService,
              private wordService: WordService) { }

  ngOnInit(): void {
    this.getLanguagesWithPreferred();
    this.getUserWords();
  }

  public selectLanguage(language: MatSelectChange): void{
    this.selectedLanguage = language.value;
    this.selectedLetter = null;
    this.getAlpahbetForLanguage();
  }

  public selectLetter(letter: LetterDTO): void{
    if(this.selectedLetter === letter){
      this.selectedLetter = null;
      this.getUserWords();
    }else{
      this.selectedLetter = letter;
      this.findWordsByLetter();
    }
  }

  public showHideAlphabetLetters(): void{
    this.showAlphabetLetters = !this.showAlphabetLetters;
  }

  private getAlpahbetForLanguage(): void{
    this.alphabetService.getAlphabetForLanguage(this.selectedLanguage.code).subscribe(
      res=>{
        this.letters = res;
      },
      ()=>{
        this.letters = null;
      }
    );
  }

  private getLanguagesWithPreferred(): void{
    this.languageService.getLanguagesWithPreferred().subscribe(
      res=>{
        if(res){
          this.languages = res;
          this.selectedLanguage = res[0];
          this.getAlpahbetForLanguage();
        }
      }
    );
  }

  private findWordsByLetter(): void{
    this.wordService.getWordsByLetter(this.selectedLetter?.letter).subscribe(
      res=>{
        this.wordService.words.next(res);
      }
    );
  }

  private getUserWords(): void{
    this.wordService.getUserWords().subscribe(
      res=>{
        this.wordService.words.next(res);
      }
    );
  }
}
