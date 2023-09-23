import { UploadInputFile } from '@application/domain/storage';

export abstract class FileStorageService {
  public abstract upload(input: UploadInputFile): Promise<string>;
  public abstract getUrl(path: string): Promise<string>;
  public abstract remove(path: string): Promise<any>;
}
