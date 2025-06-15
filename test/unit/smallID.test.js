import { hashSmall } from '../../dir/src/utils/smalID.js';

describe('hashSmall', () => {
  it('should return a string of length 8', () => {
    const result = hashSmall('https://example.com', "example");
    expect(result).toHaveLength(8);
  });

  it('should return different values for different URLs', () => {
    const hash1 = hashSmall('https://example.com', "exampleURL");
    const hash2 = hashSmall('https://another.com', "exampleURL");
    expect(hash1).not.toBe(hash2);
  });

  it('should return different values for the same URL on different calls', () => {
    const hash1 = hashSmall('https://example.com', "exampleURL");
    const hash2 = hashSmall('https://example.com', "exampleURL");
    expect(hash1).not.toBe(hash2);
  });

it('should throw an error if no URL is provided', () => {
    expect(() => hashSmall()).toThrow();
});

it('should throw an error if URL is missing the domain', () => {
    expect(() => hashSmall('https:///pathonly')).toThrow();
    expect(() => hashSmall('http:///')).toThrow();
    expect(() => hashSmall('ftp:///file')).toThrow();
});

it('should return a string for valid URLs with query params', () => {
    const result = hashSmall('https://example.com/path?query=1', "example");
    expect(typeof result).toBe('string');
    expect(result).toHaveLength(8);
});

it('should return different hashes for URLs differing only by query params', () => {
    const hash1 = hashSmall('https://example.com/path?query=1', "exampleURL");
    const hash2 = hashSmall('https://example.com/path?query=2', "exampleURL");
    expect(hash1).not.toBe(hash2);
});
});
