import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OptimizeImageFileService } from '@infra/utils';
import { SupaBaseClientService } from '@infra/services/storage';
import { FileStorageException } from '@infra/services/storage/exceptions';

@Injectable()
export class SupaBaseFileStorageService {
  constructor(
    private readonly configService: ConfigService,
    private readonly supaBaseClientService: SupaBaseClientService,
  ) {}

  private readonly logger = new Logger(SupaBaseClientService.name);
  private readonly SUPABASE_BUCKET = this.configService.get('SUPABASE_BUCKET');

  async upload(input: any): Promise<string> {
    const { originalname, buffer, width, height } = input;
    const supabase = await this.getSupaBaseClient();
    const optimizedFileBuffer = await OptimizeImageFileService.handler(
      buffer,
      width,
      height,
    );

    try {
      const {
        data: { path },
      } = await supabase.storage
        .from(this.SUPABASE_BUCKET)
        .upload(originalname, optimizedFileBuffer, {
          upsert: true,
        });

      return path;
    } catch (error) {
      this.logger.error(error.message);
      throw new FileStorageException();
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
      throw new FileStorageException();
    }
  }

  private async getSupaBaseClient() {
    return this.supaBaseClientService.getClient();
  }
}
