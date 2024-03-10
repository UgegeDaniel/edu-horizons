import { Component } from '@angular/core';

@Component({
  selector: 'app-assigned-assignments',
  templateUrl: './assigned-assignments.component.html',
  styleUrls: ['./assigned-assignments.component.css']
})
export class AssignedAssignmentsComponent {
  assignments: any[] = [
    {
      assignmentDate: new Date('2024-03-10'),
      dueDate: new Date('2024-03-15'),
      subject: 'Science',
      numQuestions: 20,
      allottedTime: '2 hours',
      topics: ['Biology', 'Chemistry'],
      state: 'upcoming'
    },
    {
      assignmentDate: new Date('2024-03-08'),
      dueDate: new Date('2024-03-12'),
      subject: 'Maths',
      numQuestions: 15,
      allottedTime: '1.5 hours',
      topics: ['Geometry', 'Algebra'],
      state: 'ongoing'
    },
    {
      assignmentDate: new Date('2024-03-05'),
      dueDate: new Date('2024-03-10'),
      subject: 'English',
      numQuestions: 25,
      allottedTime: '2.5 hours',
      topics: ['Grammar', 'Literature', 'Vocabulary'],
      state: 'past'
    }
    // Add more assignment objects as needed
  ];

  constructor() {}

  startAssignment(assignment: any): void {
    // Implement the logic to start the assignment
    console.log('Starting assignment:', assignment);
  }
}
