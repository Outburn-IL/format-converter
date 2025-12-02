import csvToJson from 'csvtojson';

export const parseCsv = async (csv: string): Promise<any> => {
  let json = {};
  try {
    json = await csvToJson().fromString(csv);
  } catch {
    json = [];
  }
  return json;
};