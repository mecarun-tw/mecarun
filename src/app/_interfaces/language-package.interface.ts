export interface LanguagePackage<T> {
  uuid: string;
  languages: Map<string, T>;
}