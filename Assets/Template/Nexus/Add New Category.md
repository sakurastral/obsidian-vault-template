<%* let title = tp.file.title -%>  
<%* if (title.startsWith("Untitled")) { -%>  
<%*  
	try{  
		const modalForm = app.plugins.plugins.modalforms.api;  
		const formResult = await modalForm.openForm('edit-note-title');  
		const data = formResult.getData();  
		if (!data.title) { return; }  
		title = (data.prefix ?? "") + (data.textBeforeSymbol ?? "") + (data.symbol ?? "") + data.title;  
		title = tp.obsidian.stripHeadingForLink(title);
		
		//https://www.reddit.com/r/ObsidianMD/comments/1bpoetv/seeking_advice_automating_file_naming_with/
		let counter = 1;
		let checkedTitle = title;
		while (await tp.file.exists(tp.file.folder(true) + "/" + checkedTitle + ".md") ) {
			// Append a counter to the file name to ensure uniqueness
			checkedTitle = title + "_" + counter;
			counter++;
		}
		title = checkedTitle;
		
		await tp.file.rename(title);  
	} catch (e) {
	//https://gist.github.com/lucasew/24eac69370f40f947d61d2ba48377811
		new Notice(`Error: ${e.message || e}`)
		console.error(e)
	}
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
