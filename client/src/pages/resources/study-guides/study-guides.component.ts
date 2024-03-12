import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-study-guides',
  templateUrl: './study-guides.component.html',
  styleUrls: ['./study-guides.component.css']
})
export class StudyGuidesComponent implements OnInit {
  title: string = '';
  description: string = '';
  attachment: File | null = null;
  modalRef: any;
  isVisible: boolean = false;
  studyGuides: { title: string, description: string, attachment: File | null}[] = [
    {
      title: 'Guide 1',
      description: 'Description for Guide 1',
      attachment: null // Initialize attachment to null for each guide
    },
    {
      title: 'Guide 2',
      description: 'Description for Guide 2',
      attachment: null
    },
    {
      title: 'Guide 3',
      description: 'Description for Guide 3',
      attachment: null
    }
  ];
  
  constructor(private modalService: NzModalService) { }

  ngOnInit(): void {
    // Load study guides if needed
  }

  openAddGuideModal() {
    this.modalService.create({
      nzTitle: 'Add New Study Guide',
      nzContent: AddStudyGuideModalComponent,
      nzFooter: null
    });
  }
  onFileChange(event: any) {
    this.attachment = event.target.files[0];
  }
  
  addGuide() {
    const data = {
      title: this.title,
      description: this.description,
      attachment: this.attachment ? this.attachment.name : ''
    };
    // Pass data back to parent component
    this.modalRef.close(data);
  }
  
  close() {
    this.modalRef.close();
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}



export class AddStudyGuideModalComponent {

  constructor(private modalRef: NzModalRef) { }

}