/* Generates supabase/seed.sql from src/lib/data/categories.ts.
   Run: node scripts/generate-seed.cjs */
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const ts = require("typescript");

const root = path.join(__dirname, "..");
const src = readFileSync(path.join(root, "src/lib/data/categories.ts"), "utf8");

// Transpile TS → CJS and evaluate to get CATEGORIES
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, require);
const { CATEGORIES } = mod.exports;

const esc = (s) => s.replace(/'/g, "''");

let sql = `-- Auto-generated from src/lib/data/categories.ts — do not edit by hand.
-- Run AFTER schema.sql in the Supabase SQL editor.

`;

for (const c of CATEGORIES) {
  sql += `insert into public.categories (id, name, emoji, grp, difficulty) values ('${esc(c.id)}', '${esc(c.name)}', '${esc(c.emoji)}', '${esc(c.group)}', '${esc(c.difficulty)}')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;\n`;
  sql += `insert into public.words (category_id, word, hint) values\n`;
  sql += c.words.map((w) => `  ('${esc(c.id)}', '${esc(w.word)}', '${esc(w.hint || '')}')`).join(",\n");
  sql += `\n  on conflict (category_id, word) do update set hint = excluded.hint;\n\n`;
}

writeFileSync(path.join(root, "supabase/seed.sql"), sql);
console.log(`✓ supabase/seed.sql written (${CATEGORIES.length} categories, ${CATEGORIES.reduce((n, c) => n + c.words.length, 0)} words)`);
