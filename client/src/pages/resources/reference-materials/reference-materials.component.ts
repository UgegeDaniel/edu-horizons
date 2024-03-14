import { Component } from '@angular/core';

@Component({
  selector: 'app-reference-materials',
  templateUrl: './reference-materials.component.html',
  styleUrls: ['./reference-materials.component.css']
})
export class ReferenceMaterialsComponent {
  expandIconPosition: 'left' | 'right' = 'left'; // Default position

  referenceMaterials = [
    { topic: 'Topic 1', note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', subject: 'Maths', active: false, disabled: false },
    { topic: 'Topic 2', note: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', subject: 'Science', active: false, disabled: false },
    // Add more reference materials as needed
  ];
}
