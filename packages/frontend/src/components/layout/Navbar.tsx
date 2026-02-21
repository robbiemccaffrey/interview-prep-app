import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navLink = (to: string, label: string) => {
    const active = location.pathname === to || location.pathname.startsWith(to + '/');
    return (
      <Link
        to={to}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          active
            ? 'bg-emerald-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-emerald-400 font-mono font-bold text-lg">{'</>'}</span>
          <span className="font-semibold text-white">SWE Interview Prep</span>
        </Link>
        <div className="flex items-center gap-1">
          {navLink('/learn', 'Learn')}
          {navLink('/practice', 'Practice')}
          {navLink('/real-world', 'Real World')}
          {navLink('/big-o', 'Big O')}
        </div>
      </div>
    </nav>
  );
}
