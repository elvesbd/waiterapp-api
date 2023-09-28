export type UploadInputFile = {
  clientId: string;
  originalname: string;
  imageFolder: string;
  buffer: Buffer;
  width: number;
  height: number;
};
