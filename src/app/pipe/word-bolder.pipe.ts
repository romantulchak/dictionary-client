import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordBolder'
})
export class WordBolderPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const regex = /\|(.*?)\|/g;
    let wordCases = value.match(regex);
    wordCases?.forEach(word =>{
      let s = `<b>${word.replaceAll('|', '')}</b>`;
      value = value.replace(word, s);
    });
    return value;
  }

}