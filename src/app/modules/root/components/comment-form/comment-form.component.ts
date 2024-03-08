import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateComment } from 'src/app/core/models/comment.model';
import { CommentsService } from 'src/app/core/services/comments.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'fs-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.sass'],
})
export class CommentFormComponent {
  @Input() postId!: string;  
  @Output() commentCreated:EventEmitter<void> = new EventEmitter<void>();

  commentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService,
    private profileService: ProfileService
  ) {
    this.commentForm = this.fb.group({
      commentContent: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onComment(): void {
    const authorId = this.profileService.profile?._id;
    if (this.commentForm.valid) {
      let createCommentBody: CreateComment = {
        author: authorId,
        text: this.commentForm.get('commentContent')?.value,
        post: this.postId,
      };
      this.commentsService.createComment(createCommentBody).subscribe({
        next: () => {
          this.commentCreated.emit();
          this.commentForm.reset();
        },
      });
    }
  }
}
