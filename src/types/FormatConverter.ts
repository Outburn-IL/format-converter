import { ContentType } from './ContentType';

export interface IFormatConverter {
    toJson: (input: any, contentType?: ContentType | string) => Promise<any>;

    /**
     * Converts CSV string to JSON object. If conversion fails, returns empty array.
     * @param input CSV string to be converted
     * @returns Promise resolving to JSON object
     */
    csvToJson: (input: string) => Promise<any>;

    xmlToJson: (input: string) => Promise<any>;
    hl7v2ToJson: (message: string) => Promise<any>;
}