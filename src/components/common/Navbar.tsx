// libraries
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[95%] sm:w-[90%] max-w-4xl -translate-x-1/2 rounded-full bg-rose-50 text-rose-950 px-2 py-1 font-sans dark:bg-rose-950 dark:text-rose-50">
      <div className="relative flex items-center justify-between px-2">
        {/* Left section - Theme and Auth */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="text-sm hover:opacity-80 transition-opacity p-2"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          {user ? (
            <a
              href="/dashboard"
              className="text-sm hover:opacity-80 transition-opacity hidden sm:block"
            >
              Dashboard
            </a>
          ) : (
            <div className="flex gap-2 hidden sm:flex">
              <a
                href="/login"
                className="text-sm hover:opacity-80 transition-opacity"
              >
                Login
              </a>
              <span className="text-sm">/</span>
              <a
                href="/signup"
                className="text-sm hover:opacity-80 transition-opacity"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>

        {/* Logo - center */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" className="text-lg font-medium">
            Profile-Ex
          </a>
        </div>

        {/* Hamburger - right */}
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-rose-50 text-rose-950 font-sans dark:bg-rose-950 dark:text-rose-50 absolute top-full left-1/2 z-40 w-full -translate-x-1/2 rounded-xl p-4 shadow-lg mt-2">
          <ul className="space-y-4 text-center text-base">
            {user ? (
              <>
                <li>
                  <a href="/dashboard" className="block hover:underline">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/profile" className="block hover:underline">
                    Profile
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login" className="block hover:underline">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/signup" className="block hover:underline">
                    Sign Up
                  </a>
                </li>
              </>
            )}
            <li>
              <a href="/compare" className="block hover:underline">
                Compare
              </a>
            </li>
            <li>
              <a href="/contact" className="block hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
