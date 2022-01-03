import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { LanguageDTO } from 'src/app/dto/language.dto';
import { CreateWordRequest } from 'src/app/request/create-word.request';
import { LanguageService } from 'src/app/service/language.service';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-create-word',
  templateUrl: './create-word.component.html',
  styleUrls: ['./create-word.component.scss']
})
export class CreateWordComponent implements OnInit {

  public languagesFrom: LanguageDTO[];
  public languagesTo: LanguageDTO[];
  public selectedLanguageFrom: LanguageDTO;
  public createWordForm: FormGroup;
  private languages: LanguageDTO[];

  constructor(private formBuilder: FormBuilder,
              private languageService: LanguageService,
              private wordService: WordService) { }

  ngOnInit(): void {
    this.getLanguages();
    this.initCreateWordForm();
  }

  public selectLanguage(matSelect: MatSelectChange): void{
      this.languagesTo = this.languages.filter(language => language !== matSelect.value);
  }

  public addNewLanguage(event: any): void{
    event.preventDefault()
    this.languagesToControls.push(this.initLanguageFields());
  }

  public create(): void{
    const request = new CreateWordRequest(this.languageFromValue.language.name, this.languageFromValue.language.code, this.languageFromValue.word);
    request.languagesTo = this.languagesToValues;
    this.wordService.create(request).subscribe(
      res=>{
        console.log("Word created");
      }
    );
  }

  private initCreateWordForm(): void{
    this.createWordForm = this.formBuilder.group({
      languageFrom: this.initLanguageFields(),
      languagesTo: this.formBuilder.array([this.initLanguageFields()])
    });
  }

  private initLanguageFields(): FormGroup{
   return this.formBuilder.group({
      language: this.formBuilder.control({
        name: '',
        code: '',
        createAt: ''
      }),
      word: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]]
    });
  }

  private getLanguages(): void{
    this.languageService.getAllLanguages().subscribe(
      res=>{
        this.languages = res;
        this.languagesFrom = Object.assign([], res);
        this.languagesTo = Object.assign([], res);
      }
    );
  }

  get languagesToControls(){
    return this.createWordForm.controls['languagesTo'] as FormArray;
  }

  get languageFromValue(): any{
    return this.createWordForm.get('languageFrom')?.value;
  }

  get languagesToValues(): CreateWordRequest[]{
    const value = this.createWordForm.get('languagesTo')?.value;
    const translatedWords: CreateWordRequest[] = [];
    value.forEach((languageTo:any) => {
      const wordRequest = new CreateWordRequest(languageTo.language.name, languageTo.language.code, languageTo.word);
      translatedWords.push(wordRequest);
    });
    return translatedWords;
  }
}
