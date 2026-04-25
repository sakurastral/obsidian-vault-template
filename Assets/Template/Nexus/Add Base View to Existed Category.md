<%*
const newContent = `
\`\`\`base
filters:
  or:
    - parent.contains(link(this.file.basename))
views:
  - type: cards
    name: All Sub Categories
    order:
      - file.name
      - aliases

\`\`\`

\`\`\`base
filters:
  or:
    - categories.contains(link(this.file.basename))
formulas:
  Related: categories.filter(value!=("[["+this.file.basename+"]]"))
properties:
  formula.Related:
    displayName: Related
  file.name:
    displayName: Name
  note.tags:
    displayName: Tags
views:
  - type: table
    name: All
	groupBy:
      property: file.folder
      direction: ASC
    order:
      - file.name
      - tags
      - formula.Related
    columnSize:
      file.name: 450
      note.tags: 400

\`\`\`
`;

// read current file content
let content = await tp.file.content;

// separate frontmatter (YAML properties)
const regex = /^---\n([\s\S]*?)\n---\n?/;
const match = content.match(regex);

let newNoteContent;

if (match) {
  // keep YAML frontmatter and replace the rest
  newNoteContent = `---\n${match[1]}\n---\n${newContent}`;
} else {
  // if no frontmatter exists, just insert new content
  newNoteContent = newContent;
}

// overwrite the file
const addBase = await app.vault.modify(tp.file.find_tfile(tp.file.path(true)), newNoteContent);
-%>