export type User = {
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  age?: number;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: number;
  };
  id?: number;
};
