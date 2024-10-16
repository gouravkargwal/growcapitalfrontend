export type SignupData = {
  email: string;
  firstName: string;
  lastName: string;
  languageId: number;
  password: string;
  referredByCode?: string;
};

export type GoogleAuthData = {
  token: string;
};
