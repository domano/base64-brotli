interface DecompressionStream {
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<Uint8Array>;
}

interface DecompressionStreamConstructor {
  new(format: 'gzip' | 'deflate' | 'deflate-raw' | 'br'): DecompressionStream;
}

declare module 'compression' {
  export interface CompressionOptions {
    quality?: number;
    lgwin?: number;
    lgblock?: number;
  }

  export type CompressFunction = (buffer: Uint8Array, options?: CompressionOptions) => Uint8Array;
  export type DecompressFunction = (buffer: Uint8Array) => Uint8Array | null;

  const compression: {
    compress: CompressFunction;
    decompress: DecompressFunction;
  };

  export default compression;
} 