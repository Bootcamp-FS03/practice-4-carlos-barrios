import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePost } from 'src/app/core/models/post.model';
import { PostsService } from 'src/app/core/services/posts.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'fs-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass'],
})
export class PostFormComponent {
  isLoading: boolean = false;
  postForm!: FormGroup;
  @Output() postCreated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private profileService: ProfileService
  ) {
    this.postForm = this.fb.group({
      postContent: ['', Validators.required],
    });
  }

  create(): void {
    this.isLoading = true;
    const authorId = this.profileService.profile?._id;

    if (this.postForm.valid && authorId) {
      let createPostBody: CreatePost = {
        author: authorId,
        text: this.postForm.get('postContent')?.value,
      };
      this.postsService.createPost(createPostBody).subscribe({
        next: () => {
          this.isLoading = false;
          this.postForm.reset();
          this.postForm.markAsPristine();
          this.postForm.markAsUntouched();
          this.postCreated.emit(true);
        },
      });
    }
  }
}
