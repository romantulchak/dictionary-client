import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent implements OnInit {

  @Input() url: string;
  @Input() size: string = "s";
  @Input() isBackgroundEnabled: boolean = false;
  public isAudioPlay: boolean;


  constructor() { }

  ngOnInit(): void {
    console.log(this.size);
    
  }

  public play(): void{
    this.isAudioPlay = true;
    const audio = new Audio(this.url);
    audio.load();
    audio.play();
    audio.onended = () =>{
      this.isAudioPlay = false;
    }
  }

}
