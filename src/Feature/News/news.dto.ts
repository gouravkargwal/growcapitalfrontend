export type UpdateNewsTypeDto = {
  isSubscribed: boolean;
  newsTypeId: number;
};

export type NewsTypeDto = {
  newsTypeId: number;
  newsTypeName: string;
  isEligible: boolean;
  isSubscribed: boolean;
};
