// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RootRoutingModule } from './root-routing.module';

// components
import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';
import { RootComponent } from './root/root.component';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './components/post/post.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/components/dialogs/delete-dialog/delete-dialog.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';

@NgModule({
  declarations: [
    LayoutComponent,
    RootComponent,
    FeedComponent,
    PostComponent,
    PostFormComponent,
    DeleteDialogComponent,
    PostCommentsComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    RootRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule
  ],
})
export class RootModule {}

// TODO: move pages into their own folder
