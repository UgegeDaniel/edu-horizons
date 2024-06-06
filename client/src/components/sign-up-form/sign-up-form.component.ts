import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  passwordVisible = false;
  confirmPasswordVisible = false;
  password?: string;
  isLoading: boolean = false;
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    confirm_password: FormControl<string>;
    given_name: FormControl<string>;
    family_name: FormControl<string>;
    agree: FormControl<boolean>;
  }>;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required, this.confirmationValidator]],
      given_name: ['', [Validators.required]],
      family_name: ['', [Validators.required]],
      agree: [false]
    }) as FormGroup<{
      email: FormControl<string>;
      password: FormControl<string>;
      confirm_password: FormControl<string>;
      given_name: FormControl<string>;
      family_name: FormControl<string>;
      agree: FormControl<boolean>;
    }>;
  }

  async submitForm() {
    if (this.validateForm.valid) {
      const { email, given_name, family_name, password } = this.validateForm.value;
      const userCredentials = { email, given_name, family_name, password };
      this.isLoading = true;
      try {
        const res = await this.apiService.postResource("user/auth/local/register", userCredentials);
        if (res.data?.statusCode && res.data?.statusCode === 401) {
          this.messageService.error(res.data.message);
          this.isLoading = false;
          return;
        }
        this.messageService.success('Registration successful! Reloading page...');
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

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.confirm_password.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
