
export type ImageMimeType = 'image/jpeg' | 'image/png' | 'image/jpg';

export type UserFile = {
  fieldname: 'file';
  originalname: string;
  encoding: string;
  mimetype: ImageMimeType;
  destination: 'uploads/profile-images';
  filename: string;
  path: string;
  size: number;
};