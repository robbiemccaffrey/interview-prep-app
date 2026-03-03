import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import LearnTopic from './pages/LearnTopic';
import Practice from './pages/Practice';
import Problem from './pages/Problem';
import RealWorld from './pages/RealWorld';
import BigO from './pages/BigO';
import Debug from './pages/Debug';
import DebugExercise from './pages/DebugExercise';
import Gotchas from './pages/Gotchas';
import GotchaTopic from './pages/GotchaTopic';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:topicId" element={<LearnTopic />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/:problemId" element={<Problem />} />
            <Route path="/real-world" element={<RealWorld />} />
            <Route path="/big-o" element={<BigO />} />
            <Route path="/debug" element={<Debug />} />
            <Route path="/debug/:exerciseId" element={<DebugExercise />} />
            <Route path="/gotchas" element={<Gotchas />} />
            <Route path="/gotchas/:topicId" element={<GotchaTopic />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
