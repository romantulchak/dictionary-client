import { Component, Input, OnInit } from '@angular/core';
import { LanguageDTO } from 'src/app/dto/language.dto';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @Input() languages: LanguageDTO[];
  public displayedColumns: string[] = ['code', 'name', 'edit', 'delete'];

  constructor() { }

  ngOnInit(): void {
  }

}
