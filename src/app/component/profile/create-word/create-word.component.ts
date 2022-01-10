import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { LanguageDTO } from 'src/app/dto/language.dto';
import { CreateWordRequest } from 'src/app/request/create-word.request';
import { LanguageService } from 'src/app/service/language.service';
import { SnackbarService } from 'src/app/service/snack-bar.service';
import { WordService } from 'src/app/service/word.service';

const LANGUAGES_CONTROL = 'languages';
const LANGUAGE_CONTROL = 'language';

@Component({
  selector: 'app-create-word',
  templateUrl: './create-word.component.html',
  styleUrls: ['./create-word.component.scss']
})
export class CreateWordComponent implements OnInit {

  public languagesFrom: LanguageDTO[];
  public selectedLanguageFrom: LanguageDTO;
  public createWordForm: FormGroup;
  public languages: LanguageDTO[];
  public currentAddLanguagesLength: number = 1;
  private selectedLanguagesTo: LanguageDTO[] = [];

  constructor(private formBuilder: FormBuilder,
              private languageService: LanguageService,
              private wordService: WordService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getLanguages();
    this.initCreateWordForm();
  }

  public selectLanguageFrom(matSelect: MatSelectChange): void{
    const selectedLanguage: LanguageDTO = matSelect.value;
    this.selectedLanguageFrom = selectedLanguage;
    this.selectedLanguagesTo.push(selectedLanguage);
    this.languagesToControls.controls.forEach(control => {
      const languages = control.get(LANGUAGES_CONTROL);
      const availableValues = languages?.value.filter((language: LanguageDTO) => language !== selectedLanguage);
      languages?.setValue(availableValues);
      const selectedValueForControl = control.get(LANGUAGE_CONTROL);
      if(selectedValueForControl?.value.code === selectedLanguage.code){
        selectedValueForControl.setValue('');
      }
    });
  }

  public addNewLanguage(event: any): void{
    event.preventDefault();
    this.languagesToControls.push(this.initLanguageFields());
    const availableValues = this.languages.filter(language => !this.selectedLanguagesTo.includes(language));
    this.setLanguagesForElementByIndex(availableValues, --this.languagesToControls.value.length);
    this.currentAddLanguagesLength++;
  }

  public create(): void{
    const wordValues = this.languageFromValue.words.map((word: any) => word.word);
    const request = new CreateWordRequest(this.languageFromValue.language.name, this.languageFromValue.language.code, wordValues);
    request.languagesTo = this.languagesToValues;
    this.wordService.create(request).subscribe(
      ()=>{
        this.snackbarService.showSuccessMessage('Word has been created!')
      },
      error =>{
        this.snackbarService.showErrorMessage(error.error.message);
      }
    );
  }

  public removeWord(wordIndex: number): void{
    this.getWordsFromControl().removeAt(wordIndex);
  }

  public removeWordFromTranslatedLanguage(languageIndex: number, wordIndex: number): void{
    this.getWordsToControl(languageIndex).removeAt(wordIndex);
  }

  public addWordToTranslatedLanguage(event: any, index: number): void{
    event.preventDefault();
    this.getWordsToControl(index).push(this.initWordGroup());

  }

  public addWord(event: any): void{
    event.preventDefault();
    this.getWordsFromControl().push(this.initWordGroup());
  }

  public selectLanguageTo(selectChange: MatSelectChange, index: number): void{
    const selectedValue = selectChange.value;
    this.selectedLanguagesTo.push(selectedValue);
    this.languagesToControls.controls.forEach((control, i) => {
      if(index !== i){
        const languages = control.get(LANGUAGES_CONTROL);
        const controlLanguage = control.get(LANGUAGE_CONTROL)?.value as LanguageDTO;
        const availableValues = languages?.value.filter((language: LanguageDTO) => !this.selectedLanguagesTo.includes(language) || language === controlLanguage);
        languages?.setValue(availableValues);
      }
    });
  }

  public getWordsToControl(index: number): FormArray{
    return this.createWordForm.controls['languagesTo'].get([index])?.get('words') as FormArray;
  }

  public getWordsFromControl(): FormArray{
    return this.createWordForm.controls['languageFrom'].get('words') as FormArray;
  }

  private initCreateWordForm(): void{
    this.createWordForm = this.formBuilder.group({
      languageFrom: this.initLanguageFields(),
      languagesTo: this.formBuilder.array([this.initLanguageFields()]),
    });
  }

  private initLanguageFields(): FormGroup{
   return this.formBuilder.group({
      language: this.formBuilder.control({
        name: '',
        code: '',
        createAt: ''
      }, Validators.required),
      languages: [],
      words: this.formBuilder.array([this.initWordGroup()])
    });
  }

  private getLanguages(): void{
    this.languageService.getAllLanguages().subscribe(
      res=>{
        this.languages = res;
        this.languagesFrom = Object.assign([], res);
        this.setLanguagesForElementByIndex(res, 0);
      }
    );
  }

  private initWordGroup(): FormGroup{
    return this.formBuilder.group({
      word: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]]
    })
  }

  private setLanguagesForElementByIndex(value: LanguageDTO[], index: number){
    this.createWordForm.get(`languagesTo.${index}.${LANGUAGES_CONTROL}`)?.setValue(value);
  }

  get languagesToControls(){
    return this.createWordForm.controls['languagesTo'] as FormArray;
  }

  get languagesFromControls(){
    return this.createWordForm.controls['languageFrom'].get('words') as FormArray;
  }

  get languageFromValue(): any{
    return this.createWordForm.get('languageFrom')?.value;
  }

  get languagesToValues(): CreateWordRequest[]{
    const value = this.createWordForm.get('languagesTo')?.value;
    const translatedWords: CreateWordRequest[] = [];
    value.forEach((languageTo:any) => {
      const wordValues = languageTo.words.map((word: any) => word.word);
      const wordRequest = new CreateWordRequest(languageTo.language.name, languageTo.language.code, wordValues);
      translatedWords.push(wordRequest);
    });
    return translatedWords;
  }

}
