import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
  TemplateRef,
  Type,
} from '@angular/core';
import { NzButtonShape, NzButtonType } from 'ng-zorro-antd/button';
import { ModalButtonOptions, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal',
  template: `
    <button
      nz-button
      [nzType]="modalBtnType"
      (click)="createCustomButtonModal($event)"
    >
      {{ modalBtnTxt }}
    </button>
  `,
})
export class ModalComponent {
  isVisible = false;
  @Input() modalTitle: string = '';
  @Input() modalBtnTxt: string = '';
  @Output() onOpen = new EventEmitter<any>();
  @Input() modalBtnType: NzButtonType = 'primary';
  @Input() modalContentRef: string | TemplateRef<any> | Type<any> | undefined;
  @Input() modalFooterBtns: Array<ModalButtonOptions> | null= null;
  @Input() modalCloseBtn: ModalButtonOptions | null = null;
  @Input() confirmBtn: ModalButtonOptions | null = null;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  createCustomButtonModal(event: any): void {
    this.onOpen.emit(event);
    const modal: NzModalRef = this.modal.create({
      nzTitle: this.modalTitle,
      nzContent: this.modalContentRef,
      nzFooter: (this.modalCloseBtn?.show && this.modalFooterBtns) 
      ? [{
        label: this.modalCloseBtn.label,
        type: this.modalCloseBtn.type,
        onClick:() => modal.destroy()
      }, ...this.modalFooterBtns] 
      : this.modalFooterBtns,
      nzClosable: false,
      nzMaskClosable: false
    });
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getFooterButtons(){
    
  }
}
