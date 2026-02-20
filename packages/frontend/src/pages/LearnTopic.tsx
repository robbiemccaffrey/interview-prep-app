import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { topics } from '../data/topics';
import 'highlight.js/styles/github-dark.css';

export default function LearnTopic() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topicIndex = topics.findIndex((t) => t.id === topicId);
  const topic = topics[topicIndex];

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-400">Topic not found.</p>
        <Link to="/learn" className="text-emerald-400 hover:underline mt-4 inline-block">
          Back to Learn
        </Link>
      </div>
    );
  }

  const prev = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const next = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/learn" className="hover:text-emerald-400 transition-colors">
          Learn
        </Link>
        <span>/</span>
        <span className="text-gray-300">{topic.title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center font-mono text-emerald-400 font-bold">
          {topic.icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{topic.title}</h1>
          <p className="text-gray-400 mt-1">{topic.summary}</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
        <ReactMarkdown
          className="prose-dark"
          rehypePlugins={[rehypeHighlight]}
          components={{
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden text-sm">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="bg-gray-800 border border-gray-700 px-4 py-2 text-left text-gray-200 font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-700 px-4 py-2 text-gray-300">{children}</td>
            ),
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-gray-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a: ({ href, children }) => {
              const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
              if (isInternal) {
                return (
                  <Link to={href} className="text-emerald-400 hover:underline">
                    {children}
                  </Link>
                );
              }
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  {children}
                </a>
              );
            },
          }}
        >
          {topic.content}
        </ReactMarkdown>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {prev ? (
          <button
            onClick={() => navigate(`/learn/${prev.id}`)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <span>←</span>
            <span>{prev.title}</span>
          </button>
        ) : (
          <div />
        )}
        {next ? (
          <button
            onClick={() => navigate(`/learn/${next.id}`)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <span>{next.title}</span>
            <span>→</span>
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
