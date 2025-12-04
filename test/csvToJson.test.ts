import { describe, it, expect } from 'vitest';
import { parseCsv } from '../src/converters/csvToJson';

describe('parseCsv', () => {
  describe('valid CSV inputs', () => {
    it('should parse simple CSV with headers', async () => {
      const csv = 'name,age,city\nJohn,30,New York\nJane,25,Los Angeles';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { name: 'John', age: '30', city: 'New York' },
        { name: 'Jane', age: '25', city: 'Los Angeles' }
      ]);
    });

    it('should parse CSV with quoted fields', async () => {
      const csv = 'name,description,price\n"Product A","A great product, with features",19.99\n"Product B","Another product",29.99';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { name: 'Product A', description: 'A great product, with features', price: '19.99' },
        { name: 'Product B', description: 'Another product', price: '29.99' }
      ]);
    });

    it('should parse CSV with empty fields', async () => {
      const csv = 'name,email,phone\nJohn,,555-1234\nJane,jane@example.com,';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { name: 'John', email: '', phone: '555-1234' },
        { name: 'Jane', email: 'jane@example.com', phone: '' }
      ]);
    });

    it('should parse single row CSV', async () => {
      const csv = 'name,age\nJohn,30';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { name: 'John', age: '30' }
      ]);
    });

    it('should parse CSV with only headers', async () => {
      const csv = 'name,age,city';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([]);
    });

    it('should parse CSV with special characters', async () => {
      const csv = 'name,title,salary\n"O\'Connor, John","Software Engineer & Developer","$75,000"';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { name: 'O\'Connor, John', title: 'Software Engineer & Developer', salary: '$75,000' }
      ]);
    });

    it('should parse CSV with newlines in quoted fields', async () => {
      const csv = 'name,address,notes\n"John Doe","123 Main St\nApt 4B\nNew York, NY","Multi-line\nnotes here"';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { 
          name: 'John Doe', 
          address: '123 Main St\nApt 4B\nNew York, NY', 
          notes: 'Multi-line\nnotes here' 
        }
      ]);
    });

    it('should handle CSV with extra whitespace', async () => {
      const csv = 'name , age , city \n John , 30 , New York \n Jane , 25 , Los Angeles ';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { 'name': 'John', 'age': '30', 'city': 'New York' },
        { 'name': 'Jane', 'age': '25', 'city': 'Los Angeles' }
      ]);
    });

    it('should parse CSV with numeric-looking strings', async () => {
      const csv = 'id,code,amount\n001,ABC123,1000.50\n002,DEF456,2000.75';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { id: '001', code: 'ABC123', amount: '1000.50' },
        { id: '002', code: 'DEF456', amount: '2000.75' }
      ]);
    });
  });

  describe('edge cases and error handling', () => {
    it('should return empty array for empty string', async () => {
      const csv = '';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([]);
    });

    it('should handle CSV with inconsistent column count', async () => {
      const csv = 'name,age,city\nJohn,30\nJane,25,Los Angeles,Extra,MoreData';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { name: 'John', age: '30' },
        { name: 'Jane', age: '25', city: 'Los Angeles', field4: 'Extra', field5: 'MoreData' }
      ]);
    });

    it('should handle malformed CSV gracefully', async () => {
      const csv = 'name,age\n"John,30\nJane"25';
      const result = await parseCsv(csv);
            
      // Should return empty array when parsing fails
      expect(result).toEqual([]);
    });

    it('should handle very large field values', async () => {
      const largeText = 'x'.repeat(100_000);
      const csv = `name,description\nTest,"${largeText}"`;
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { name: 'Test', description: largeText }
      ]);
    });

    it('should handle CSV with Unicode characters', async () => {
      const csv = 'name,city,country\nJosé,São Paulo,Brasil\n张三,北京,中国\nмария,Москва,Россия';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { name: 'José', city: 'São Paulo', country: 'Brasil' },
        { name: '张三', city: '北京', country: '中国' },
        { name: 'мария', city: 'Москва', country: 'Россия' }
      ]);
    });

    it('should handle CSV with escaped quotes', async () => {
      const csv = 'name,quote\nJohn,"He said ""Hello"" to me"\nJane,"She replied ""Hi there"""';
      const result = await parseCsv(csv);
            
      expect(result).toEqual([
        { name: 'John', quote: 'He said "Hello" to me' },
        { name: 'Jane', quote: 'She replied "Hi there"' }
      ]);
    });
  });

  describe('return type validation', () => {
    it('should return a Promise that resolves to an array', async () => {
      const csv = 'name,age\nJohn,30';
      const result = await parseCsv(csv);
            
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return objects with string values', async () => {
      const csv = 'name,age,active\nJohn,30,true';
      const result = await parseCsv(csv);
            
      expect(typeof result[0].name).toBe('string');
      expect(typeof result[0].age).toBe('string');
      expect(typeof result[0].active).toBe('string');
    });

    it('should maintain property names from CSV headers', async () => {
      const csv = 'firstName,lastName,emailAddress\nJohn,Doe,john@example.com';
      const result = await parseCsv(csv);
            
      expect(result[0]).toHaveProperty('firstName');
      expect(result[0]).toHaveProperty('lastName');
      expect(result[0]).toHaveProperty('emailAddress');
    });
  });

  describe('performance and memory', () => {
    it('should handle moderately large CSV files', async () => {
      const rows = Array.from({ length: 100_000 }, (_, i) => `User${i},${20 + i},City${i}`);
      const csv = 'name,age,city\n' + rows.join('\n');
            
      const start = Date.now();
      const result = await parseCsv(csv);
      const end = Date.now();
            
      expect(result).toHaveLength(100_000);
      expect(end - start).toBeLessThan(400); // Should complete within 400 milliseconds
    });

    it('should handle CSV with many columns', async () => {
      const headers = Array.from({ length: 50 }, (_, i) => `col${i}`);
      const values = Array.from({ length: 50 }, (_, i) => `value${i}`);
      const csv = headers.join(',') + '\n' + values.join(',');
            
      const result = await parseCsv(csv);
            
      expect(result).toHaveLength(1);
      expect(Object.keys(result[0])).toHaveLength(50);
    });
  });
});
