import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageDTO } from 'src/app/dto/language.dto';
import { CountryFlag } from 'src/app/model/country-flag.model';
import { CreateLanguageRequest } from 'src/app/request/create-language.request';
import { LanguageService } from 'src/app/service/language.service';

@Component({
  selector: 'app-create-language',
  templateUrl: './create-language.component.html',
  styleUrls: ['./create-language.component.scss']
})
export class CreateLanguageComponent implements OnInit {

  public flags: CountryFlag[];
  public selectedFlag: CountryFlag;
  public languageForm: FormGroup;
  public errorMessage: string;
  public languages: LanguageDTO[];

  constructor(private languageService: LanguageService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initLanguageForm();
    this.getAllLanguages();
  }

  public selectFlag(flag: CountryFlag): void{
    this.selectedFlag = flag;
    this.code = flag.code;
  }

  public create(): void{
      if(this.code.valid && this.name.valid){
        const createLanguageRequest = new CreateLanguageRequest(this.name.value, this.code.value);
        this.languageService.create(createLanguageRequest).subscribe(
          res=>{
            this.languages.push(createLanguageRequest);
            this.flags = this.flags.filter(flag => flag.code != this.code.value);
          },
          error=>{
            this.errorMessage = error.error.message;
          }
        );
      }else{
        this.errorMessage = "Enter correct name and choose country flag";
      }
  }

  public getAllLanguages(){
    this.languageService.getAllLanguages().subscribe(
      res=>{
        this.languages = res;
        this.getCountryFlags();
      }
    );
  }

  private getCountryFlags(): void{
    this.languageService.getCountryFlags().subscribe(
      res=>{
        const existingCodes = this.languages.map(language => language.code);
        this.flags = res.filter(flag => !existingCodes.includes(flag.code));
      }
    );
  }

  private initLanguageForm(): void{
    this.languageForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      code: [this.selectedFlag?.code, [Validators.required]]
    });
  }

  get name(): FormControl{
    return this.languageForm.get('name') as FormControl;
  }

  get code(): FormControl{
    return this.languageForm.get('code') as FormControl;
  }

  set code(value: any){
    this.languageForm.get('code')?.setValue(value);
  }

}
