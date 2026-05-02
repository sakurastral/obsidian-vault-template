<%* let title = tp.file.title -%>
<%* 
if (title.startsWith("Untitled")) { 
	const customTitle = await tp.file.include(tp.file.find_tfile("Change Note Name"))
	const cat = await tp.file.include(tp.file.find_tfile("Add New Categories"))
} 
-%>
<%*
	tp.hooks.on_all_templates_executed(async() => {
	  const file = tp.file.find_tfile(tp.file.path(true));
	  await app.workspace.activeLeaf.openFile(file);
	  await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>