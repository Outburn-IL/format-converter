import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { v2json } from '../src/converters';

const getInputFileContent = (name: string): string => {
  const fileName = path.join(__dirname, '.', 'inputs', name);
  return fs.readFileSync(fileName).toString();
};

describe('v2json tests', () => {
  it('should convert HL7 v2 ADT-A01 message to JSON', async () => {
    const input: string = getInputFileContent('HL7-v2-ADT-A01.txt');
    const expectedOutput: object = JSON.parse(getInputFileContent('HL7-v2-ADT-A01.json'));
    const result = await v2json(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle HL7 v2 message with line numbering', async () => {
    const input: string = getInputFileContent('HL7-v2-LineNumbering.txt');
    const expectedOutput: object = JSON.parse(getInputFileContent('HL7-v2-LineNumbering.json'));
    const result = await v2json(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should convert HL7 v2 ORU observation message to JSON', async () => {
    const input: string = getInputFileContent('HL7-v2-ORU.txt');
    const expectedOutput: object = JSON.parse(getInputFileContent('HL7-v2-ORU.json'));
    const result = await v2json(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle HL7 v2 message with unknown fields', async () => {
    const input: string = getInputFileContent('HL7-v2-UnknownFields.txt');
    const expectedOutput: object = JSON.parse(getInputFileContent('HL7-v2-UnknownFields.json'));
    const result = await v2json(input);
    expect(result).toEqual(expectedOutput);
  });
});