import { useMemo } from "react";

export function Markdown({ content }: { content: string }) {
  const html = useMemo(() => markdownToHtml(content), [content]);
  return <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function markdownToHtml(md: string): string {
  let html = escapeHtml(md);
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${code.trim()}</code></pre>`);
  // Headings
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Blockquote
  html = html.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");
  // Tables
  html = convertTables(html);
  // Checkboxes
  html = html.replace(/- \[ \] (.+)$/gm, '<div class="checkbox-item"><span class="checkbox-box"></span> $1</div>');
  // List items
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>(?:(?!<\/li>)[\s\S])*<\/li>)(?!\s*(?:<li>|<div))/g, (match) => {
    return `<ul>${match}</ul>`;
  });
  // Paragraphs
  html = html.replace(/^(?!<[hupblo])(.+)$/gm, "<p>$1</p>");
  html = html.replace(/\n{3,}/g, "\n\n");
  return html;
}

function convertTables(html: string): string {
  const tableRegex = /((?:^\|.+ \|\n?)+)/gm;
  return html.replace(tableRegex, (tableBlock) => {
    const lines = tableBlock.trim().split("\n").filter(l => l.trim());
    if (lines.length < 2) return tableBlock;
    const isSeparator = (line: string) => /^\|[\s:-]+\|/.test(line.trim());
    let result = "<table>";
    lines.forEach((line, i) => {
      if (isSeparator(line)) return;
      const cells = line.split("|").filter(c => c.trim() !== "").map(c => c.trim());
      const tag = i === 0 ? "th" : "td";
      result += `<tr>${cells.map(c => `<${tag}>${c}</${tag}>`).join("")}</tr>`;
    });
    result += "</table>";
    return result;
  });
}
