import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WithoutBookMessage } from './WithoutBookMessage';
import { booksRelationshipType, getMessagesType } from '@/models/BulletinBoard';
import { ProfileFriendType } from '@/models/User';
import "@testing-library/jest-dom";

// Mock the next-auth/react module for authentication testing
jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: { accessLevel: 3 } }), // Mock authentication data for an administrator
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}))

const mockBooks: booksRelationshipType[] = [
  {
    messageid: 1,
    bookid: "1",
    bulletinboardbookid: 1,
    book: {
      bookid: "ARandomString",
      bookPicture: "/images/book-placeholder.png",
      title: "A Random string",
      author: "A Random string",
      description: "A Random string",
      pageCount: 1234,
      averageRating: 4,
    }
  },
  {
    messageid: 2,
    bookid: "2",
    bulletinboardbookid: 2,
    book: {
      bookid: "ARandomString2",
      bookPicture: "/images/book-placeholder.png",
      title: "A Random string 2",
      author: "A Random string 2",
      description: "A Random string 2",
      pageCount: 1234,
      averageRating: 4,
    }
  }
]

const mockUser:ProfileFriendType = {
  accessLevel: 1,
  firstName: "John",
  lastName: "Doe",
  lastOnline: new Date(),
  joinDate: new Date(),
  profilePicture: "/images/profile-picture-placeholder.png",
  username: "JohnDoe"
}

const mockMessage: getMessagesType = {
  messageid: 1,
  body: "This is my first message.",
  dateCreated: new Date(),
  username: "JulianDoe",
  user: mockUser,
  books: mockBooks,
  reported: false
}

describe('WithoutBookMessage', () => {
  it('renders message details and buttons correctly', () => {
    render(<WithoutBookMessage message={mockMessage} />);
    
    expect(screen.getByTestId('without-book-message')).toBeInTheDocument();
    expect(screen.getByText('This is my first message.')).toBeInTheDocument();
  });
});
