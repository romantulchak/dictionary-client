import { Component, OnInit } from '@angular/core';
import { WordDTO } from 'src/app/dto/word.dto';
import { AlpahbetService } from 'src/app/service/alphabet.service';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss']
})
export class MyWordsComponent implements OnInit {

  public words: WordDTO[];

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.getUserWords();
  }

  private getUserWords(){
    this.wordService.getUserWords().subscribe(
      res=>{
        this.words = res;
      }
    );
  }
}
