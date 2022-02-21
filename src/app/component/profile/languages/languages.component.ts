import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  public displayedColumns: string[] = ['code', 'name', 'createAt', 'updatedAt', 'edit', 'delete'];
  public totalPages: number;
  public currentPage: number = 0;
  private pageSize: number = 10;
  private urlParams: Params;

  constructor(private languageService: LanguageService,
              private snackbarService: SnackbarService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getLanguageQueryType();
  }

  public delete(id: number): void {
    this.languageService.delete(id).subscribe(
      ()=>{
        this.languages = this.languages.filter(language => language.id !== id);
        this.snackbarService.showSuccessMessage('Language has benn successfully deleted');
      }
    );
  }

  public changePage(page: number) {
    this.getAllLanguages(page);    
  }

  private getLanguageQueryType(): void {
    this.route.queryParams.subscribe(
      res=>{
        if(res.user){
          this.getUserLanguages();         
        }else{
          this.getAllLanguages();
        }
        this.urlParams = res;
      }
    );
  }

  private getUserLanguages(page: number = this.currentPage): void {
    this.languageService.getUserLanguages(page, this.pageSize).subscribe(
      res=>{
        this.languages = res;
      }
    );    
    this.getTotalPagesCount(true);
  } 

  private getAllLanguages(page: number = this.currentPage): void {
    this.languageService.getLanguagesWithPrivileges(page, this.pageSize).subscribe(
      res=>{
        this.languages = res;
      }
    );
    this.getTotalPagesCount(false);
  }

  private getTotalPagesCount(isForUser: boolean): void {
    this.languageService.getTotalPagesCount(this.pageSize, isForUser).subscribe(
      res=>{
        this.totalPages = res;
      }
    );
  }

}
