import { Component } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent {
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private apiService: ApiService,
    private messageService: NzMessageService
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      remember: [false]
    });
  }
  isConfirmLoading = false;
  isLoading = false;
  form: FormGroup | undefined;
  switchValue = false;
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });
  async submitForm() {
    if (this.validateForm.valid) {
      const { email, password } = this.validateForm.value;
      const userCredentials = { email, password };
      this.isLoading = true;
      try {
        const res = await this.apiService.postResource("user/auth/local/login", userCredentials);
        if (res.data?.statusCode && res.data?.statusCode === 401) {
          this.messageService.error(res.data.message);
          this.isLoading = false;
          return;
        }
        this.messageService.success('Sign in successful! Reloading page...');
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Adding a delay to ensure the message is shown
      } catch (error) {
        this.messageService.error('An error occurred. Please try again.');
        this.isLoading = false;
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
