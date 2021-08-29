import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData?: PostData;
  creatorName: string="";
  creatorDescription: string="";
  firesotre= new FirebaseTSFirestore();
  str: string="";
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCreatorInfo();
  }

  onReplyClick(){
    this.dialog.open(ReplyComponent, {data: this.postData?.postId});
  }

  getCreatorInfo(){
    if(this.postData != null){
      this.str=this.postData.creatorId;
    }
    this.firesotre.getDocument(
      {
        path: ["Users", this.str], 
        onComplete: result => {
          let userDocument = result.data();
          if(userDocument != null){
            this.creatorName= userDocument.publicName;
            this.creatorDescription= userDocument.description;
          }
        } 
      }
    );
  }

}
