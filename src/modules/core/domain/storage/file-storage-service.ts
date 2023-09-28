import { UploadInputFile } from '@core/domain/storage';

export abstract class FileStorageService {
  public abstract getUrl(path: string): Promise<string>;
  public abstract upload(input: UploadInputFile): Promise<string>;
  public abstract remove(path: string): Promise<any>;
}
