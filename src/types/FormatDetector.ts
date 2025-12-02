import { ContentFormat } from './ContentFormat';
import { ContentType } from './ContentType';
import { EditorLanguage } from './EditorLanguage';

export interface IFormatDetector {
    detectContentType: (input: string) => ContentType | null;
    detectFormat: (input: string) => ContentFormat;
    detectEditorLanguage: (input: string) => EditorLanguage;
}