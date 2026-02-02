import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { FormatConverter } from '../src/FormatConverter';
import { ContentType } from '../src/types';

const getInputFileContent = (name: string): string => {
  const fileName = path.join(__dirname, '.', 'inputs', name);
  return fs.readFileSync(fileName).toString();
};

describe('FormatConverter', () => {
  const formatConverter = new FormatConverter();

  it('defaults to JSON when content type is not provided', async () => {
    const input = { hello: 'world' };
    const result = await formatConverter.toJson(input);

    expect(result).toBe(input);
  });

  it('returns JSON input as-is for JSON content type', async () => {
    const input = { status: 'ok', count: 2 };
    const result = await formatConverter.toJson(input, ContentType.JSON);

    expect(result).toBe(input);
  });

  it('accepts JSON content type as a string', async () => {
    const input = { ok: true };
    const result = await formatConverter.toJson(input, 'application/json');

    expect(result).toBe(input);
  });

  it('converts CSV to JSON', async () => {
    const csv = 'name,age\nJohn,30\nJane,25';
    const result = await formatConverter.toJson(csv, ContentType.CSV);

    expect(result).toEqual([
      { name: 'John', age: '30' },
      { name: 'Jane', age: '25' }
    ]);
  });

  it('accepts CSV content type as a string', async () => {
    const csv = 'name,age\nJohn,30\nJane,25';
    const result = await formatConverter.toJson(csv, 'text/csv');

    expect(result).toEqual([
      { name: 'John', age: '30' },
      { name: 'Jane', age: '25' }
    ]);
  });

  it('converts XML to JSON', async () => {
    const xml = '<root><given>a</given><family value="B" /></root>';
    const result = await formatConverter.toJson(xml, ContentType.XML);

    expect(result).toMatchObject({
      given: 'a',
      family: 'B',
      _xmlTagName: 'root'
    });
  });

  it('converts HL7 V2 to JSON', async () => {
    const input: string = getInputFileContent('HL7-v2-ADT-A01.txt');
    const expectedOutput: object = JSON.parse(getInputFileContent('HL7-v2-ADT-A01.json'));
    const result = await formatConverter.toJson(input, ContentType.HL7V2);

    expect(result).toEqual(expectedOutput);
  });

  it('throws for unsupported content type', async () => {
    await expect(formatConverter.toJson('input', 'text/plain' as ContentType)).rejects.toThrow(
      'Unsupported Content-Type: text/plain'
    );
  });
});
