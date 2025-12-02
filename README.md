# Format Converter

A TypeScript library for converting between various data formats including CSV, XML, HL7 v2, and JSON.

## Features

- 🔄 **Multi-format support**: Convert between CSV, XML, HL7 v2, and JSON
- 🏥 **Healthcare focused**: Specialized HL7 v2 message parsing and conversion
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

| Input Format | Content Type | Output |
|--------------|--------------|--------|
| CSV | `text/csv` | JSON |
| XML | `application/xml` | JSON |
| HL7 v2 | `x-application/hl7-v2+er7` | JSON |
| JSON | `application/json` | JSON (passthrough) |

## API Reference

### FormatConverter

#### Constructor
```typescript
new FormatConverter(logger?: ILogger)
```

- `logger` (optional): Custom logger implementing the `ILogger` interface

#### Methods

##### `toJson(input: any, contentType?: ContentType | string): Promise<any>`

Converts input data to JSON format.

**Parameters:**
- `input`: The data to convert
- `contentType`: The MIME type or ContentType enum value of the input data

**Returns:** Promise resolving to the converted JSON data

### TypeConverter

#### Methods

##### `stringToContentType(mimeType: string): ContentType | undefined`

Converts a MIME type string to a ContentType enum value.

##### `detectFormat(content: string): ContentType | undefined`

Attempts to automatically detect the format of the provided content.

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

MIT © Outburn Ltd.

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/Outburn-IL/format-converter/issues) page.