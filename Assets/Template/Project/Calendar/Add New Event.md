---
calendar-event-title:
calendar-event-start:
calendar-event-end:
calendar-event-type:
categories:
  - "[[Journal]]"
status: "[[Tree]]"
cover: "[[default-task-cover.png]]"
---

<%*
	tp.hooks.on_all_templates_executed(async() => {
	  const file = tp.file.find_tfile(tp.file.path(true));
	  await app.workspace.activeLeaf.openFile(file);
	  await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>