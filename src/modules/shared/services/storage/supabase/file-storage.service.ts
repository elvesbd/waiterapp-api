import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileStorageService } from '@category/infra';
import { OptimizeImageFileService } from '@shared/utils';
import { SupaBaseClientService } from '@shared/services/storage';
import { FileDto } from '@category/dto';
import {
  GetUrlStorageException,
  UploadFileStorageException,
} from '@shared/services/storage/exceptions';

@Injectable()
export class SupaBaseFileStorageService implements FileStorageService {
  constructor(
    private readonly configService: ConfigService,
    private readonly supaBaseClientService: SupaBaseClientService,
    private readonly optimizeImageFileService: OptimizeImageFileService,
  ) {}

  private readonly logger = new Logger(SupaBaseClientService.name);
  private readonly SUPABASE_BUCKET = this.configService.get('SUPABASE_BUCKET');

  async upload(file: FileDto): Promise<string> {
    const supabase = await this.getSupaBaseClient();
    const optimizedFileBuffer = await this.optimizeImageFileService.handler(
      file.buffer,
    );

    try {
      const {
        data: { path },
      } = await supabase.storage
        .from(this.SUPABASE_BUCKET)
        .upload(file.originalname, optimizedFileBuffer, {
          upsert: true,
        });

      return path;
    } catch (error) {
      this.logger.error(error.message);
      throw new UploadFileStorageException(error.message);
    }
  }

  async getUrl(path: string): Promise<string> {
    const supabase = await this.getSupaBaseClient();

    try {
      const {
        data: { publicUrl },
      } = supabase.storage.from(this.SUPABASE_BUCKET).getPublicUrl(path);

      return publicUrl;
    } catch (error) {
      this.logger.error(error.message);
      throw new GetUrlStorageException(error.message);
    }
  }

  private async getSupaBaseClient() {
    return this.supaBaseClientService.getClient();
  }
}
