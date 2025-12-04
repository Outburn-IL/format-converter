# Format Converter

A TypeScript library for converting various data formats (CSV, XML, HL7 v2) to JSON.

## Features

- 🔄 **Multi-format support**: Convert CSV, XML, HL7 v2 to JSON
- 🏥 **Healthcare focused**: Specialized HL7 v2 message parsing and conversion to JSON
- 🔍 **Format detection**: Automatic content type detection
- 🛡️ **Type-safe**: Written in TypeScript with full type definitions
- 🧪 **Well-tested**: Comprehensive test suite

## Installation

```bash
npm install @outburn/format-converter
```

## Usage

### Basic Usage

```typescript
import { FormatConverter } from '@outburn/format-converter';

const converter = new FormatConverter();

// Convert CSV to JSON
const csvData = `name,age,city
John,25,New York
Jane,30,Los Angeles`;

const jsonResult = await converter.toJson(csvData, 'text/csv');
console.log(jsonResult);

// Convert XML to JSON
const xmlData = `<?xml version="1.0"?>
<root>
  <person>
    <name>John</name>
    <age>25</age>
  </person>
</root>`;

const xmlToJson = await converter.toJson(xmlData, 'application/xml');
console.log(xmlToJson);
```

### HL7 v2 Message Conversion

```typescript
import { FormatConverter } from '@outburn/format-converter';

const converter = new FormatConverter();

// Convert HL7 v2 message to JSON
const hl7Message = `MSH|^~\\&|GHH LAB|ELAB-3|GHH OE|BLDG4|200202150930||ORU^R01|CNTRL-3456|P|2.4
PID|||PATID1234^5^M11^ADT1^MR^UNIVERSITY HOSPITAL~123456789^^^USSSA^SS||EVERYMAN^ADAM^A^III||19610615|M||C|1200 N ELM STREET^^GREENSBORO^NC^27401-1020|GL|(919)379-1212|(919)271-3434||S||PATID12345001^2^M10^ADT1^AN^A|123456789|9-87654^NC`;

const hl7ToJson = await converter.toJson(hl7Message, 'x-application/hl7-v2+er7');
console.log(hl7ToJson);
```

### With Logging

```typescript
import { FormatConverter } from '@outburn/format-converter';

// Custom logger implementation
const logger = {
  info: (message: string) => console.log(`[INFO] ${message}`),
  warn: (message: string) => console.warn(`[WARN] ${message}`),
  error: (message: string) => console.error(`[ERROR] ${message}`)
};

const converter = new FormatConverter(logger);
```

### Type Conversion Utilities

```typescript
import { TypeConverter } from '@outburn/format-converter';

const typeConverter = new TypeConverter();

// Convert MIME type strings to ContentType enum
const contentType = typeConverter.stringToContentType('text/csv');

// Detect format from content
const detectedFormat = typeConverter.detectFormat(csvData);
```

## Supported Formats

This library converts the following input formats to JSON:

| Input Format | Content Type | Output |
|--------------|--------------|--------|
| CSV | `text/csv` | JSON |
| XML | `application/xml` | JSON |
| HL7 v2 | `x-application/hl7-v2+er7` | JSON |
| JSON | `application/json` | JSON (passthrough) |

## API Reference

### FormatConverter

The main class for converting various formats to JSON.

#### Constructor
```typescript
new FormatConverter(logger?: ILogger)
```

**Parameters:**
- `logger` (optional): Custom logger implementing the `ILogger` interface

#### Methods

##### `toJson(input: any, contentType?: ContentType | string): Promise<any>`

Converts input data to JSON format. This is the primary method for format conversion.

**Parameters:**
- `input`: The data to convert (string or object)
- `contentType` (optional): The MIME type or ContentType enum value of the input data. If not provided, defaults to `application/json`

**Returns:** Promise resolving to the converted JSON data

**Example:**
```typescript
const result = await converter.toJson(csvData, 'text/csv');
```

##### `csvToJson(input: string): Promise<any>`

Converts CSV data to JSON format.

**Parameters:**
- `input`: CSV string to convert

**Returns:** Promise resolving to the converted JSON data

##### `xmlToJson(input: string): Promise<any>`

Converts XML data to JSON format.

