import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WordDTO } from 'src/app/dto/word.dto';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.scss']
})
export class WordDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public word: WordDTO,
              private wordService: WordService) { }

  ngOnInit(): void {
    this.getWordExamples();
  }

  private getWordExamples(): void{
    this.wordService.getWordExamples(this.word.id).subscribe(
      res=>{
        this.word.examples = res;
      },
    );
  }

}
