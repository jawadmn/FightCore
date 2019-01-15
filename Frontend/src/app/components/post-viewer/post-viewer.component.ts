import { PostService } from './../../services/post.service';
import { TabComponentInterface } from './../tabs/tab/tab-component.interface';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Post } from '../../models/Post';
import { PostInfo } from 'src/app/resources/post-info';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.scss']
})
export class PostViewerComponent implements OnInit, TabComponentInterface {
  @Input('data') data: Post;
  @Input('simpleMode') simpleMode = false;
  @ViewChild('bodyEditor') bodyEditor: EditorComponent;

  isLoading: boolean;
  editing: boolean;

  constructor(private postService: PostService) { }

  ngOnInit() {
    // If showing full post and don't have all data, then need to load that data
    if (!this.simpleMode && !this.data.createdDate) {
      this.isLoading = true;
      this.editing = false;
      this.postService.getPost(this.data.id).subscribe(
        post => {
          this.isLoading = false;
          this.data = post;
        },
        error => {
          this.isLoading = false;
          console.log('Failed to get data', error);
        }
      );
    }
  }

  // TODO: Rewrite all the following to call into a more centralized location to get this info
  isCombo(): boolean {
    return this.data.category === PostInfo.CombosCatId;
  }
  getCategoryName(): string {
    return this.data.category + ' (cat name)';
  }
  getAuthorName(): string {
    if (!this.data.author) {
      return null;
    }
    return this.data.author.userName;
  }
  getCharacterIcon(characterId: number): string {
    return characterId + ' (icon)';
  }
  isDeveloper(): boolean {
    return false;
  }

  isEditing(): boolean {
    return this.editing;
  }

  toggleEditing(): void {
    // TODO look for user id.
    if (this.data.authorId === 1) {
      this.editing = !this.editing;
    }
    setTimeout(() => {this.bodyEditor.editor.pasteHTML(this.data.content);
    }, 100);
  }
}
