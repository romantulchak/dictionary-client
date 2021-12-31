import { Component, Input, OnInit } from '@angular/core';
import { LanguageDTO } from 'src/app/dto/language.dto';
import { LanguageService } from 'src/app/service/language.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @Input() languages: LanguageDTO[];
  public displayedColumns: string[] = ['code', 'name', 'createAt', 'edit', 'delete'];

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.getAllLanguages();
  }

  private getAllLanguages(){
    this.languageService.getAllLanguages().subscribe(
      res=>{
        this.languages = res;
      }
    );
  }
}
