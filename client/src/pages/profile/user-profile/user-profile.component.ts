import { Component } from '@angular/core';
interface User {
  name: string;
  email: string;
  bio: string;
  interests: string[];
  role: string;
  location: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  // user: User = {
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut quam id eros tempus pharetra.',
  //   interests: ['Traveling', 'Reading', 'Coding'],
  //   role: 'Software Engineer',
  //   location: 'New York, USA',
  //   phone: '+234 8144882362',
  //   address: 'somewhere far from New York',
  // };

  user = {
    profilePicture: '../../../assets/profile-image.avif',
    name: 'John Doe',
    role: 'Student',
    level: "Pre-secondary",
    location: 'New York, USA',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    address: '123 Main Street, New York, USA',
    educationalBackground: {
      institution: 'Edu Horizons University',
      degree: 'Bachelor of Science in Computer Science',
      certificationExams: 'West African Senior Secondary Certification Examination',
      yearOfStudy: '3rd Year',
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
      interests: ['Programming', 'Web Development', 'Data Science'],
      bio: 'Passionate about leveraging technology to solve real-world problems.',
    },
    userHistory:{
      totalCoursesCompleted : 10,
      badgesEarned : 5,
      quizzesTaken :20,
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
}
