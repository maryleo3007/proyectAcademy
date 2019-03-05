import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === true) {
      return 'ACTIVO'
    } else {
      return 'INACTIVO'
    }
  }

}
