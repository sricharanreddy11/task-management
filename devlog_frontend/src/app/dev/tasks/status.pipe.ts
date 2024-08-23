// status.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statuspipe',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  private STATUS_CHOICES: { [key: string]: string } = {
    'todo': 'To Do',
    'in_progress': 'In Progress',
    'completed': 'Completed'
  };

  transform(value: string): string {
    return this.STATUS_CHOICES[value] || value;
  }
}
