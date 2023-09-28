export class ExtractPathFromBucket {
  static handler(url: string, bucket = 'waiter-app'): string | null {
    const regex = new RegExp(`\\/${bucket}\\/(.+)$`, 'i');
    const match = url.match(regex);

    if (match ?? match[1]) {
      return match[1];
    }

    return null;
  }
}
