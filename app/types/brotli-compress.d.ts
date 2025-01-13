declare module 'brotli-compress/js' {
  export function decompress(buffer: Uint8Array): Uint8Array;
  export function compress(buffer: Uint8Array, options?: { quality?: number; lgwin?: number; lgblock?: number; }): Uint8Array;
} 