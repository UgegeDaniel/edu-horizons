import { Component } from '@angular/core';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent {
  testResults: any[] = [
    {
      testType: 'Assigned',
      status: 'Submitted',
      submissionDate: new Date('2024-03-15'),
      subject: 'Maths',
      score: 85,
    },
    {
      testType: 'Practice',
      status: 'Submitted',
      submissionDate: new Date('2024-03-12'),
      subject: 'Science',
      score: 70,
    },
    // Add more test results as needed
  ];

  constructor() {}

  seeCorrections(result: any): void {
    // Implement the logic to view corrections
    console.log('Viewing corrections for:', result);
  }
}
