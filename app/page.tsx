"use client";

import { useState } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState<any>(null);

  async function addRepo() {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl }),
    });

    const data = await response.json();
    setResult(data);
  }

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>RepoSense</h1>

      <p>Paste a GitHub repository to analyze</p>

      <input
        type="text"
        placeholder="https://github.com/user/repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{
          padding: "10px",
          width: "400px",
          marginRight: "10px",
        }}
      />

      <button onClick={addRepo} style={{ padding: "10px 20px" }}>
        Analyze Repo
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #333",
            borderRadius: "10px",
            width: "500px",
          }}
        >
          <h2>Repository Analysis</h2>

          <p><b>Name:</b> {result.name}</p>
          <p><b>Language:</b> {result.language}</p>
          <p><b>Stars:</b> {result.stars}</p>

          <h3>Detected Stack</h3>
          <ul>
            {result.stack.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}