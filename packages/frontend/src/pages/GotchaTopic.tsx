import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { gotchas } from '../data/gotchas';
import SEO from '../components/SEO';
import 'highlight.js/styles/github-dark.css';

export default function GotchaTopic() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const topicIndex = gotchas.findIndex((t) => t.id === topicId);
  const topic = gotchas[topicIndex];

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-400">Topic not found.</p>
        <Link to="/gotchas" className="text-rose-400 hover:underline mt-4 inline-block">
          Back to Gotchas
        </Link>
      </div>
    );
  }

  const prev = topicIndex > 0 ? gotchas[topicIndex - 1] : null;
  const next = topicIndex < gotchas.length - 1 ? gotchas[topicIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SEO
        title={topic.title}
        description={topic.summary}
        path={`/gotchas/${topic.id}`}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/gotchas" className="hover:text-rose-400 transition-colors">
          Gotchas
        </Link>
        <span>/</span>
        <span className="text-gray-300">{topic.title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center font-mono text-rose-400 font-bold">
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
                  <code className="bg-gray-800 text-rose-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
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
                  <Link to={href} className="text-rose-400 hover:underline">
                    {children}
                  </Link>
                );
              }
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline">
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
            onClick={() => navigate(`/gotchas/${prev.id}`)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-rose-400 transition-colors"
          >
            <span>&larr;</span>
            <span>{prev.title}</span>
          </button>
        ) : (
          <div />
        )}
        {next ? (
          <button
            onClick={() => navigate(`/gotchas/${next.id}`)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-rose-400 transition-colors"
          >
            <span>{next.title}</span>
            <span>&rarr;</span>
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
