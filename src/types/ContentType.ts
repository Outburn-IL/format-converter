/**
 * Enumeration of supported MIME types/content types for data format identification.
 * These values correspond to standard HTTP Content-Type header values and are used
 * for format detection and conversion operations.
 */
export const enum ContentType {
    /** Standard MIME type for JSON data */
    JSON = 'application/json',
    /** Standard MIME type for CSV data */
    CSV = 'text/csv',
    /** Standard MIME type for XML data */
    XML = 'application/xml',
    /** Custom MIME type for HL7 Version 2.x messages in ER7 encoding */
    HL7V2 = 'x-application/hl7-v2+er7'
}