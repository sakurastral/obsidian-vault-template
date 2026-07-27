<%* let title = tp.file.title _%>
<%*   
	let content = tp.frontmatter["task-content"] ?? "";  
	let status = tp.frontmatter["task-status"]?.replace(/[\[\]]/g, "") ?? "[[Backlog]]".replace(/[\[\]]/g, "");  
	let priority = tp.frontmatter["task-priority"] ?? undefined;  
	let start = tp.frontmatter["task-scheduled-start"] ?? "";  
	let end = tp.frontmatter["task-scheduled-end"] ?? "";  
    let due = tp.frontmatter["task-due"] ?? tp.date.now("YYYY-MM-DDT17:00");
	
	let values = {
		content, 
		due, 
		status,
		...priority,
		start,
		end,
	}
	
	const modalForm = app.plugins.plugins.modalforms.api;  
	const formResult = await modalForm.openForm('add-new-task', { values });  
	
	if (formResult.status !== "ok") {
		return; // Stop script execution
	}
	const data = formResult.getData();  
	if(formResult.status === "ok"){    
		content = data.content;  
		due = data.due;  
		status = "[[" + data.status + "]]";  
		priority = data.priority ?? undefined;  
		start = data.start ?? "";  
		end = data.end ?? "";  
	}  
	const file = tp.file.find_tfile(tp.file.path(true));  
	const add = await app.fileManager.processFrontMatter(file, (frontmatter) => {  
		if(formResult.status === "ok"){  
		    frontmatter["task-content"] = content;  
		    frontmatter["task-status"] =  status;  
		    if (priority) { frontmatter["task-priority"] = priority;  }
		    frontmatter["task-scheduled-start"] = start;  
		    frontmatter["task-scheduled-end"] = end;  
		    frontmatter["task-due"] =  due;  
		}  
	});  
-%>
<%*
	tp.hooks.on_all_templates_executed(async() => {
	  const file = tp.file.find_tfile(tp.file.path(true));
	  await app.workspace.activeLeaf.openFile(file);
	  await app.commands.executeCommandById("obsidian-linter:lint-file"); 
	});
-%>