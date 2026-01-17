<%* -%>
---
categories: 
  - "[[Journal]]"
<%*  -%>
---
<%*
	tp.hooks.on_all_templates_executed(async() => {
	  await tp.file.include(tp.file.find_tfile("Edit Journal's Properties"))
	  const file = tp.file.find_tfile(tp.file.path(true));
	  await app.workspace.activeLeaf.openFile(file);
	  await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>