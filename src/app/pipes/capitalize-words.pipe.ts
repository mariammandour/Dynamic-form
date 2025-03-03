import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeWords'
})
export class CapitalizeWordsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    return value.replace(/\b\w/g, (first) => first.toLocaleUpperCase());
  }

}