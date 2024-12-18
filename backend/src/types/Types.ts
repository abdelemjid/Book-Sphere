export interface UserType {
  username: string;
  email: string;
  password: string;
}

export interface BookType {
  adminId: string;
  title: string;
  author: string;
  pages: number;
  isbn: string;
  publisher: string;
  publicationDate: Date;
  description: string;
  genres: string[];
  language: string;
  price: number;
  stockQuantity: number;
  bookCover: string;
}

export interface AdminType extends UserType {
  phoneNumber: string;
  joinDate: Date;
}

export interface OrderType {
  userId: string;
  bookId: string;
  quantity: number;
  orderDate: Date;
}
