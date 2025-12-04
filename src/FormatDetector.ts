import { TypeConverter } from './TypeConverter';
import { ContentFormat, ContentType, EditorLanguage, IFormatDetector, ITypeConverter } from './types';

const isPossiblyHL7 = (input: string): boolean =>
  typeof input === 'string' && input.trimStart().startsWith('MSH|');

const isValidJson = (input: string): boolean => {
  try {
    JSON.parse(input);
    return true;
  } catch (e) {
    return false;
  }
};

const isJsonLikely = (input: string): boolean => {
  // Remove string values for JSON-specific heuristics (optimized regex)
  const inputWithoutStrings = input; //.replace(/"[^"]*"/g, '""');
  /*
  // Remove string values for JSON-specific heuristics (safe regex to prevent ReDoS)
  const inputWithoutStrings = input.replace(/"(?:[^"\\]|\\.)*"/g, '""');
  */

  const jsonStats = {
    curlyBraces: (inputWithoutStrings.match(/[{}]/g) || []).length,
    colons: (inputWithoutStrings.match(/:/g) || []).length,
    embeddedXml: /<[^>]+>/.test(input),
    keyValueStructure: /{[^}]*:[^}]*}/.test(input), // Key-value pattern
  };

  // Check for incomplete JSON patterns (like {"key": incomplete)
  const hasIncompleteJsonPattern = /{[^}]*"[^"]*"\s*:\s*/.test(input);

  const isJsonLikely =
    (jsonStats.curlyBraces >= 2 || (jsonStats.curlyBraces >= 1 && hasIncompleteJsonPattern)) &&
    jsonStats.colons >= 1 &&
    (jsonStats.keyValueStructure || /{.*:.*}/.test(input) || hasIncompleteJsonPattern); // Strong JSON indicators

  return isJsonLikely;
};

const isXmlLikely = (input: string): boolean => {
  const xmlStats = {
    openingTags: (input.match(/<[^/!?][^>]*?>/g) || []).length,
    closingTags: (input.match(/<\/[^>]+>/g) || []).length,
    selfClosingTags: (input.match(/<[^>]+\/>/g) || []).length,
    xmlNamespaces: (input.match(/xmlns(:[a-zA-Z0-9]+)?=/g) || []).length,
  };

  const hasXmlHeader = /^<\?xml.*?\?>/.test(input);
  const isXmlLikely =
    (hasXmlHeader || xmlStats.xmlNamespaces >= 1 || xmlStats.openingTags >= 1) &&
    (xmlStats.openingTags === xmlStats.closingTags || xmlStats.selfClosingTags >= 1);

  return isXmlLikely;
};

const isCsvLikely = (input: string): boolean => {
  const lines = input.split(/\r?\n/);
  const headerRow = lines[0];
  const csvStats = {
    rowCount: lines.length,
    commaCounts: lines.map(line => (line.match(/,/g) || []).length),
  };

  const headerStats = {
    curlyBraces: (headerRow.match(/[{}]/g) || []).length,
    squareBrackets: (headerRow.match(/[\[\]]/g) || []).length,
    angularBrackets: (headerRow.match(/[<>]/g) || []).length,
    colons: (headerRow.match(/:/g) || []).length,
  };

  const isCsvLikely =
    (csvStats.rowCount > 1 || csvStats.commaCounts.some(count => count > 0)) &&
    headerStats.curlyBraces === 0 &&
    headerStats.squareBrackets === 0 &&
    headerStats.angularBrackets === 0 &&
    headerStats.colons === 0;

  return isCsvLikely;
};

export class FormatDetector implements IFormatDetector {
  private static readonly typeConverter: ITypeConverter = new TypeConverter();

  detectContentType(input: string): ContentType | null {
    const format = this.detectFormat(input);
    return FormatDetector.typeConverter.contentFormatToContentType(format);
  }

  detectFormat(input: string): ContentFormat {
    try {
      const trimmedInput = input?.trim();
      if (!trimmedInput) return ContentFormat.UNKNOWN;
      if (isValidJson(input)) return ContentFormat.JSON;
      if (isPossiblyHL7(input)) return ContentFormat.HL7;
      if (isJsonLikely(input)) return ContentFormat.JSON;
      if (isXmlLikely(input)) return ContentFormat.XML;
      if (isCsvLikely(input)) return ContentFormat.CSV;
      return ContentFormat.UNKNOWN;
    } catch (e) {
      return ContentFormat.UNKNOWN;
    }
  }

  detectEditorLanguage(input: string): EditorLanguage {
    const format = this.detectFormat(input);
    switch (format) {
      case ContentFormat.JSON:
        return EditorLanguage.JSON;
      case ContentFormat.XML:
        return EditorLanguage.XML;
      default:
        return EditorLanguage.PLAINTEXT;
    }
  }
}