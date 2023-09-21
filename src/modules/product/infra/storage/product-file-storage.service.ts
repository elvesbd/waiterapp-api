/* export abstract class IFileUrlService {
  public abstract uploadAndGetUrl(
    originalname: string,
    buffer: Buffer,
  ): Promise<string>;
} */

import { UploadProductFile } from '@product/infra/storage';

export abstract class ProductFileStorageService {
  public abstract upload(input: UploadProductFile): Promise<string>;
  public abstract getUrl(path: string): Promise<string>;
}
