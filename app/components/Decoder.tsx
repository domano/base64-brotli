'use client';

import { useState } from 'react';
import { decompress } from 'brotli-compress/js';

function cleanBase64(input: string): string {
  // Remove quotes if present
  let cleaned = input.trim().replace(/^["']|["']$/g, '');
  
  // Handle both URL-safe and standard base64
  // First convert URL-safe to standard if needed
  cleaned = cleaned.replace(/-/g, '+').replace(/_/g, '/');
  
  // Add padding if necessary
  const padding = '='.repeat((4 - (cleaned.length % 4)) % 4);
  return cleaned + padding;
}

function tryParseAndUnescapeJSON(text: string): string {
  try {
    // First try to parse the string as-is
    try {
      const parsed = JSON.parse(text);
      return JSON.stringify(parsed, null, 2);
    } catch {
      // If that fails, try to parse it as an escaped string
      const unescaped = text.replace(/\\"/g, '"');
      const parsed = JSON.parse(unescaped);
      return JSON.stringify(parsed, null, 2);
    }
  } catch {
    // If all parsing attempts fail, return the original text
    return text;
  }
}

export default function Decoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const decodeAndDecompress = async (input: string) => {
    setIsLoading(true);
    setError('');
    try {
      // Clean and prepare the base64 string
      const base64 = cleanBase64(input);

      // Decode base64
      const decoded = atob(base64);
      const uint8Array = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        uint8Array[i] = decoded.charCodeAt(i);
      }

      // Decompress brotli
      const decompressed = decompress(uint8Array);
      if (!decompressed) {
        throw new Error('Failed to decompress data');
      }
      
      // Decode and remove any surrounding quotes
      let text = new TextDecoder().decode(decompressed).trim();
      text = text.replace(/^["']|["']$/g, '');
      
      // Try to parse and unescape if it's JSON
      text = tryParseAndUnescapeJSON(text);
      
      setOutput(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    } catch (err: unknown) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to decode input');
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900">
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Base64 + Brotli Decoder</h1>
        </div>

        <div className="space-y-4">
          <label htmlFor="input" className="block text-sm font-medium text-gray-200">
            Enter base64 encoded brotli compressed string (URL-safe or standard, with or without padding):
          </label>
          <textarea
            id="input"
            className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-800 text-gray-200 border-gray-600 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your base64 string here (quotes will be automatically removed)..."
          />
          <button
            onClick={() => decodeAndDecompress(input)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Decoding...' : 'Decode & Decompress'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-800 text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-200">Output:</label>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(output);
                  const btn = document.getElementById('copyBtn');
                  if (btn) {
                    btn.textContent = 'Copied!';
                    setTimeout(() => {
                      btn.textContent = 'Copy to Clipboard';
                    }, 2000);
                  }
                }}
                id="copyBtn"
                className="px-3 py-1 text-sm bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
              >
                Copy to Clipboard
              </button>
            </div>
            <pre className="w-full p-4 bg-gray-800 rounded-lg overflow-auto font-mono text-sm whitespace-pre-wrap text-gray-200 border border-gray-700">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 