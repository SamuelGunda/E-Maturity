import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = Math.floor(value % 60);

    return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
  }
}
