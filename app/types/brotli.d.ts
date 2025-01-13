declare module 'brotli' {
  export function decompress(buffer: Uint8Array): Uint8Array | null;
  export function compress(buffer: Uint8Array, options?: { quality?: number; lgwin?: number; lgblock?: number; }): Uint8Array;
}

declare module 'brotli/decompress' {
  export function decompress(buffer: Uint8Array): Uint8Array;
} 