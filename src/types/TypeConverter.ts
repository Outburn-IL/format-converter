import { ContentFormat } from './ContentFormat';
import { ContentType } from './ContentType';
import { EditorLanguage } from './EditorLanguage';

export interface ITypeConverter {
    contentTypeToContentFormat: (contentType: ContentType) => ContentFormat;
    contentTypeToEditorLanguage: (contentType: ContentType) => EditorLanguage;
    contentFormatToContentType: (format: ContentFormat) => ContentType | null;
    contentFormatToEditorLanguage: (format: ContentFormat) => EditorLanguage;
    stringToContentFormat: (format: string) => ContentFormat | null;
    stringToContentType: (contentType: string) => ContentType | null;
    stringToEditorLanguage: (editorLanguage: string) => EditorLanguage | null;
}