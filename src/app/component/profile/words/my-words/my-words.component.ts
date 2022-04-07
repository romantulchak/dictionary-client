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
    this.wordService.words.subscribe(res => {
        this.words = res;
    });
  }
}
