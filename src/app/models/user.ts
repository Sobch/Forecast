
export interface User {
  _id?: {$oid: string};
  name: string;
  surname: string;
  city: string;
  country: string;
  isMale: boolean;
}
