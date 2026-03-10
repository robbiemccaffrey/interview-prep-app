import { topics } from '../data/topics';
import TopicCard from '../components/learn/TopicCard';
import SEO from '../components/SEO';

export default function Learn() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SEO
        title="Learn Data Structures & Algorithms"
        description="Master core data structures and algorithms with interactive lessons. Covers hash tables, trees, graphs, dynamic programming, sorting, and more with complexity tables and code examples."
        path="/learn"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Learn</h1>
        <p className="text-gray-400">
          Core data structures and algorithms — concepts, complexity tables, and annotated code
          examples.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
