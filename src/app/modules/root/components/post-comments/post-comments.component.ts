import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models/comment.model';
import { CommentsService } from 'src/app/core/services/comments.service';

@Component({
  selector: 'fs-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.sass'],
})
export class PostCommentsComponent implements OnInit {
  @Input() postId!: string;

  comments: Comment[] = [];
  showComments: boolean = false;
  visibleComments: number = 2;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentsService.getComments(this.postId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
    });
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  loadMoreComments(): void {
    this.visibleComments += 2;
  }

  handleCommentCreated(): void {
    this.getComments();
    if (!this.showComments) {
      this.toggleComments();
    }
  }
}
