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
		new Notice(`Error: ${e.message || e}`)
		console.error(e)
	}
-%>
---
title: <% (title) %>
<%*
	const cat = await tp.file.include(tp.file.find_tfile("Add New Categories"))
-%>
---
<%* } -%>
<%*
	tp.hooks.on_all_templates_executed(async() => {
	  const file = tp.file.find_tfile(tp.file.path(true));
	  await app.workspace.activeLeaf.openFile(file);
	  await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>