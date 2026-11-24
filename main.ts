// Fortune Cookie Wisdom for Developers — one-line entry.
// Fortune-cookie voice: second-person prophecy, one balanced sentence.
// "Your estimate was honest" — the estimator is innocent; "the future
// simply added a meeting" — the meeting is fate, not anyone's fault.
// That quiet twist (meetings as destiny) is what rewards a second read.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Your estimate was honest; the future simply added a meeting.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Count characters by code point, like the sealed gate does.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${chars.length}`);
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

// Round-trip check: what we wrote is byte-for-byte what we intended.
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== ENTRY) {
  throw new Error("round-trip mismatch: entry.txt differs from ENTRY");
}
console.log(`wrote ${chars.length} characters to ${join(outDir, "entry.txt")}`);
