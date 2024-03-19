import { User } from "src/modules/users/types";

export const DEMO_USERS: User[] = [
    {
      id: "1",
      email: "user1@example.com",
      verified_email: true,
      strategy: "google",
      password: "", // Not required for Google strategy
      name: "John Doe",
      given_name: "John",
      family_name: "Doe",
      picture: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "admin"
    },
    {
      id: "2",
      email: "user2@example.com",
      verified_email: true,
      strategy: "local",
      password: "password123",
      name: "Alice Smith",
      given_name: "Alice",
      family_name: "Smith",
      picture: "https://randomuser.me/api/portraits/women/2.jpg",
      role: "tutor"
    },
    {
      id: "3",
      email: "user3@example.com",
      verified_email: true,
      strategy: "google",
      password: "", // Not required for Google strategy
      name: "Bob Johnson",
      given_name: "Bob",
      family_name: "Johnson",
      picture: "https://randomuser.me/api/portraits/men/3.jpg",
      role: "student"
    },
    {
      id: "4",
      email: "user4@example.com",
      verified_email: true,
      strategy: "local",
      password: "password456",
      name: "Emily Wilson",
      given_name: "Emily",
      family_name: "Wilson",
      picture: "https://randomuser.me/api/portraits/women/4.jpg",
      role: "student"
    },
    {
      id: "5",
      email: "user5@example.com",
      verified_email: true,
      strategy: "google",
      password: "", // Not required for Google strategy
      name: "Michael Brown",
      given_name: "Michael",
      family_name: "Brown",
      picture: "https://randomuser.me/api/portraits/men/5.jpg",
      role: "student"
    }
  ];
  