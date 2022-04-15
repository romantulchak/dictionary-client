import { Component, Input, OnInit } from '@angular/core';
import { WordDTO } from 'src/app/dto/word.dto';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent implements OnInit {

  @Input() words: WordDTO[] = [];

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }

}
