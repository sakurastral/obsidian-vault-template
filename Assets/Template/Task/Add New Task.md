---
cover:
title: Add New Task
aliases:
categories: 
   - "[[Task]]"  
tags:
created: 2025-06-24T09:30:38+08:00
modified: 2026-04-25T14:41:17+08:00
status:
parent:
references:
Task：Content:   
Task：Status: 
Task：Priority:  
Task：Scheduled(Start):
Task：Scheduled(End):
Task：Due: 
Task：Done:  
Task：Cancelled:  
Task：Archived:  
---
<%* let title = tp.file.title _%>
<%* if (tp.file.title.includes("Untitled")) { -%>
![[Task Information Board.base#View|no-toolbar]]  
<%* } -%>
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