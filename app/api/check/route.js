import { NextResponse } from "next/server";
import pkg from "@/package.json";

export async function GET() {
  return NextResponse.json({
    ok: true,
    node: process.versions.node,
    versions: {
      next: pkg.dependencies.next,
      react: pkg.dependencies.react,
      reactDom: pkg.dependencies["react-dom"],
      rscWebpack: pkg.dependencies["react-server-dom-webpack"]
    }
  });
}

