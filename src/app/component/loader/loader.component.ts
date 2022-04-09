import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public loading: boolean;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.getLoading();
  }

  private getLoading(): void{
    this.loaderService.isLoading.pipe(delay(0)).subscribe(
      res=>{
        this.loading = res;
      }
    );
  }

}
