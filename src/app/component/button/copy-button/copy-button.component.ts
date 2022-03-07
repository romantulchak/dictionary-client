import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss']
})
export class CopyButtonComponent implements OnInit {

  @Input('text') word: string;

  constructor(private clipboard: Clipboard,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  public copyToClipboard(): void {
    this.clipboard.copy(this.word);
    this.snackbarService.showSuccessMessage(`${this} has been copied to clipboard!`)
  }

}
