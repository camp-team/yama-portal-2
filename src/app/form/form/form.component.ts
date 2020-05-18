import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
  }

  submit() {
    const formData = this.form.value;
    this.postService.createPost({
      userId: this.authService.userId,
      label: formData.label,
      content: formData.content,
    });
  }
}
