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
  private audio: HTMLAudioElement;


  constructor() { }

  ngOnInit(): void {
    console.log(this.size);
    
  }

  public play(): void{
    this.isAudioPlay = true;
    this.audio = new Audio(this.url);
    this.audio.load();
    this.audio.play();
    this.audio.onended = () =>{
      this.isAudioPlay = false;
    }
  }

  public stop(): void{
    if(this.audio){
      this.audio.pause();
      this.isAudioPlay = false;
    }
  }

}
