import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RadioService {
  constructor() {}

  radioControl: FormControl = new FormControl('');
}
