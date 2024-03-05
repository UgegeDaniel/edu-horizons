const LINKS = [
  {
    route: '/',
    name: 'Home',
    icon: 'home',
    subLinks: null,
  },
  {
    route: '/classes',
    name: 'Classes',
    icon: 'experiment',
    subLinks: null,
  },
  {
    route: null,
    name: 'Tests and Assignment',
    icon: 'file-done',
    subLinks: [
      { name: 'Practice Tests', route: '/assignments/practice-tests' },
      {
        name: 'Assigned Assignments',
        route: '/assignments/assigned-assignments',
      },
      { name: 'Test Results', route: '/assignments/test-results' },
      {
        name: 'Assignment Submissions',
        route: '/assignments/assignment-submissions',
      },
    ],
  },
  {
    route: '/scheduling',
    name: 'Scheduling',
    icon: 'schedule',
    subLinks: null,
  },
  {
    route: null,
    name: 'Profile',
    icon: 'user',
    subLinks: [
      { name: 'My Profile', route: '/profile/user-profile' },
      { name: 'Payments', route: '/profile/payments' },
    ],
  },
  {
    route: null,
    name: 'Resources',
    icon: 'folder',
    subLinks: [
      { name: 'Resource Library', route: '/resources/resource-library' },
      { name: 'Study Guides', route: '/resources/study-guides' },
      { name: 'Reference Materials', route: '/resources/reference-materials' },
      { name: 'Recommended Books', route: '/resources/recommended-books' },
    ],
  },
  {
    route: null,
    name: 'Community',
    icon: 'team',
    subLinks: [
      { name: 'Discussion Forums', route: '/community/discussion-forums' },
      { name: 'Student Chat', route: '/community/student-chat' },
      { name: 'Tutor Chat', route: '/community/tutor-chat' },
      { name: 'Feedback & Reviews', route: '/community/feedback-reviews' },
    ],
  },
  {
    route: null,
    name: 'Help and Support',
    icon: 'question-circle',
    subLinks: [
      { name: 'FAQ', route: '/support/faq' },
      { name: 'Contact Us', route: '/support/contact-us' },
      { name: 'Report an Issue', route: '/support/report-issue' },
      { name: 'Terms of Service', route: '/support/terms-of-service' },
      { name: 'Privacy Policy', route: '/support/privacy-policy' },
    ],
  },
  {
    route: null,
    name: 'Admin',
    icon: 'solution',
    subLinks: [
      { name: 'Dashboard', route: '/admin/dashboard' },
      { name: 'User Management', route: '/admin/user-management' },
      { name: 'Content Management', route: '/admin/content-management' },
      { name: 'Analytics', route: '/admin/analytics' },
      { name: 'Settings', route: '/admin/settings' },
    ],
  },
];

export default LINKS;
