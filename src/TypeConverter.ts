import { ContentFormat, ContentType, EditorLanguage, ITypeConverter } from './types';

export class TypeConverter implements ITypeConverter {
  private static contentTypeToContentFormatMap: { [key in ContentType]: ContentFormat } = {
    [ContentType.JSON]: ContentFormat.JSON,
    [ContentType.CSV]: ContentFormat.CSV,
    [ContentType.XML]: ContentFormat.XML,
    [ContentType.HL7V2]: ContentFormat.HL7
  };

  private static contentFormatToContentTypeMap: { [key in ContentFormat]: ContentType | null } = {
    [ContentFormat.JSON]: ContentType.JSON,
    [ContentFormat.CSV]: ContentType.CSV,
    [ContentFormat.XML]: ContentType.XML,
    [ContentFormat.HL7]: ContentType.HL7V2,
    [ContentFormat.UNKNOWN]: null
  };

  private static contentFormatToEditorLanguageMap: { [key in ContentFormat]: EditorLanguage } = {
    [ContentFormat.JSON]: EditorLanguage.JSON,
    [ContentFormat.XML]: EditorLanguage.XML,
    [ContentFormat.CSV]: EditorLanguage.PLAINTEXT,
    [ContentFormat.HL7]: EditorLanguage.PLAINTEXT,
    [ContentFormat.UNKNOWN]: EditorLanguage.PLAINTEXT
  };

  private static contentFormats: ContentFormat[] = [
    ContentFormat.JSON,
    ContentFormat.CSV,
    ContentFormat.XML,
    ContentFormat.HL7,
    ContentFormat.UNKNOWN
  ];

  private static contentTypes: ContentType[] = [
    ContentType.JSON,
    ContentType.CSV,
    ContentType.XML,
    ContentType.HL7V2
  ];

  private static editorLanguages: EditorLanguage[] = [
    EditorLanguage.JSON,
    EditorLanguage.XML,
    EditorLanguage.PLAINTEXT
  ];

  contentTypeToContentFormat = (contentType: ContentType): ContentFormat => {
    return TypeConverter.contentTypeToContentFormatMap[contentType];
  };

  contentTypeToEditorLanguage = (contentType: ContentType): EditorLanguage => {
    const format = this.contentTypeToContentFormat(contentType);
    return this.contentFormatToEditorLanguage(format);
  };

  contentFormatToContentType = (format: ContentFormat): ContentType | null => {
    return TypeConverter.contentFormatToContentTypeMap[format] || null;
  };

  contentFormatToEditorLanguage = (format: ContentFormat): EditorLanguage => {
    return TypeConverter.contentFormatToEditorLanguageMap[format];
  };

  stringToContentFormat = (format: string): ContentFormat | null => {
    const normalizedFormat = format.toLowerCase();
    return TypeConverter.contentFormats.find(value => value === normalizedFormat) || null;
  };

  stringToContentType = (contentType: string): ContentType | null => {
    const normalizedContentType = contentType.toLowerCase();
    return TypeConverter.contentTypes.find(value => normalizedContentType.startsWith(value)) || null;
  };

  stringToEditorLanguage = (editorLanguage: string): EditorLanguage | null => {
    const normalizedLanguage = editorLanguage.toLowerCase();
    return TypeConverter.editorLanguages.find(value => value === normalizedLanguage) || null;
  };

}