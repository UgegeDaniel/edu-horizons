import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isVisible = false;
  isConfirmLoading = false;
  form: FormGroup | undefined;
  switchValue = false;

  // validateForm: FormGroup<{
  //   userName: FormControl<string>;
  //   password: FormControl<string>;
  //   remember: FormControl<boolean>;
  // }> = this.fb.group({
  //   userName: ['', [Validators.required]],
  //   password: ['', [Validators.required]],
  //   remember: [true]
  // });
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  constructor(private fb: NonNullableFormBuilder) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      remember: [false] // Initial value
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
