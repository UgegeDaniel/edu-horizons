import { Component } from '@angular/core';
import { addDays, formatDistance } from 'date-fns';
import { Observable } from 'rxjs';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(
    private readonly apiService: ApiService
  ) {
    this.apiService.getResource<{message: string}>().subscribe((value) => {
      this.testString = value.message
    })
    console.log(this.testString);
  }
  testimonials = [
    { content: 'This platform helped me improve my grades significantly!', author: 'John Doe' },
    { content: 'I love the interactive lessons and personalized learning experience.', author: 'Jane Smith' }
  ];

  data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 2))
    }
  ];
  testString!: string;
}
