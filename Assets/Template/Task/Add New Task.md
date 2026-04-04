<%* let title = tp.file.title _%> 
<%*  // Pre-define Form Values
	let path = "";  
	let files = "";
	
	let project = "";
	
	let content = "";
	
	let due = tp.date.now("YYYY-MM-DDT17:00");

	path = "Assets/Settings/Task Status";  
	files = app.vault.getMarkdownFiles()
		.filter(file => file.path.includes(path))
		.map(tFile=>tFile.basename)
		.sort((a, b) => { return a.localeCompare(b); }); 
	let status = files[0];

	let values = {
		project,
		content, 
		due, 
		status,
	}
_%> 
<%* 
if (title.startsWith("Untitled")) { 
_%> 
<%*  
	if( !title ) { title = "" }  
	let counter = 1;  
	let checkedTitle = tp.date.now("YYYYMMDDHHmmss");  
	while (await tp.file.exists(tp.file.folder(true) + "/" + checkedTitle + ".md") ) {    
		checkedTitle = title + "_" + counter;  
		counter++;  
	}  
	title = checkedTitle;  
	title = tp.obsidian.stripHeading(title);  
	title = tp.obsidian.stripHeadingForLink(title);  
	await tp.file.rename(title);  
_%> 
<%* } _%> 
<%*  
	const modalForm = app.plugins.plugins.modalforms.api;  
	const formResult = await modalForm.openForm('add-new-task', { values });  
	const data = formResult.getData();  
	if (data.project) {
		project = '- "[[' + data.project + ']]"';
	}
	content = data.content;  
	due = data.due;  
	status = "[[" + data.status + "]]";  
	start = data.start ?? "";
	end = data.end ?? "";
_%>
---
title: <% (title) %>  
categories: 
   - "[[Task]]"  
   <%(project)%>
Task：Content: <% (content) %>  
Task：Status: "<%(status)%>"  
Task：Priority:  
Task：Scheduled(Start): <% (start) %> 
Task：Scheduled(End): <% (end) %> 
Task：Due: <% (due) %>  
Task：Done:  
Task：Cancelled:  
Task：Archived:  
<%* -%>
---
<%*
	tp.hooks.on_all_templates_executed(async() => {
		await tp.file.move("/Task/Inbox/" + title)
	});
_%>