**Parameters:**
- `input`: XML string to convert

**Returns:** Promise resolving to the converted JSON data

##### `hl7v2ToJson(input: string): Promise<any>`

Converts HL7 v2 message to JSON format.

**Parameters:**
- `input`: HL7 v2 message string to convert

**Returns:** Promise resolving to the converted JSON data

### TypeConverter

Utility class for converting between different content type representations.

#### Methods

##### `stringToContentType(contentType: string): ContentType | null`

Converts a MIME type string to a ContentType enum value.

**Parameters:**
- `contentType`: MIME type string (e.g., 'text/csv', 'application/xml')

**Returns:** ContentType enum value or null if not found

**Example:**
```typescript
const contentType = typeConverter.stringToContentType('text/csv');
// Returns: ContentType.CSV
```

##### `stringToContentFormat(format: string): ContentFormat | null`

Converts a format string to a ContentFormat enum value.

**Parameters:**
- `format`: Format string (e.g., 'json', 'csv', 'xml', 'hl7')

**Returns:** ContentFormat enum value or null if not found

##### `stringToEditorLanguage(editorLanguage: string): EditorLanguage | null`

Converts a language string to an EditorLanguage enum value.

**Parameters:**
- `editorLanguage`: Editor language string (e.g., 'json', 'xml', 'plaintext')

**Returns:** EditorLanguage enum value or null if not found

##### `contentTypeToContentFormat(contentType: ContentType): ContentFormat`

Converts a ContentType enum to a ContentFormat enum.

**Parameters:**
- `contentType`: ContentType enum value

**Returns:** Corresponding ContentFormat enum value

##### `contentTypeToEditorLanguage(contentType: ContentType): EditorLanguage`

Converts a ContentType enum to an EditorLanguage enum.

**Parameters:**
- `contentType`: ContentType enum value

**Returns:** Corresponding EditorLanguage enum value

##### `contentFormatToContentType(format: ContentFormat): ContentType | null`

Converts a ContentFormat enum to a ContentType enum.

**Parameters:**
- `format`: ContentFormat enum value

**Returns:** Corresponding ContentType enum value or null if not applicable

##### `contentFormatToEditorLanguage(format: ContentFormat): EditorLanguage`

Converts a ContentFormat enum to an EditorLanguage enum.

**Parameters:**
- `format`: ContentFormat enum value

**Returns:** Corresponding EditorLanguage enum value

### FormatDetector

Utility class for automatically detecting content formats from input strings.

#### Methods

##### `detectContentType(input: string): ContentType | null`

Detects the content type of the input string and returns the corresponding ContentType enum.

**Parameters:**
- `input`: String content to analyze

**Returns:** ContentType enum value or null if format cannot be determined

**Example:**
```typescript
const detector = new FormatDetector();
const contentType = detector.detectContentType(csvData);
// Returns: ContentType.CSV
```

##### `detectFormat(input: string): ContentFormat`

Analyzes the input string and detects its format.

**Parameters:**
- `input`: String content to analyze

**Returns:** ContentFormat enum value (returns ContentFormat.UNKNOWN if format cannot be determined)

**Example:**
```typescript
const detector = new FormatDetector();
const format = detector.detectFormat(xmlData);
// Returns: ContentFormat.XML
```

##### `detectEditorLanguage(input: string): EditorLanguage`

Detects the appropriate editor language syntax highlighting for the input content.

**Parameters:**
- `input`: String content to analyze

**Returns:** EditorLanguage enum value

**Example:**
```typescript
const detector = new FormatDetector();
const language = detector.detectEditorLanguage(jsonData);
// Returns: EditorLanguage.JSON
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Dependencies

- **csvtojson**: CSV parsing functionality
- **fast-xml-parser**: XML parsing and conversion
- **hl7-dictionary**: HL7 v2 message definitions
- **hl7js**: HL7 message parsing utilities
- **jsonata**: JSON transformation and querying

## License
MIT
© Outburn Ltd. 2022–2025. All Rights Reserved.

## Disclaimer
This project is part of the [FUME](https://github.com/Outburn-IL/fume-community) open-source initiative and intended for use in FHIR tooling and development environments.

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/Outburn-IL/format-converter/issues) page.