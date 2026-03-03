import { gotchas } from '../data/gotchas';
import GotchaCard from '../components/gotchas/GotchaCard';

export default function Gotchas() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Gotchas</h1>
        <p className="text-gray-400">
          Common pitfalls and subtle bugs in Python, TypeScript, and React — the kind that trip you
          up in interviews and production code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gotchas.map((topic) => (
          <GotchaCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
