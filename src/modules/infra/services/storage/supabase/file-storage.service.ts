import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractPathFromBucket, OptimizeImageFileService } from '@infra/utils';
import { SupaBaseClientService } from '@infra/services/storage';
import {
  FileStorageGetUrlException,
  FileStorageRemoveException,
  FileStorageUploadException,
} from '@infra/services/storage/exceptions';
import { UploadInputFile } from '@application/domain/storage';

@Injectable()
export class SupaBaseFileStorageService {
  constructor(
    private readonly configService: ConfigService,
    private readonly supaBaseClientService: SupaBaseClientService,
  ) {}

  private readonly logger = new Logger(SupaBaseClientService.name);
  private readonly SUPABASE_BUCKET = this.configService.get('SUPABASE_BUCKET');

  async upload(input: UploadInputFile): Promise<string> {
    const { clientId, originalname, buffer, width, height } = input;
    const supabase = await this.getSupaBaseClient();
    const optimizedFileBuffer = await OptimizeImageFileService.handler(
      buffer,
      width,
      height,
    );

    const {
      data: { path },
      error,
    } = await supabase.storage
      .from(this.SUPABASE_BUCKET)
      .upload(`${clientId}/${originalname}`, optimizedFileBuffer, {
        upsert: true,
      });

    if (error) {
      this.logger.error(error.message);
      throw new FileStorageUploadException();
    }
    return path;
  }

  async getUrl(path: string): Promise<string> {
    const supabase = await this.getSupaBaseClient();

    const {
      data: { publicUrl },
    } = supabase.storage.from(this.SUPABASE_BUCKET).getPublicUrl(path);

    if (!publicUrl) {
      this.logger.error('Não foi possível obter a url da imagem!');
      throw new FileStorageGetUrlException();
    }
    return publicUrl;
  }

  async remove(path: string): Promise<any> {
    const supabase = await this.getSupaBaseClient();
    const bucketPath = ExtractPathFromBucket.handler(path);

    const { data, error } = await supabase.storage
      .from(this.SUPABASE_BUCKET)
      .remove([bucketPath]);

    if (error) {
      console.log('caiu aqui');
      this.logger.error(error.message);
      throw new FileStorageRemoveException();
    }
    return data;
  }

  private async getSupaBaseClient() {
    return this.supaBaseClientService.getClient();
  }
}
