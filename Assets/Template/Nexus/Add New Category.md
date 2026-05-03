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
![[Category Information Board.base#All Sub Categories]]

![[Category Information Board.base#All]]

