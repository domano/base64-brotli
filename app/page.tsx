import Decoder from './components/Decoder';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Base64 + Brotli Decoder
        </h1>
        <Decoder />
      </main>
    </div>
  );
}
