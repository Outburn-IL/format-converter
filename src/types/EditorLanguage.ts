/**
 * Enumeration of supported editor language identifiers for syntax highlighting and editor configuration.
 * These values are used to determine the appropriate language mode for displaying content
 * in code editors or other text editing interfaces.
 */
export const EditorLanguage = {
  /** JSON language mode for syntax highlighting */
  JSON: 'json',
  /** XML language mode for syntax highlighting */
  XML: 'xml',
  /** Plain text mode with no syntax highlighting */
  PLAINTEXT: 'plaintext'
} as const;

export type EditorLanguage = typeof EditorLanguage[keyof typeof EditorLanguage];