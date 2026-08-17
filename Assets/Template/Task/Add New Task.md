---
categories:
  - "[[Task]]"
task-content:
task-status: "[[Backlog]]"
task-priority:
task-scheduled-start:
task-scheduled-end:
task-due:
task-done:
task-cancelled:
task-archived:
cover: "[[default-task-cover.png]]"
---
<%* let title = tp.file.title _%>
<%*

if ( title.startsWith("Untitled") ) { 
	if( !title ) { title = "" }  
	let counter = 1;  
	let checkedTitle = tp.date.now("YYYYMMDDHHmmss");  
	while (await tp.file.exists(tp.file.folder(true) + "/" + checkedTitle + ".md") ) {    
		checkedTitle = checkedTitle + "_" + counter;  
		counter++;  
	}  
	title = checkedTitle;  
	title = tp.obsidian.stripHeading(title);  
	title = tp.obsidian.stripHeadingForLink(title);  
	// await tp.file.rename(title);  
	await tp.file.move("/Task/Inbox/" + title)
}  
-%>
<%*
	tp.hooks.on_all_templates_executed(async() => {
	  const file = tp.file.find_tfile(tp.file.path(true));
	  await app.workspace.activeLeaf.openFile(file);
	  await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>