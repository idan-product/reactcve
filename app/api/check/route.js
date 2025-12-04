import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  const pkgPath = join(process.cwd(), "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  
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

