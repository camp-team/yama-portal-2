import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadDialogComponent } from 'src/app/shared/dialogs/image-upload-dialog/image-upload-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isComplete: boolean;
  isChecked = true;
  isPosition = true;
  imageFile: string | ArrayBuffer;
  file: File | null = null;
  croppedImage: string = null;
  currentPosition: google.maps.LatLngLiteral;

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
    isPosition: [true],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }

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
    if (!this.form.value.isPosition) {
      this.currentPosition = null;
    }
    this.postService
      .createPost(this.form.value, this.file, this.currentPosition)
      .then(() => {
        this.isComplete = true;
      })
      .then(() => {
        this.snackBar.open('投稿しました', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
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
