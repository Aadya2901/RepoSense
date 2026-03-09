import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { repoUrl } = await req.json();

  try {
    const parts = repoUrl.replace("https://github.com/", "").split("/");
    const owner = parts[0];
    const repo = parts[1];

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    const data = response.data;

    return NextResponse.json({
      name: data.name,
      language: data.language,
      stars: data.stargazers_count,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Repository not found" },
      { status: 500 }
    );
  }
}
