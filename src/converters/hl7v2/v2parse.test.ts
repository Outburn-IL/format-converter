import { describe, expect, it } from 'vitest';
import { v2parse } from './v2parse';

describe('v2parse', () => {
  it('parses message', async () => {
    const res = await v2parse('MSH|^~\\&|1|2|3|4');
    const segment = (res as any).segments[0];
    expect(segment.fields[0].value).toBe('MSH');
    expect(segment.sendingApplication).toBe('1');
  });

  it('rejects promise when parsing fails', async () => {
    // Test with invalid HL7 message that should cause parsing error
    await expect(v2parse('INVALID_HL7_MESSAGE_CONTENT')).rejects.toThrow('Invalid HL7 Message');
  });
});
