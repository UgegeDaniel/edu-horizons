import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import CountryList, { Country } from 'country-list-with-dial-code-and-flag';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/services/api.service';
import { Days, Profile, User } from 'src/utils/types';

const storedUserDetails = localStorage.getItem("authenticatedUser");
const userDetails: User | null = storedUserDetails ? JSON.parse(storedUserDetails) : null;
const DAYS_OF_THE_WEEK: Days[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private messageService: NzMessageService,
    private fb: NonNullableFormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  countries: Array<Country> = [];
  isVisible = false;
  isLoading = false;
  nzFooter = null;
  dropdownOpen = false;
  selectedCountry: Country | undefined =
    this.countries.find(
      country => country.name === userDetails?.profile.address.country
    );
  selectedFile: File | null = null;
  interests: string[] | undefined = [];
  meetingDays: Days[] = DAYS_OF_THE_WEEK
  selectedMeetingDays: string[] = [];
  user = {
    profilePicture: userDetails?.profile?.picture || '',
    name: `${userDetails?.given_name || ''} ${userDetails?.family_name || ''}`,
    role: `${userDetails?.role}` || '',
    assigned_level: userDetails?.profile?.assigned_level || '',
    verified_email: userDetails?.verified_email || false,
    location: `${userDetails?.profile?.address?.city || ''}, ${userDetails?.profile?.address?.country || ''}`,
    email: userDetails?.email || '',
    phoneNumber: userDetails?.profile?.phoneNumber || '',
    preferred_meeting_days: userDetails?.profile?.preferred_meeting_days || [],
    address: {
      houseNumber: userDetails?.profile?.address?.houseNumber || '',
      street: userDetails?.profile?.address?.street || '',
      city: userDetails?.profile?.address?.city || '',
      country: userDetails?.profile?.address?.country || ''
    },
    educationalBackground: {
      institution: userDetails?.profile?.edu_bg?.curr_institution || '',
      degree: userDetails?.profile?.edu_bg?.curr_program || '',
      certificationExams: userDetails?.profile?.edu_bg?.upcoming_cert || '',
      yearOfStudy: userDetails?.profile?.edu_bg?.year || ''
    },
    preferences: {
      language: 'English',
      notifications: {
        email: true,
        inApp: true,
      },
      privacySettings: {
        visibility: 'Public',
      },
    },
    additionalInformation: {
      interests: userDetails?.profile?.interests || '',
      bio: userDetails?.profile?.bio || '',
    },
    userHistory: {
      totalCoursesCompleted: 10,
      badgesEarned: 5,
      quizzesTaken: 20,
      averageQuizScore: 85.5,
      subjectScores: [
        {
          subject: "Maths",
          score: "80"
        },
        {
          subject: "Science",
          score: "70"
        },
      ]
    }
  };

  validateForm: FormGroup = this.fb.group({
    profilePicture: [this.user.profilePicture],
    role: [this.user.role],
    assigned_level: [this.user.assigned_level],
    location: [this.user.location],
    phoneNumber: [this.user.phoneNumber],
    address: this.fb.group({
      houseNumber: [this.user.address.houseNumber],
      street: [this.user.address.street],
      city: [this.user.address.city],
      country: [this.user.address.country]
    }),
    edu_bg: this.fb.group({
      institution: [this.user.educationalBackground.institution],
      degree: [this.user.educationalBackground.degree],
      certificationExams: [this.user.educationalBackground.certificationExams],
      yearOfStudy: [this.user.educationalBackground.yearOfStudy],
    }),
    interests: [this.user.additionalInformation.interests],
    preferred_meeting_days: [this.user.preferred_meeting_days],
    bio: [this.user.additionalInformation.bio],
  });

  async ngOnInit() {
    this.countries = CountryList.getAll();
    this.interests = userDetails?.profile.interests.map((interest) => interest.trim());
    this.selectedCountry = this.countries.find(country => country.name === userDetails?.profile.address.country);
    this.selectedMeetingDays = [...this.user.preferred_meeting_days];
    this.cdr.detectChanges();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileSizeMB = file.size / (1024 * 1024);
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (fileSizeMB > 2) {
        this.messageService.error('File size exceeds 2MB. Please choose a smaller file.');
        input.value = '';
        this.selectedFile = null;
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        this.messageService.error('File type is not supported. Please choose a valid image file.');
        input.value = '';
        this.selectedFile = null;
        return;
      }
      this.selectedFile = file;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(country: Country) {
    this.selectedCountry = country;
    this.dropdownOpen = false;
  }

  onInterestsInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.interests = input.value.split(',').map((interest) => interest.trim());
  }

  async signOut() {
    localStorage.removeItem('authenticatedUser');
    await this.apiService.getResource('user/auth/sign-out');
    window.location.href = 'http://localhost:4200';
  }

  showModal(): void {
    this.isVisible = true;
    this.cdr.detectChanges();
  }

  handleOk(): void {
    this.isVisible = false;
    this.cdr.detectChanges();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.cdr.detectChanges();
  }

  setRole(role: string) {
    this.validateForm.controls['role'].setValue(role);
    this.user.role = role;
  }

  getMeetingDayColor(meeting_day: Days): string {
    if (
      this.user.preferred_meeting_days.includes(meeting_day)
      && this.selectedMeetingDays.includes(meeting_day)
    ) {
      return 'blue';
    } else if (this.selectedMeetingDays.includes(meeting_day)) {
      return 'green';
    } else {
      return '';
    }
  }

  toggleMeetingDay(meeting_day: string): void {
    const index = this.selectedMeetingDays.indexOf(meeting_day);
    if (index === -1) {
      this.selectedMeetingDays.push(meeting_day);
    } else {
      this.selectedMeetingDays.splice(index, 1);
    }
  }

  async submitForm() {
    try {
      if (this.validateForm.valid) {
        const { assigned_level, ...formData } = this.validateForm.value;
        formData.interests = this.interests;
        formData.preferred_meeting_days = this.selectedMeetingDays;
        if (this.user.role === "UNASSIGNED") {
          try {
            await this.apiService.postResource("user/update-user-role", { role: formData.role });
          } catch (error) {
            console.log(error)
          }
        }
        if (this.selectedFile) {
          let imageData = new FormData();
          imageData.append('file', this.selectedFile);

          try {
            await this.apiService.updateResource("profile/updated-profile", imageData);
          } catch (error) {
            console.log(error);
          }
        }

        const userProfileData: Profile = {
          ...formData,
          phoneNumber: formData.phoneNumber,
          assigned_level: assigned_level,
          edu_bg: {
            curr_institution: formData.institution,
            upcoming_cert: formData.certificationExams,
            year: formData.yearOfStudy,
            curr_program: formData.degree,
          },
          address: {
            ...formData.address,
            country: this.selectedCountry?.name
          }
        };

        await this.apiService.updateResource("profile/updated-profile", userProfileData);
        this.messageService.success('Profile updated successfully!');
        await this.apiService.getAuthenticatedUser();
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    } catch (error) {
      this.messageService.error('Failed to update profile. Please try again.');
      console.error("Error updating profile:", error);
    }
    this.cdr.detectChanges();
  }

}
