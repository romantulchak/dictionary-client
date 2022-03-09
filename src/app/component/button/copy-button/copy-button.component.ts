import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss']
})
export class CopyButtonComponent implements OnInit {

  @Input('text') text: string;
  @Input('color') color: string = '#fff';

  constructor(private clipboard: Clipboard,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  public copyToClipboard(): void {
    this.clipboard.copy(this.text);
    this.snackbarService.showSuccessMessage(`${this.text} has been copied to clipboard!`)
  }

}
