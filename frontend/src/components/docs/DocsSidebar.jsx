import React, { useState, useEffect } from 'react';
import { Users, GitPullRequest, Star, Eye, Github, BookOpen } from 'lucide-react';

export default function DocsSidebar() {
  const [stats, setStats] = useState({
    viewers: 0,
    stars: 0,
    contributors: 0,
  });

  useEffect(() => {
    // Simulate real-time viewers (you can replace with actual WebSocket later)
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        viewers: Math.floor(Math.random() * 15) + 5,
      }));
    }, 5000);

    // Fetch GitHub stats (optional - you can add real API call)
    setStats({
      viewers: Math.floor(Math.random() * 15) + 5,
      stars: 24,
      contributors: 3,
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden xl:block sticky top-20 w-72 h-fit">
      <div className="space-y-4">
        {/* Live Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Live Activity</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Eye className="w-4 h-4" />
                <span>Viewers</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{stats.viewers}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Star className="w-4 h-4" />
                <span>GitHub Stars</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{stats.stars}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>Contributors</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{stats.contributors}</span>
            </div>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-xl border border-indigo-200 dark:border-indigo-800 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
          <div className="space-y-2">
            <a
              href="https://github.com/Mihir-Rabari/fake-pe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            <a
              href="https://github.com/Mihir-Rabari/fake-pe/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition"
            >
              <GitPullRequest className="w-4 h-4" />
              <span>Report an Issue</span>
            </a>
            <a
              href="/docs/examples"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>Code Examples</span>
            </a>
          </div>
        </div>

        {/* Community Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Community</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Join our community to get help and share your experience!
          </p>
          <a
            href="https://github.com/Mihir-Rabari/fake-pe/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
          >
            Join Discussion
          </a>
        </div>

        {/* Version Info */}
        <div className="text-center text-xs text-gray-500">
          <p>Version 1.0.0</p>
          <p className="mt-1">Last updated: Oct 2024</p>
        </div>
      </div>
    </aside>
  );
}
