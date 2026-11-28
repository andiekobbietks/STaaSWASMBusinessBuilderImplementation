import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const outputDirectory = mkdtempSync(join(tmpdir(), "staas-zip-smoke-"));

try {
  const compiler = resolve("node_modules/typescript/bin/tsc");
  execFileSync(
    process.execPath,
    [
      compiler,
      resolve("src/lib/zip.ts"),
      "--target",
      "ES2022",
      "--module",
      "ES2022",
      "--lib",
      "ES2022,DOM",
      "--outDir",
      outputDirectory,
      "--skipLibCheck",
    ],
    { stdio: "inherit" },
  );

  writeFileSync(
    join(outputDirectory, "package.json"),
    JSON.stringify({ type: "module" }),
    "utf8",
  );

  const { createZipBlob } = await import(
    pathToFileURL(join(outputDirectory, "zip.js")).href
  );

  const files = {
    "index.md": '---\nokf_version: "0.3"\n---\n',
    "business/context.md": "# Context\n",
    "evidence/analisi-caffè.md": "# Evidenza\n",
  };

  const archive = createZipBlob(files);
  const archivePath = join(outputDirectory, "fixture.zip");
  writeFileSync(archivePath, Buffer.from(await archive.arrayBuffer()));

  const pythonCheck = [
    "import sys, zipfile",
    "with zipfile.ZipFile(sys.argv[1]) as archive:",
    "    assert archive.testzip() is None",
    "    assert archive.namelist() == ['index.md', 'business/context.md', 'evidence/analisi-caffè.md']",
    "    assert archive.read('index.md').decode('utf-8') == '---\\nokf_version: \"0.3\"\\n---\\n'",
    "    assert archive.read('business/context.md').decode('utf-8') == '# Context\\n'",
    "    assert archive.read('evidence/analisi-caffè.md').decode('utf-8') == '# Evidenza\\n'",
  ].join("\n");

  execFileSync("python3", ["-c", pythonCheck, archivePath], {
    stdio: "inherit",
  });

  process.stdout.write("ZIP smoke test passed: CRC, paths, UTF-8 names and contents verified.\n");
} finally {
  rmSync(outputDirectory, { recursive: true, force: true });
}
