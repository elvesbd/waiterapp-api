export class CapitalizeNameService {
  public static handler(name: string): string {
    const [firstLetter, ...restOfName] = name.trim().toLowerCase();
    return `${firstLetter.toUpperCase()}${restOfName.join('')}`;
  }
}
