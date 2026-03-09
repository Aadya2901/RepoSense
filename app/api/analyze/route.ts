import axios from "axios";
import { NextResponse } from "next/server";

function detectStack(files: string[]) {
  const stack: string[] = [];

  if (files.includes("package.json")) stack.push("Node.js");
  if (files.includes("next.config.js") || files.includes("next.config.ts")) stack.push("Next.js");
  if (files.includes("requirements.txt")) stack.push("Python");
  if (files.includes("Dockerfile")) stack.push("Docker");
  if (files.includes("tailwind.config.js") || files.includes("tailwind.config.ts")) stack.push("Tailwind");
  if (files.includes("tsconfig.json")) stack.push("TypeScript");

  return stack;
}

export async function POST(req: Request) {
  const { repoUrl } = await req.json();

  try {
    const parts = repoUrl.replace("https://github.com/", "").split("/");
    const owner = parts[0];
    const repo = parts[1];

    const repoInfo = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    const contents = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents`
    );

    const files = contents.data.map((f: any) => f.name);

    const techStack = detectStack(files);

    return NextResponse.json({
      name: repoInfo.data.name,
      language: repoInfo.data.language,
      stars: repoInfo.data.stargazers_count,
      stack: techStack,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Repository not found or API error" },
      { status: 500 }
    );
  }
}