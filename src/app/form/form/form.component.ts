import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form = this.fb.group({
    content: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);
  }
}
