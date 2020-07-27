import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadDialogComponent } from 'src/app/shared/dialogs/image-upload-dialog/image-upload-dialog.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isComplete: boolean;
  isChecked = true;
  imageFile: string | ArrayBuffer;
  file: File | null = null;
  croppedImage: string = null;

  form = this.fb.group({
    category: [
      '',
      [
        Validators.required,
        Validators.pattern(/denger|viewPoint|toilet|water|rest|other/),
      ],
    ],
    content: ['', [Validators.required, Validators.maxLength(500)]],
    public: [true],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
  }

  get categoryControl(): FormControl {
    return this.form.get('category') as FormControl;
  }

  convertImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageFile = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    this.postService.createPost(this.form.value, this.file).then(() => {
      this.isComplete = true;
    });
  }

  openImageUploadDialog() {
    const dialogRef = this.dialog.open(ImageUploadDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.file = result;
        this.convertImage(this.file);
      }
    });
  }

  deleteImage() {
    this.imageFile = null;
    this.file = null;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '';
    }
  }
}
