import { address } from './address';
export interface users {
  /**
   * Full name
   * Username
   * Email
   * Password
   * address
   */
  id: number;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  address: address;
}
