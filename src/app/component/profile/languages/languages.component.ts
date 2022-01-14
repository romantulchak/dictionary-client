import { Component, Input, OnInit } from '@angular/core';
import { LanguageDTO } from 'src/app/dto/language.dto';
import { LanguageService } from 'src/app/service/language.service';
import { SnackbarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  @Input() languages: LanguageDTO[];
  public displayedColumns: string[] = ['code', 'name', 'createAt', 'edit', 'delete'];

  constructor(private languageService: LanguageService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getAllLanguages();
  }

  public delete(id: number): void {
    this.languageService.delete(id).subscribe(
      ()=>{
        this.languages = this.languages.filter(language => language.id !== id);
        this.snackbarService.showSuccessMessage('Language has benn successfully deleted')
      }
    );
  }

  private getAllLanguages(): void {
    this.languageService.getAllLanguages().subscribe(
      res=>{
        this.languages = res;
      }
    );
  }
}
