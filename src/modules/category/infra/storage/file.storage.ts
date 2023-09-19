import { FileDto } from '@category/dto';

export abstract class FileStorageService {
  public abstract upload(file: FileDto): Promise<string>;
  public abstract getUrl(path: string): Promise<string>;
}
