import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const htmlPath = path.join(process.cwd(), "agents", "index.html");

  try {
    const html = fs.readFileSync(htmlPath, "utf-8");
    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch {
    return new NextResponse(
      "<p>Could not find <code>agents/index.html</code> in the project root.</p>",
      {
        status: 404,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}
