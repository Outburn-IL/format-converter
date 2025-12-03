import { ContentFormat } from './ContentFormat';
import { ContentType } from './ContentType';
import { EditorLanguage } from './EditorLanguage';

/**
 * Interface for type conversion operations, providing methods to convert between
 * different content type representations (ContentType, ContentFormat, EditorLanguage, and string).
 */
export interface ITypeConverter {
    /**
     * Converts a ContentType to its corresponding ContentFormat.
     * @param contentType The ContentType to convert
     * @returns The corresponding ContentFormat
     */
    contentTypeToContentFormat: (contentType: ContentType) => ContentFormat;

    /**
     * Converts a ContentType to its corresponding EditorLanguage.
     * @param contentType The ContentType to convert
     * @returns The corresponding EditorLanguage
     */
    contentTypeToEditorLanguage: (contentType: ContentType) => EditorLanguage;

    /**
     * Converts a ContentFormat to its corresponding ContentType.
     * @param format The ContentFormat to convert
     * @returns The corresponding ContentType, or null if conversion is not possible
     */
    contentFormatToContentType: (format: ContentFormat) => ContentType | null;

    /**
     * Converts a ContentFormat to its corresponding EditorLanguage.
     * @param format The ContentFormat to convert
     * @returns The corresponding EditorLanguage
     */
    contentFormatToEditorLanguage: (format: ContentFormat) => EditorLanguage;

    /**
     * Converts a string representation to its corresponding ContentFormat.
     * @param format The string representation of a format
     * @returns The corresponding ContentFormat, or null if conversion is not possible
     */
    stringToContentFormat: (format: string) => ContentFormat | null;

    /**
     * Converts a string representation to its corresponding ContentType.
     * @param contentType The string representation of a content type
     * @returns The corresponding ContentType, or null if conversion is not possible
     */
    stringToContentType: (contentType: string) => ContentType | null;

    /**
     * Converts a string representation to its corresponding EditorLanguage.
     * @param editorLanguage The string representation of an editor language
     * @returns The corresponding EditorLanguage, or null if conversion is not possible
     */
    stringToEditorLanguage: (editorLanguage: string) => EditorLanguage | null;
}