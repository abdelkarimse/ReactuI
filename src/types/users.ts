export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}
