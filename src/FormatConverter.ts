import { parseCsv, parseXml, v2json } from './converters';
import { TypeConverter } from './TypeConverter';
import { ContentType, IFormatConverter, ILogger, ITypeConverter } from './types';

const noopLogger: ILogger = {
  info: () => {},
  warn: () => {},
  error: () => {},
};

export class FormatConverter implements IFormatConverter {
  private static readonly typeConverter: ITypeConverter = new TypeConverter();
  private logger: ILogger;

  constructor(logger?: ILogger) {
    this.logger = logger || noopLogger;
  }

  async toJson(input: any, contentType?: ContentType | string): Promise<any> {
    if (!contentType || contentType === '') {
      this.logger.info('No content type provided, defaulting to \'application/json\'');
      contentType = ContentType.JSON;
    }
    const suggestedContentType = typeof contentType === 'string'
      ? FormatConverter.typeConverter.stringToContentType(contentType)
      : contentType;
    if (!suggestedContentType) {
      throw new Error(`Unsupported Content-Type: ${suggestedContentType}`);
    }

    let parsedJson: any;
    if (suggestedContentType === ContentType.HL7V2) {
      this.logger.info('Content-Type suggests HL7 V2.x message');
      this.logger.info('Trying to parse HL7 V2.x message as JSON...');
      parsedJson = await this.hl7v2ToJson(input);
      this.logger.info('Parsed HL7 V2.x message to JSON successfully.');
    } else if (suggestedContentType === ContentType.CSV) {
      this.logger.info('Content-Type suggests CSV input');
      this.logger.info('Trying to parse CSV as JSON...');
      parsedJson = await this.csvToJson(input);
      this.logger.info('Parsed CSV to JSON successfully.');
    } else if (suggestedContentType === ContentType.XML) {
      this.logger.info('Content-Type suggests XML input');
      this.logger.info('Trying to parse XML as JSON...');
      parsedJson = await this.xmlToJson(input);
      this.logger.info('Parsed XML to JSON successfully.');
    } else if (suggestedContentType === ContentType.JSON) {
      this.logger.info('Content-Type suggests JSON input');
      parsedJson = input;
      this.logger.info('Parsed input to JSON successfully.');
    } else {
      // should never reach here
      throw new Error('Unsupported Content-Type encountered during processing.');
    }

    return parsedJson;
  }

  csvToJson = parseCsv;

  xmlToJson(input: string): Promise<any> {
    return Promise.resolve(parseXml(input));
  }

  hl7v2ToJson = v2json;
}