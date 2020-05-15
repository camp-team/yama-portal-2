import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form = this.fb.group({
    label: [
      '',
      [
        Validators.required,
        Validators.pattern(/denger|viewPoint|toiler|water|rest/),
      ],
    ],
    content: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
  }

  submit() {
    console.log(this.form.value);
  }
}
