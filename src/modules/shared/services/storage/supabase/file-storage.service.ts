import { FileDto } from '@category/dto';
import { FileStorageService } from '@category/infra';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupaBaseClientService } from '@shared/services/storage';
import {
  GetUrlStorageException,
  UploadFileStorageException,
} from '@shared/services/storage/exceptions';

@Injectable()
export class SupaBaseFileStorageService implements FileStorageService {
  constructor(
    private readonly supaBaseClientService: SupaBaseClientService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(SupaBaseClientService.name);
  private readonly SUPABASE_BUCKET = this.configService.get('SUPABASE_BUCKET');

  async upload(file: FileDto): Promise<string> {
    const supabase = await this.getSupaBaseClient();

    try {
      const {
        data: { path },
      } = await supabase.storage
        .from(this.SUPABASE_BUCKET)
        .upload(file.originalname, file.buffer, {
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
