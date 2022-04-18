import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-all-words',
  templateUrl: './all-words.component.html',
  styleUrls: ['./all-words.component.scss']
})
export class AllWordsComponent implements OnInit {

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
  }

  private getTopWordsByLanguage(): void{
  }
}
