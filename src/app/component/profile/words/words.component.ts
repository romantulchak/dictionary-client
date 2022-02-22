import { Component, OnInit } from '@angular/core';
import { WordDTO } from 'src/app/dto/word.dto';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
}
