export interface userFromDB {
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | number | null;
  photoURL: string | null;
  providerData: any;
  rooms: string[];
  uid: string;
}
