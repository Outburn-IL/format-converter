import { ContentType } from './ContentType';

/**
 * Interface for format conversion operations, providing methods to convert various data formats to JSON.
 * Supports conversion from CSV, XML, and HL7 V2.x message formats.
 */
export interface IFormatConverter {
    /**
     * Converts input data to JSON format based on the specified content type.
     * If content type is not provided, defaults to `application/json`.
     * @param input Data to be converted
     * @param contentType Optional content type indicating the format of the input data
     * @returns Promise resolving to JSON object
     * @throws Error if the content type is unsupported or conversion fails
     */
    toJson: (input: any, contentType?: ContentType | string) => Promise<any>;

    /**
     * Converts CSV string to JSON object. If conversion fails, returns an empty array.
     * @param input CSV string to be converted
     * @returns Promise resolving to JSON object
     */
    csvToJson: (input: string) => Promise<any>;

    /**
     * Converts XML string to JSON object. If the input is empty, returns an empty object.
     * @param input XML string to be converted
     * @returns Promise resolving to JSON object
     * @throws Error if XML parsing fails
     */
    xmlToJson: (input: string) => Promise<any>;

    /**
     * Converts HL7 V2.x message string to JSON object.
     * @param message HL7 V2.x message string to be converted
     * @returns Promise resolving to JSON object
     */
    hl7v2ToJson: (message: string) => Promise<any>;
}