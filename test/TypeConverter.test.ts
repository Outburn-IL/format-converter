import { describe, it, expect } from 'vitest';
import { TypeConverter } from '../src';
import { ContentFormat, ContentType, EditorLanguage } from '../src/types';

describe('TypeConverter', () => {
  const typeConverter = new TypeConverter();
    
  describe('contentTypeToContentFormat', () => {
    it('should convert JSON content type to JSON format', () => {
      const result = typeConverter.contentTypeToContentFormat(ContentType.JSON);
      expect(result).toBe(ContentFormat.JSON);
    });

    it('should convert CSV content type to CSV format', () => {
      const result = typeConverter.contentTypeToContentFormat(ContentType.CSV);
      expect(result).toBe(ContentFormat.CSV);
    });

    it('should convert XML content type to XML format', () => {
      const result = typeConverter.contentTypeToContentFormat(ContentType.XML);
      expect(result).toBe(ContentFormat.XML);
    });

    it('should convert HL7V2 content type to HL7 format', () => {
      const result = typeConverter.contentTypeToContentFormat(ContentType.HL7V2);
      expect(result).toBe(ContentFormat.HL7);
    });
  });

  describe('contentTypeToEditorLanguage', () => {
    it('should convert JSON content type to JSON editor language', () => {
      const result = typeConverter.contentTypeToEditorLanguage(ContentType.JSON);
      expect(result).toBe(EditorLanguage.JSON);
    });

    it('should convert CSV content type to PLAINTEXT editor language', () => {
      const result = typeConverter.contentTypeToEditorLanguage(ContentType.CSV);
      expect(result).toBe(EditorLanguage.PLAINTEXT);
    });

    it('should convert XML content type to XML editor language', () => {
      const result = typeConverter.contentTypeToEditorLanguage(ContentType.XML);
      expect(result).toBe(EditorLanguage.XML);
    });

    it('should convert HL7V2 content type to PLAINTEXT editor language', () => {
      const result = typeConverter.contentTypeToEditorLanguage(ContentType.HL7V2);
      expect(result).toBe(EditorLanguage.PLAINTEXT);
    });
  });

  describe('contentFormatToContentType', () => {
    it('should convert JSON format to JSON content type', () => {
      const result = typeConverter.contentFormatToContentType(ContentFormat.JSON);
      expect(result).toBe(ContentType.JSON);
    });

    it('should convert CSV format to CSV content type', () => {
      const result = typeConverter.contentFormatToContentType(ContentFormat.CSV);
      expect(result).toBe(ContentType.CSV);
    });

    it('should convert XML format to XML content type', () => {
      const result = typeConverter.contentFormatToContentType(ContentFormat.XML);
      expect(result).toBe(ContentType.XML);
    });

    it('should convert HL7 format to HL7V2 content type', () => {
      const result = typeConverter.contentFormatToContentType(ContentFormat.HL7);
      expect(result).toBe(ContentType.HL7V2);
    });

    it('should return null for UNKNOWN format', () => {
      const result = typeConverter.contentFormatToContentType(ContentFormat.UNKNOWN);
      expect(result).toBeNull();
    });
  });

  describe('contentFormatToEditorLanguage', () => {
    it('should convert JSON format to JSON editor language', () => {
      const result = typeConverter.contentFormatToEditorLanguage(ContentFormat.JSON);
      expect(result).toBe(EditorLanguage.JSON);
    });

    it('should convert XML format to XML editor language', () => {
      const result = typeConverter.contentFormatToEditorLanguage(ContentFormat.XML);
      expect(result).toBe(EditorLanguage.XML);
    });

    it('should convert CSV format to PLAINTEXT editor language', () => {
      const result = typeConverter.contentFormatToEditorLanguage(ContentFormat.CSV);
      expect(result).toBe(EditorLanguage.PLAINTEXT);
    });

    it('should convert HL7 format to PLAINTEXT editor language', () => {
      const result = typeConverter.contentFormatToEditorLanguage(ContentFormat.HL7);
      expect(result).toBe(EditorLanguage.PLAINTEXT);
    });

    it('should convert UNKNOWN format to PLAINTEXT editor language', () => {
      const result = typeConverter.contentFormatToEditorLanguage(ContentFormat.UNKNOWN);
      expect(result).toBe(EditorLanguage.PLAINTEXT);
    });
  });

  describe('Integration tests', () => {
    it('should maintain consistency between contentTypeToContentFormat and contentFormatToContentType for JSON', () => {
      const format = typeConverter.contentTypeToContentFormat(ContentType.JSON);
      const contentType = typeConverter.contentFormatToContentType(format);
      expect(contentType).toBe(ContentType.JSON);
    });

    it('should maintain consistency between contentTypeToContentFormat and contentFormatToContentType for CSV', () => {
      const format = typeConverter.contentTypeToContentFormat(ContentType.CSV);
      const contentType = typeConverter.contentFormatToContentType(format);
      expect(contentType).toBe(ContentType.CSV);
    });

    it('should maintain consistency between contentTypeToContentFormat and contentFormatToContentType for XML', () => {
      const format = typeConverter.contentTypeToContentFormat(ContentType.XML);
      const contentType = typeConverter.contentFormatToContentType(format);
      expect(contentType).toBe(ContentType.XML);
    });

    it('should maintain consistency between contentTypeToContentFormat and contentFormatToContentType for HL7V2', () => {
      const format = typeConverter.contentTypeToContentFormat(ContentType.HL7V2);
      const contentType = typeConverter.contentFormatToContentType(format);
      expect(contentType).toBe(ContentType.HL7V2);
    });

    it('should provide consistent editor language mapping via different paths for JSON', () => {
      const editorLanguageViaContentType = typeConverter.contentTypeToEditorLanguage(ContentType.JSON);
      const format = typeConverter.contentTypeToContentFormat(ContentType.JSON);
      const editorLanguageViaFormat = typeConverter.contentFormatToEditorLanguage(format);
      expect(editorLanguageViaContentType).toBe(editorLanguageViaFormat);
      expect(editorLanguageViaContentType).toBe(EditorLanguage.JSON);
    });

    it('should provide consistent editor language mapping via different paths for CSV', () => {
      const editorLanguageViaContentType = typeConverter.contentTypeToEditorLanguage(ContentType.CSV);
      const format = typeConverter.contentTypeToContentFormat(ContentType.CSV);
      const editorLanguageViaFormat = typeConverter.contentFormatToEditorLanguage(format);
      expect(editorLanguageViaContentType).toBe(editorLanguageViaFormat);
      expect(editorLanguageViaContentType).toBe(EditorLanguage.PLAINTEXT);
    });

    it('should provide consistent editor language mapping via different paths for XML', () => {
      const editorLanguageViaContentType = typeConverter.contentTypeToEditorLanguage(ContentType.XML);
      const format = typeConverter.contentTypeToContentFormat(ContentType.XML);
      const editorLanguageViaFormat = typeConverter.contentFormatToEditorLanguage(format);
      expect(editorLanguageViaContentType).toBe(editorLanguageViaFormat);
      expect(editorLanguageViaContentType).toBe(EditorLanguage.XML);
    });

    it('should provide consistent editor language mapping via different paths for HL7V2', () => {
      const editorLanguageViaContentType = typeConverter.contentTypeToEditorLanguage(ContentType.HL7V2);
      const format = typeConverter.contentTypeToContentFormat(ContentType.HL7V2);
      const editorLanguageViaFormat = typeConverter.contentFormatToEditorLanguage(format);
      expect(editorLanguageViaContentType).toBe(editorLanguageViaFormat);
      expect(editorLanguageViaContentType).toBe(EditorLanguage.PLAINTEXT);
    });
  });

  describe('Error handling and edge cases', () => {
    it('should handle all ContentType enum values', () => {
      const contentTypes = [
        ContentType.JSON,
        ContentType.CSV,
        ContentType.XML,
        ContentType.HL7V2
      ];
      contentTypes.forEach(contentType => {
        expect(() => typeConverter.contentTypeToContentFormat(contentType)).not.toThrow();
        expect(() => typeConverter.contentTypeToEditorLanguage(contentType)).not.toThrow();
      });
    });

    it('should handle all ContentFormat enum values', () => {
      const contentFormats = [
        ContentFormat.JSON,
        ContentFormat.CSV,
        ContentFormat.XML,
        ContentFormat.HL7,
        ContentFormat.UNKNOWN
      ];
      contentFormats.forEach(format => {
        expect(() => typeConverter.contentFormatToContentType(format)).not.toThrow();
        expect(() => typeConverter.contentFormatToEditorLanguage(format)).not.toThrow();
      });
    });

    it('should return valid EditorLanguage for all ContentFormat values', () => {
      const contentFormats = [
        ContentFormat.JSON,
        ContentFormat.CSV,
        ContentFormat.XML,
        ContentFormat.HL7,
        ContentFormat.UNKNOWN
      ];
      const editorLanguages = [
        EditorLanguage.JSON,
        EditorLanguage.XML,
        EditorLanguage.PLAINTEXT
      ];
            
      contentFormats.forEach(format => {
        const result = typeConverter.contentFormatToEditorLanguage(format);
        expect(editorLanguages).toContain(result);
      });
    });

    it('should return valid ContentFormat for all ContentType values', () => {
      const contentTypes = [
        ContentType.JSON,
        ContentType.CSV,
        ContentType.XML,
        ContentType.HL7V2
      ];
      const contentFormats = [
        ContentFormat.JSON,
        ContentFormat.CSV,
        ContentFormat.XML,
        ContentFormat.HL7,
        ContentFormat.UNKNOWN
      ];
            
      contentTypes.forEach(contentType => {
        const result = typeConverter.contentTypeToContentFormat(contentType);
        expect(contentFormats).toContain(result);
      });
    });
  });

  describe('String to enum conversion', () => {
    describe('stringToContentFormat', () => {
      it('should convert "json" string to JSON format', () => {
        const result = typeConverter.stringToContentFormat('json');
        expect(result).toBe(ContentFormat.JSON);
      });

      it('should convert "csv" string to CSV format', () => {
        const result = typeConverter.stringToContentFormat('csv');
        expect(result).toBe(ContentFormat.CSV);
      });

      it('should convert "xml" string to XML format', () => {
        const result = typeConverter.stringToContentFormat('xml');
        expect(result).toBe(ContentFormat.XML);
      });

      it('should convert "hl7" string to HL7 format', () => {
        const result = typeConverter.stringToContentFormat('hl7');
        expect(result).toBe(ContentFormat.HL7);
      });

      it('should convert "unknown" string to UNKNOWN format', () => {
        const result = typeConverter.stringToContentFormat('unknown');
        expect(result).toBe(ContentFormat.UNKNOWN);
      });

      it('should handle case insensitive conversion', () => {
        expect(typeConverter.stringToContentFormat('JSON')).toBe(ContentFormat.JSON);
        expect(typeConverter.stringToContentFormat('Csv')).toBe(ContentFormat.CSV);
        expect(typeConverter.stringToContentFormat('XML')).toBe(ContentFormat.XML);
        expect(typeConverter.stringToContentFormat('HL7')).toBe(ContentFormat.HL7);
        expect(typeConverter.stringToContentFormat('UNKNOWN')).toBe(ContentFormat.UNKNOWN);
      });

      it('should return null for invalid format strings', () => {
        expect(typeConverter.stringToContentFormat('invalid')).toBeNull();
        expect(typeConverter.stringToContentFormat('yaml')).toBeNull();
        expect(typeConverter.stringToContentFormat('')).toBeNull();
        expect(typeConverter.stringToContentFormat('   ')).toBeNull();
      });
    });

    describe('stringToContentType', () => {
      it('should convert "application/json" string to JSON content type', () => {
        const result = typeConverter.stringToContentType('application/json');
        expect(result).toBe(ContentType.JSON);
      });

      it('should convert "text/csv" string to CSV content type', () => {
        const result = typeConverter.stringToContentType('text/csv');
        expect(result).toBe(ContentType.CSV);
      });

      it('should convert "application/xml" string to XML content type', () => {
        const result = typeConverter.stringToContentType('application/xml');
        expect(result).toBe(ContentType.XML);
      });

      it('should convert "x-application/hl7-v2+er7" string to HL7V2 content type', () => {
        const result = typeConverter.stringToContentType('x-application/hl7-v2+er7');
        expect(result).toBe(ContentType.HL7V2);
      });

      it('should handle case insensitive conversion', () => {
        expect(typeConverter.stringToContentType('APPLICATION/JSON')).toBe(ContentType.JSON);
        expect(typeConverter.stringToContentType('Text/CSV')).toBe(ContentType.CSV);
        expect(typeConverter.stringToContentType('APPLICATION/XML')).toBe(ContentType.XML);
        expect(typeConverter.stringToContentType('X-APPLICATION/HL7-V2+ER7')).toBe(ContentType.HL7V2);
      });

      it('should match content type with parameters using startsWith', () => {
        expect(typeConverter.stringToContentType('application/json; charset=utf-8')).toBe(ContentType.JSON);
        expect(typeConverter.stringToContentType('text/csv; header=true')).toBe(ContentType.CSV);
        expect(typeConverter.stringToContentType('application/xml; version=1.0')).toBe(ContentType.XML);
        expect(typeConverter.stringToContentType('x-application/hl7-v2+er7; encoding=er7')).toBe(ContentType.HL7V2);
      });

      it('should return null for unknown content type with parameters', () => {
        expect(typeConverter.stringToContentType('application/yaml; charset=utf-8')).toBeNull();
      });

      it('should return null for invalid content type strings', () => {
        expect(typeConverter.stringToContentType('invalid')).toBeNull();
        expect(typeConverter.stringToContentType('application/yaml')).toBeNull();
        expect(typeConverter.stringToContentType('')).toBeNull();
        expect(typeConverter.stringToContentType('   ')).toBeNull();
      });
    });

    describe('stringToEditorLanguage', () => {
      it('should convert "json" string to JSON editor language', () => {
        const result = typeConverter.stringToEditorLanguage('json');
        expect(result).toBe(EditorLanguage.JSON);
      });

      it('should convert "xml" string to XML editor language', () => {
        const result = typeConverter.stringToEditorLanguage('xml');
        expect(result).toBe(EditorLanguage.XML);
      });

      it('should convert "plaintext" string to PLAINTEXT editor language', () => {
        const result = typeConverter.stringToEditorLanguage('plaintext');
        expect(result).toBe(EditorLanguage.PLAINTEXT);
      });

      it('should handle case insensitive conversion', () => {
        expect(typeConverter.stringToEditorLanguage('JSON')).toBe(EditorLanguage.JSON);
        expect(typeConverter.stringToEditorLanguage('Xml')).toBe(EditorLanguage.XML);
        expect(typeConverter.stringToEditorLanguage('PLAINTEXT')).toBe(EditorLanguage.PLAINTEXT);
      });

      it('should return null for invalid editor language strings', () => {
        expect(typeConverter.stringToEditorLanguage('invalid')).toBeNull();
        expect(typeConverter.stringToEditorLanguage('javascript')).toBeNull();
        expect(typeConverter.stringToEditorLanguage('')).toBeNull();
        expect(typeConverter.stringToEditorLanguage('   ')).toBeNull();
      });
    });

    describe('Integration tests for string conversion', () => {
      it('should maintain consistency between string conversion and enum conversion for content formats', () => {
        const testCases = [
          { string: 'json', format: ContentFormat.JSON },
          { string: 'csv', format: ContentFormat.CSV },
          { string: 'xml', format: ContentFormat.XML },
          { string: 'hl7', format: ContentFormat.HL7 },
          { string: 'unknown', format: ContentFormat.UNKNOWN }
        ];

        testCases.forEach(({ string, format }) => {
          const stringResult = typeConverter.stringToContentFormat(string);
          expect(stringResult).toBe(format);
                    
          // Test round-trip conversion
          const contentType = typeConverter.contentFormatToContentType(format);
          if (contentType) {
            const editorLanguage1 = typeConverter.contentTypeToEditorLanguage(contentType);
            const editorLanguage2 = typeConverter.contentFormatToEditorLanguage(format);
            expect(editorLanguage1).toBe(editorLanguage2);
          }
        });
      });

      it('should maintain consistency between string conversion and enum conversion for editor languages', () => {
        const testCases = [
          { string: 'json', language: EditorLanguage.JSON },
          { string: 'xml', language: EditorLanguage.XML },
          { string: 'plaintext', language: EditorLanguage.PLAINTEXT }
        ];

        testCases.forEach(({ string, language }) => {
          const stringResult = typeConverter.stringToEditorLanguage(string);
          expect(stringResult).toBe(language);
        });
      });
    });
  });

  describe('Enum to string conversion', () => {
    it('should convert ContentFormat enum to correct string', () => {
      expect(ContentFormat.JSON).toBe('json');
      expect(ContentFormat.CSV).toBe('csv');
      expect(ContentFormat.XML).toBe('xml');
      expect(ContentFormat.HL7).toBe('hl7');
      expect(ContentFormat.UNKNOWN).toBe('unknown');
    });

    it('should convert ContentType enum to correct string', () => {
      expect(ContentType.JSON).toBe('application/json');
      expect(ContentType.CSV).toBe('text/csv');
      expect(ContentType.XML).toBe('application/xml');
      expect(ContentType.HL7V2).toBe('x-application/hl7-v2+er7');
    });

    it('should convert EditorLanguage enum to correct string', () => {
      expect(EditorLanguage.JSON).toBe('json');
      expect(EditorLanguage.XML).toBe('xml');
      expect(EditorLanguage.PLAINTEXT).toBe('plaintext');
    });
  });
});
