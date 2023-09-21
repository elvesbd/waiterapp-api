import * as sharp from 'sharp';
export class OptimizeImageFileService {
  public static async handler(
    file: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    const optimizedImageBuffer = await sharp(file.buffer)
      .resize({ width, height })
      .png({ compressionLevel: 9 })
      .toBuffer();

    return optimizedImageBuffer;
  }
}
