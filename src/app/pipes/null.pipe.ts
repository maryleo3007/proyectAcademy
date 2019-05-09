import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nulos'
})
export class NullPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value === null) {
            return '-';
        } else {
            return value;
        }

    }
}