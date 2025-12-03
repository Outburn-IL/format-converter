import { ContentFormat } from './ContentFormat';
import { ContentType } from './ContentType';
import { EditorLanguage } from './EditorLanguage';

/**
 * Interface for format detection operations, providing methods to analyze and identify
 * various aspects of input data including content type, format, and appropriate editor language.
 */
export interface IFormatDetector {
    /**
     * Detects the content type of the given input string.
     * @param input Input string to analyze
     * @returns Detected ContentType or null if undetectable
     */
    detectContentType: (input: string) => ContentType | null;

    /**
     * Detects the content format of the given input string.
     * @param input Input string to analyze
     * @returns Detected ContentFormat
     */
    detectFormat: (input: string) => ContentFormat;

    /**
     * Detects the appropriate editor language for the given input string.
     * @param input Input string to analyze
     * @returns Detected EditorLanguage
     */
    detectEditorLanguage: (input: string) => EditorLanguage;
}