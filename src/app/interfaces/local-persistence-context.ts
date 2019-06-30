export interface LocalPersistenceContext {
  write(key: string, value: string);
  read(key: string) : string;
}