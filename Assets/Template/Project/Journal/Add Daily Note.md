---
categories:
  - "[[Journal]]"
cover: "[[default-task-cover.png]]"
---

## <% tp.date.now("HH:mm") %>

<% tp.file.cursor() %>
<%*
	tp.hooks.on_all_templates_executed(async() => {
	  const file = tp.file.find_tfile(tp.file.path(true));
	  await app.workspace.activeLeaf.openFile(file);
	  await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>