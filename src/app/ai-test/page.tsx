"use client";

import { useState } from "react";

export default function AITestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkImage() {
    if (!file) return;

    setLoading(true);
    setResult("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/check-screenshot", {
        method: "POST",
        body: formData,
      });

const responseText = await response.text();

console.log("HTTP status:", response.status);
console.log("Server response:", responseText);

if (!response.ok) {
  throw new Error(
    responseText || `Ошибка сервера: ${response.status}`
  );
}

try {
  const data = JSON.parse(responseText);
  setResult(data.result || "Сервер вернул пустой результат");
} catch {
  setResult(
    `Сервер вернул не JSON:\n\n${responseText}`
  );
}
    } catch (error) {
      console.error(error);
      setResult("Ошибка при проверке изображения");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold">
          🤖 Тест ИИ-проверки KPI
        </h1>

        <p className="mt-2 text-gray-600">
          Smoky Market — сторис с часами работы
        </p>

        <div className="mt-8">
          <label className="block mb-3 font-medium">
            Выбери скриншот
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0] ?? null;
              setFile(selectedFile);
              setResult("");
            }}
            className="block w-full cursor-pointer rounded-lg border p-3"
          />
        </div>

        {file && (
          <div className="mt-4 rounded-lg bg-gray-100 p-3">
            Выбран файл: <b>{file.name}</b>
          </div>
        )}

        <button
          type="button"
          onClick={checkImage}
          disabled={!file || loading}
          className="mt-6 rounded-xl bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "ИИ проверяет..." : "Проверить скриншот"}
        </button>

        {result && (
          <div className="mt-8 rounded-xl border p-5">
            <h2 className="font-bold">
              Результат проверки
            </h2>

            <pre className="mt-4 whitespace-pre-wrap text-sm">
              {result}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}