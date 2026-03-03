import { Link } from 'react-router-dom';
import { Topic } from '../../data/topics';

interface Props {
  topic: Topic;
}

export default function GotchaCard({ topic }: Props) {
  return (
    <Link
      to={`/gotchas/${topic.id}`}
      className="block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-rose-500 transition-all hover:shadow-lg hover:shadow-rose-900/20 group"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center font-mono text-rose-400 font-bold text-sm shrink-0 group-hover:bg-rose-900/30 transition-colors">
          {topic.icon}
        </div>
        <div>
          <h3 className="font-semibold text-white group-hover:text-rose-400 transition-colors mb-1">
            {topic.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">{topic.summary}</p>
        </div>
      </div>
    </Link>
  );
}
