import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { WordDetailsComponent } from "../component/dialog/word-details/word-details.component";
import { WordDTO } from "../dto/word.dto";

@Injectable({
    providedIn: 'root'
})
export class DialogService{

    constructor(private dialog: MatDialog){

    }

    public showWordDetails(word: WordDTO): void{
        this.dialog.open(WordDetailsComponent, {
          data: word,
          width: '1000px',
          height: '420px'
        });
      };
}