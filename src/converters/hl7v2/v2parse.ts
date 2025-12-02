import hl7js from 'hl7js';

export const v2parse = async (msg: string): Promise<object> => {
  // parses hl7 v2 to raw json (without field names, only numbers)
  msg = msg.replace(/(?:\r\n|\r|\n)/g, '\r\n');

  // Create a new Reader instance for each parse operation to avoid race conditions
  const v2reader = new hl7js.Reader('BASIC');

  return await new Promise<object>((resolve, reject) => {
    v2reader.read(msg, function (err, hl7Data) {
      if (err) {
        reject(new Error(`Transformation error: ${JSON.stringify(err)}`));
        return;
      };
      return resolve(hl7Data);
    });
  });
};