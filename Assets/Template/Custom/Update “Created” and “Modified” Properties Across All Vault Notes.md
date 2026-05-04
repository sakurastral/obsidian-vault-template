<%*  
// 1. Define the format and the current time  
const timeFormat = "YYYY-MM-DDTHH:mm:ssZ";  
const now = tp.date.now(timeFormat);

// 2. Get all markdown files in the vault  
const files = app.vault.getMarkdownFiles();

// 3. Safety confirmation  
const confirmUpdate = await tp.system.suggester(["Yes, update all notes", "Cancel"], [true, false], false, `Update properties for ${files.length} notes?`);

if (confirmUpdate) {  
    new Notice(`Updating ${files.length} files...`);
    
    for (const file of files) {
        try {
            await app.fileManager.processFrontMatter(file, (frontmatter) => {
                // This updates the keys or creates them if they don't exist
                if (frontmatter["created"]) {  
					frontmatter["created"] = now;  
				}
				if (frontmatter["modified"]) {  
					frontmatter["modified"] = now;  
				}
				//frontmatter["created"] = now;
                //frontmatter["modified"] = now;
            });
        } catch (e) {
            console.error(`Failed to update ${file.path}:`, e);
        }
    }
    
    new Notice("Batch update complete.");
} else {  
    new Notice("Update cancelled.");  
}  
%>