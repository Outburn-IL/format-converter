/**
 * Enumeration of supported content formats for detection and conversion.
 * Used by format detection algorithms to categorize input data and determine
 * appropriate conversion strategies.
 */
export const enum ContentFormat {
    /** JavaScript Object Notation format */
    JSON = 'json',
    /** Comma-Separated Values format */
    CSV = 'csv',
    /** eXtensible Markup Language format */
    XML = 'xml',
    /** Health Level 7 Version 2.x message format */
    HL7 = 'hl7',
    /** Unknown or unsupported format */
    UNKNOWN = 'unknown'
}