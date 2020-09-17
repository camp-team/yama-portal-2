import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadDialogComponent } from 'src/app/shared/dialogs/image-upload-dialog/image-upload-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  public isComplete: boolean;
  public isChecked = true;
  public isPosition = true;
  public imageFile: string | ArrayBuffer;
  public content = null;
  public isEdit: boolean;

  private file: File | null = null;
  private croppedImage: string = null;
  private currentPosition: google.maps.LatLngLiteral;
  private post: Post;
  private subscriptions: Subscription = new Subscription();

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
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get contentControl(): FormControl {
    return this.form.get('content') as FormControl;
  }

  get categoryControl(): FormControl {
    return this.form.get('category') as FormControl;
  }

  initForm() {
    this.route.queryParamMap.subscribe((map) => {
      if (map.get('id')) {
        const id = map.get('id');
        this.isEdit = true;
        this.subscriptions.add(
          this.postService
            .getPostById(id)
            .pipe(take(1))
            .subscribe((post) => {
              this.form.setValue({
                category: post.category,
                content: post.content,
                public: post.public,
                isPosition: post.isPosition,
              });
              this.post = post;
            })
        );
      }
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
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
    if (this.isEdit) {
      this.postService
        .updatePost(this.form.value, this.file, this.post.id)
        .then(() => {
          this.snackBar.open('更新しました、反映にはリロードが必要です', null, {
            duration: 3000,
          });
          this.router.navigateByUrl('/');
        });
    } else {
      this.postService
        .createPost(this.form.value, this.file, this.currentPosition)
        .then(() => {
          this.isComplete = true;
        })
        .then(() => {
          this.snackBar.open('投稿しました、反映にはリロードが必要です', null, {
            duration: 3000,
          });
          this.router.navigateByUrl('/');
        });
    }
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
