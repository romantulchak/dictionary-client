import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WordDTO } from 'src/app/dto/word.dto';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.scss']
})
export class WordDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public word: WordDTO) { }

  ngOnInit(): void {
  }

}
