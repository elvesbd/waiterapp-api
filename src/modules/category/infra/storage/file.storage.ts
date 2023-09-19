export abstract class FileStorageService {
  public abstract upload(name: string, buffer: Buffer): Promise<string>;
  public abstract getUrl(path: string): Promise<string>;
}
