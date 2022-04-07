import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LanguageDTO} from 'src/app/dto/language.dto';
import { WordDTO } from 'src/app/dto/word.dto';
import { DialogService } from 'src/app/service/dialog.service';
import {LanguageService} from 'src/app/service/language.service';
import {WordService} from 'src/app/service/word.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public languages: LanguageDTO[];
  public translateWordForm: FormGroup;
  public translatedWords: WordDTO[];
  public translatedWordNotFound: string;
  public audioPlay: boolean = false;
  public currentIndex: number;

  constructor(private formBuilder: FormBuilder,
              private languageService: LanguageService,
              private wordService: WordService,
              public dialogService: DialogService) { }

  ngOnInit(): void {
    this.getLanguages();
    this.initTranslateForm();
  }

  public translate(): void {
    this.wordService.translate(this.word, this.languageFrom, this.languageTo).subscribe(
      res => {
        this.translatedWords = res;
        console.log(res);

        this.translatedWordNotFound = '';
      },
      error => {
        this.translatedWordNotFound = error.error.message;
      }
    );
  }

  public swapLanguage(event: any): void {
    event.preventDefault();
    const languageFrom = this.languages.find(language => language.code === this.languageFrom);
    const languageTo = this.languages.find(language => language.code === this.languageTo);
    [this.languageFrom, this.languageTo] = [languageTo, languageFrom];
  }

  private initTranslateForm(): void {
    this.translateWordForm = this.formBuilder.group({
      languageFrom: ['', Validators.required],
      languageTo: ['', Validators.required],
      word: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]]
    })
  }

  private getLanguages(): void {
    this.languageService.getAllLanguages().subscribe(
      res => {
        this.languages = res;
      }
    );
  }

  get languageFrom(): string {
    return this.translateWordForm.get('languageFrom')?.value.code;
  }

  get languageTo(): string {
    return this.translateWordForm.get('languageTo')?.value.code;
  }

  set languageFrom(value: any) {
    this.translateWordForm.get('languageFrom')?.setValue(value);
  }

  set languageTo(value: any) {
    this.translateWordForm.get('languageTo')?.setValue(value);
  }

  get word(): string {
    return this.translateWordForm.get('word')?.value;
  }
}
