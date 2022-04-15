import { Component, OnInit } from '@angular/core';
import { WordDTO } from 'src/app/dto/word.dto';
import { DialogService } from 'src/app/service/dialog.service';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-my-words',
  templateUrl: './my-words.component.html',
  styleUrls: ['./my-words.component.scss']
})
export class MyWordsComponent implements OnInit {

  public words: WordDTO[];

  constructor(private wordService: WordService,
              public dialogService: DialogService) { }

  ngOnInit(): void {
    this.detectWordChanges();
    this.detectLetterChanges();
  }

  private detectWordChanges(): void{
    this.wordService.words.subscribe(res => {
      if(res){
        this.words = res;
      }
    });
  }

  private detectLetterChanges(): void{
    this.wordService.letterSelected.subscribe(
      res=>{
        if(!res){
          this.getUserWords();
        }
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
