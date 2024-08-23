// priority.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prioritypipe',
  standalone: true
})
export class PriorityPipe implements PipeTransform {

  private PRIORITY_CHOICES: { [key: string]: string } = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High'
  };

  transform(value: string): string {
    return this.PRIORITY_CHOICES[value] || value;
  }
}
