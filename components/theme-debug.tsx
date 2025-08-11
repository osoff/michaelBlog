"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeDebug() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-background border p-4 rounded-lg shadow-lg z-50">
      <h3 className="font-bold mb-2">Отладка темы:</h3>
      <div className="text-sm space-y-1">
        <div>Тема: {theme}</div>
        <div>Решенная тема: {resolvedTheme}</div>
        <div>
          Классы HTML:{" "}
          {typeof document !== "undefined"
            ? document.documentElement.className
            : "N/A"}
        </div>
        <div>
          Активные классы:{" "}
          {typeof document !== "undefined"
            ? Array.from(document.documentElement.classList).join(", ")
            : "N/A"}
        </div>
        <div className="mt-2 space-x-2">
          <button
            onClick={() => setTheme("neutral")}
            className="px-2 py-1 bg-gray-500 text-white rounded text-xs">
            Neutral
          </button>
          <button
            onClick={() => setTheme("neutral-dark")}
            className="px-2 py-1 bg-gray-700 text-white rounded text-xs">
            Neutral Dark
          </button>
          <button
            onClick={() => setTheme("blue")}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs">
            Blue
          </button>
          <button
            onClick={() => setTheme("blue-dark")}
            className="px-2 py-1 bg-blue-700 text-white rounded text-xs">
            Blue Dark
          </button>
          <button
            onClick={() => setTheme("orange")}
            className="px-2 py-1 bg-orange-500 text-white rounded text-xs">
            Orange
          </button>
          <button
            onClick={() => setTheme("orange-dark")}
            className="px-2 py-1 bg-orange-700 text-white rounded text-xs">
            Orange Dark
          </button>
          <button
            onClick={() => setTheme("violet")}
            className="px-2 py-1 bg-violet-500 text-white rounded text-xs">
            Violet
          </button>
          <button
            onClick={() => setTheme("violet-dark")}
            className="px-2 py-1 bg-violet-700 text-white rounded text-xs">
            Violet Dark
          </button>
        </div>
      </div>
    </div>
  );
}
