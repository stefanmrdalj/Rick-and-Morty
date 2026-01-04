export interface AuthFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  photo?: string;
  id?: string;
}

export type UploadPhotoResponse = { photoUrl: string };
