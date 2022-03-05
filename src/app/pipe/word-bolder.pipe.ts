import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordBolder'
})
export class WordBolderPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const regex = /\|(.*?)\|/g;
    let toBeModified = value.match(regex);
    console.log(regex.test(value));
    return value.replaceAll('|', '<b>')
                .replaceAll('/', '</b>');
  }

}
