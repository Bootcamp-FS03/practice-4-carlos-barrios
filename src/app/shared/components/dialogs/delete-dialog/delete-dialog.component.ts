import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'fs-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.sass'],
})
export class DeleteDialogComponent implements OnDestroy{
  post$!: Observable<Post>;
  postSubscription!: Subscription;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private postService: PostsService
  ) {}

  ngOnDestroy(): void {
    if (this.postSubscription) this.postSubscription.unsubscribe();
  }

  onDeletePost(): void {
    const postId = this.data?._id;
    if (postId) {
      this.post$ = this.postService.deletePost(postId);
      this.postSubscription = this.post$.subscribe({
        next: ()=> {
          this.dialogRef.close();
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
