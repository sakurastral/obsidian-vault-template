<%* let title = tp.file.title -%>
<%* if (title.startsWith("Untitled")) { -%>
<%*
	const customTitle = await tp.file.include(tp.file.find_tfile("Change Note Name"))
-%>
<%* } -%>
<%*
	tp.hooks.on_all_templates_executed(async() => {
		let file = tp.file.find_tfile(tp.file.path(true));
		await app.fileManager.processFrontMatter(file, (frontmatter) => {
			// From Gemini
			if (!frontmatter["categories"]) {  
				frontmatter["categories"] = [];  
			} else if (!Array.isArray(frontmatter["categories"])) {  
				frontmatter["categories"] = [frontmatter["categories"]]; 
			}
			frontmatter["categories"] = [...frontmatter["categories"], "[[Vault Properties]]"]
				.filter((item, index, array) => {  
				return array.indexOf(item) === index;  
				});
			frontmatter["title"] = title
		});
		file = tp.file.find_tfile(tp.file.path(true));
		await app.workspace.getLeaf(true).openFile(file);
		await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>
```base
filters:
  or:
    - parent.contains(link(this.file.basename))
views:
  - type: cards
    name: All Sub Categories
    order:
      - file.name
      - aliases

```

```base
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

```
