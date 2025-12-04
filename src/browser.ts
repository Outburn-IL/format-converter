// Browser-compatible entry point that excludes FormatConverter
// FormatConverter depends on hl7js and hl7-dictionary packages that are not browser-compatible

export { TypeConverter } from './TypeConverter';
export { FormatDetector } from './FormatDetector';

// Export all types and enums that are browser-compatible
export type { ITypeConverter, IFormatDetector } from './types';
export { ContentType, ContentFormat, EditorLanguage } from './types';