/* export abstract class IFileUrlService {
  public abstract uploadAndGetUrl(
    originalname: string,
    buffer: Buffer,
  ): Promise<string>;
} */

import { UploadCategoryFile } from '@category/infra/storage';

export abstract class CategoryFileStorageService {
  public abstract upload(input: UploadCategoryFile): Promise<string>;
  public abstract getUrl(path: string): Promise<string>;
}
