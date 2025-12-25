<%*  
// 1. Define the exact name of the notes to delete  
const targetName = "Vault Example Note (Empty)";

// 2. Find all matching files  
const files = app.vault.getMarkdownFiles().filter(f => f.basename === targetName);

if (files.length === 0) {  
    new Notice("No matching notes found.");  
    return;  
}

// 3. Safety confirmation  
const confirmDelete = await tp.system.suggester(  
    [`Yes, delete ${files.length} notes`, "Cancel"],  
    [true, false],  
    false,  
    `Found ${files.length} files named "${targetName}". Proceed?`  
);

if (confirmDelete) {  
    new Notice(`Deleting ${files.length} files...`);
    
    for (const file of files) {
        // .trash(file, true) moves to System Trash
        // .trash(file, false) moves to Obsidian .trash folder
        await app.vault.trash(file, true);
    }

	const self = tp.config.target_file; 
	await app.vault.trash(self, true);
    
    new Notice("Cleanup complete.");
} else {  
    new Notice("Deletion cancelled.");  
}  
const file = app.workspace.getActiveFile();
if (file) {
    // 'true' sends to the system trash, 'false' sends to the Obsidian trash (.trash folder)
    await app.vault.trash(file, true); 
}
%>