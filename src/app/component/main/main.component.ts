import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageDTO } from 'src/app/dto/language.dto';
import { LanguageService } from 'src/app/service/language.service';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public languages: LanguageDTO[];
  public translateWordForm: FormGroup;
  public translatedWords: string[];

  constructor(private formBuilder: FormBuilder,
              private languageService: LanguageService,
              private wordService: WordService) { }

  ngOnInit(): void {
    this.getLanguages();
    this.initTranslateForm();
  }

  public translate(): void{
    this.wordService.translate(this.word, this.languageFrom, this.languageTo).subscribe(
      res=>{
        this.translatedWords = res;
      }
    );
  }

  private initTranslateForm(): void{
    this.translateWordForm = this.formBuilder.group({
      languageFrom: ['', Validators.required],
      languageTo: ['', Validators.required],
      word: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]]
    })
  }

  private getLanguages(): void{
    this.languageService.getAllLanguages().subscribe(
      res=>{
        this.languages = res;
      }
    );
  }

  get languageFrom(): string{
    return this.translateWordForm.get('languageFrom')?.value.code;
  }

  get languageTo(): string{
    return this.translateWordForm.get('languageTo')?.value.code;
  }

  get word(): string{
    return this.translateWordForm.get('word')?.value;
  }
}
