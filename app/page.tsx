"use client";

import { useState } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");

  async function addRepo() {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl }),
    });

    const data = await response.json();

    alert(
      `Repo: ${data.name}
Language: ${data.language}
Stars: ${data.stars}`
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
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
    </div>
  );
}
