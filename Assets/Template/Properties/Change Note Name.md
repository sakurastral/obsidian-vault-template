<%* let title = tp.file.title -%>
<%*  
	let values = {
		prefix: title.includes("】") ? title.split("】")[0]+"】" : "", 
		title: title.includes("】") ? title.split("】")[1] : title,
	}
	const modalForm = app.plugins.plugins.modalforms.api;
	const formResult = await modalForm.openForm('edit-note-title', { values });
	const data = formResult.getData();
	if ( data.title ) {
		title = (data.prefix ?? "") + (data.textBeforeSymbol ?? "") + (data.symbol ?? "") + data.title;
	}
	
	// title = tp.obsidian.stripHeading(title);
	title = tp.obsidian.stripHeadingForLink(title);
	
	//https://www.reddit.com/r/ObsidianMD/comments/1bpoetv/seeking_advice_automating_file_naming_with/
	let counter = 1;
	let checkedTitle = title;
	if (checkedTitle != title) {
		while (await tp.file.exists(tp.file.folder(true) + "/" + checkedTitle + ".md") ) {
			// Append a counter to the file name to ensure uniqueness
			checkedTitle = title + "_" + counter;
			counter++;
		}
	}
	title = checkedTitle;
	
	await tp.file.rename(title);  
-%>
<%*
	tp.hooks.on_all_templates_executed(async() => {
	  const file = tp.file.find_tfile(tp.file.path(true));
	  await app.workspace.activeLeaf.openFile(file);
	  await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>