import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input("totalPages") totalPages: number; 
  @Input("currentPage") currentPage: number = 0;
  @Output("changePage") changePageEvent: EventEmitter<number> = new EventEmitter<number>();
  public pagesToShow: number[] = [];

  constructor() { }

  ngOnInit(): void {
      console.log(this.totalPages);
      
  }

  public nextPage(): void {
    this.currentPage++;
    this.changePageEvent.emit(this.currentPage);
  }

  public previousPage(): void{
    this.currentPage--;
    this.changePageEvent.emit(this.currentPage);
  }

}
