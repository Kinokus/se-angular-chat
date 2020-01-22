import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'gravatar'
})
export class GravatarPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    return null;
  }

}
