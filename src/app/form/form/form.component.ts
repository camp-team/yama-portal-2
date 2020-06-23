import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isComplete: boolean;
  isChecked = true;
  imageURL: string | ArrayBuffer;
  file: File;

  form = this.fb.group({
    label: [
      '',
      [
        Validators.required,
        Validators.pattern(/denger|viewPoint|toilet|water|rest|other/),
      ],
    ],
    content: ['', [Validators.required, Validators.maxLength(500)]],
    public: [true],
  });

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {}

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
  }

  get labelControl(): FormControl {
    return this.form.get('label') as FormControl;
  }

  convertImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageURL = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  setImage(event) {
    if (event.target.files.length) {
      this.file = event.target.files[0];
      this.convertImage(this.file);
    }
  }

  submit() {
    if (this.file) {
      this.postService.createPost(this.form.value, this.file).then(() => {
        this.isComplete = true;
      });
    } else {
      const file = null;
      this.postService.createPost(this.form.value, file).then(() => {
        this.isComplete = true;
      });
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '';
    }
  }
}
