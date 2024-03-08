import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';
import { ProfileService } from 'src/app/core/services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/components/dialogs/delete-dialog/delete-dialog.component';
import { PostsService } from 'src/app/core/services/posts.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fs-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent implements OnDestroy{
  @Input() post!: Post;
  @Output() postDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  post$!: Observable<Post>;
  postSubscription!: Subscription;
  updateForm!: FormGroup;
  isEditing: boolean = false;
  editedText: string = '';
  showCommentForm: boolean = false; 

  constructor(
    public readonly profileService: ProfileService,
    private dialog: MatDialog,
    private postService: PostsService,
    formBuilder:FormBuilder
  ) {
    this.updateForm = formBuilder.group({
      editedText: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnDestroy(): void {
    if(this.postSubscription) this.postSubscription.unsubscribe();
  }

  onDeletePost() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: this.post,
    });

    dialogRef.afterClosed().subscribe({
      next: () => this.postDeleted.emit(true),
    });
  }

  onEditPost(): void {
    this.isEditing = true;
    this.editedText = this.post.text;
    (this.updateForm.controls['editedText'] as FormControl).setValue(this.post.text);

  }

  onSavePost(): void {
    if (this.editedText === this.post.text) {
      this.isEditing = false;
      return;
    }

    this.post.text = this.editedText;
    this.isEditing = false;
    this.post$ = this.postService.updatePost(this.post._id, this.post );
    this.postSubscription = this.post$.subscribe();
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.editedText = this.post.text;
  }

  getErrorMessage(field: string): string {
    const control = this.updateForm.get(field);
    if (control?.hasError('required')) {
      return 'Text can not be empty';
    } else if (control?.hasError('minlength')) {
      return 'Text must be at least 5 characteres long';
    }
    return '';
  }
}
