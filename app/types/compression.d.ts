interface DecompressionStream {
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<Uint8Array>;
}

interface DecompressionStreamConstructor {
  new(format: 'gzip' | 'deflate' | 'deflate-raw' | 'br'): DecompressionStream;
}

declare var DecompressionStream: DecompressionStreamConstructor; 