import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPascalCase'
})
export class ToPascalCasePipe implements PipeTransform {

  transform(string: string, splitWords: boolean = false): string {

    if (typeof string === "string") {
      if (splitWords) {
        let capitalIndexes = string.split('').reduce((indexArr: number[], char: string, i) => {
          if (char.toUpperCase() === char) {
            indexArr.push(i)
          }
          return indexArr
        }, [])
        let buffer = string.split('')
        let indexIncrement = 0
        capitalIndexes.forEach(index => {
          index += indexIncrement;
          buffer.splice(index, 0, ' ');
         indexIncrement++
        })
        string = buffer.join('');
      }


      let text = string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.toLowerCase().slice(1)).join(' ');


      return text
  }
    return '';
  }

}
