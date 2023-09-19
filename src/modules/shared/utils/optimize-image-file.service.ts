import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class OptimizeImageFileService {
  async handler(file: Buffer): Promise<Buffer> {
    const optimizedImageBuffer = await sharp(file.buffer)
      .resize({ width: 20, height: 20 })
      .png({ compressionLevel: 9 })
      .toBuffer();

    return optimizedImageBuffer;
  }
}
