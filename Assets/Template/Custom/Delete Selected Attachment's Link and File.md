<%*  
// 1. Get the current selection  
const selection = tp.file.selection();

if (!selection) {  
    new Notice("Please select a link (e.g., ![[image.png]]) first.",0);  
    return selection;  
}

// 2. Regex to find all [[links]] or ![[links]] in the selection  
// It captures the filename and ignores aliases/headers (e.g., [[file.png|alias]])  
const linkRegex = /!?\[\[([^\]|#]+)(?:\||#)?.*?\]\]/g;  
const matches = [...selection.matchAll(linkRegex)];

if (matches.length === 0) {  
    new Notice("No valid links found in the selection.",0);  
    return ;  
}

// 3. Resolve the links to actual TFile objects  
const allVaultFiles = app.vault.getFiles();  
let filesToDelete = [];  
// const pathsFound = [];

for (const match of matches) {  
    let linkText = match[1];
    
    // Determine if the link is a path (folder/file.png) or just a name (file.png)
    const isPath = linkText.includes("/");
    const fileName = isPath ? linkText.split("/").pop() : linkText;

    const found = allVaultFiles.filter(f => {
        if (isPath) {
            // If the link has a path, match the end of the full path
            return f.path.endsWith(linkText);
        } else {
            // If it's just a name, find EVERY file with that name or basename
            return f.name === fileName || f.basename === fileName;
        }
    });
    
    filesToDelete.push(...found);
}

// Remove duplicates from our array (if you selected two links to the same file)  
filesToDelete = [...new Set(filesToDelete)];

if (filesToDelete.length === 0) {  
    new Notice("Files not found in vault. They might already be deleted.",0);  
    return ;  
}

let skippedFiles = [];  
let actuallyDelete = [];  
for (const file of filesToDelete) {  
    const backlinks = app.metadataCache.getBacklinksForFile(file);
	
    // Number of unique notes linking to this file
    const usageCount = [...backlinks.data.entries()].length;

    if (usageCount > 1) {
        skippedFiles.push(file);
    } else {
        actuallyDelete.push(file);
    }
}

// 4. Show confirmation logic  
const fileListString = filesToDelete.join("\n");  
const confirmMsg = filesToDelete.length === 1  
    ? `Delete this file?`  
    : `Delete these ${filesToDelete.length} files?`;

// Using Templater's suggester as a confirmation dialog  
const confirm = await tp.system.suggester(  
// ["Yes, delete permanently", "No, keep them", "------------ File Path List:", ...filesToDelete],  
// ["true", "false", "", ...filesToDelete],  
["Yes, delete permanently", "No, keep them", "------------ SKIPPED (Used in 2+ notes):", ...skippedFiles, "------------ WILL BE DELETED:", ...actuallyDelete],  
["true", "false", "------------ SKIPPED (Used in 2+ notes):", ...skippedFiles, "------------ WILL BE DELETED:", ...actuallyDelete],  
false,  
confirmMsg);

// [How to handle templater scripts eating selection](https://github.com/SilentVoid13/Templater/discussions/419)  
const editor = app.workspace.activeLeaf.view.editor;  
let oriSelection = editor.getSelection();  
let cAnchor = editor.getCursor('anchor');  
let cHead = editor.getCursor('head');

if (confirm === "true") {  
	// Keep track of parent folders to check later  
	const foldersToCheck = new Set();
	
    for (const file of actuallyDelete) {
		if (file.parent) foldersToCheck.add(file.parent);
        // Moves file to system trash for safety. 
        // Use app.vault.delete(file) for permanent deletion.
        await app.vault.trash(file, true); 
    }
	// Function to recursively delete empty parent folders
    const cleanFolders = async (folder) => {
        // Don't delete the root folder
        if (!folder || folder.isRoot()) return;
        
        // Refresh children check (Obsidian API)
        if (folder.children && folder.children.length === 0) {
            const parent = folder.parent;
            await app.vault.trash(folder, true);
            // Move up to the next parent to see if it's now empty too
            await cleanFolders(parent);
        }
    };
	// Run the cleanup for all affected folders
    for (const folder of foldersToCheck) {
        await cleanFolders(folder);
    }
	// Helper to resolve links the same way Obsidian does
	const resolveFile = (linkText) => {
	    const isPath = linkText.includes("/");
	    const fileName = isPath ? linkText.split("/").pop() : linkText;
	    return allVaultFiles.find(f => isPath ? f.path.endsWith(linkText) : (f.name === fileName || f.basename === fileName));
	};
	const newSelectionText = editor.getSelection().replace(linkRegex, (match, linkText) => {
	        const file = resolveFile(linkText);
	        // If this file is in our deleted list, wipe the text
	        if (file && actuallyDelete.some(f => f.path === file.path)) {
	            return ""; 
	        }
	        return match; // Keep the link text
	});
    // 5. Clear the selection in the editor to remove the link text
    editor.setSelection(cAnchor, cHead)
    editor.replaceSelection(newSelectionText);
	
    new Notice(`Deleted ${actuallyDelete.length} file(s), removed link, and cleaned empty folders. (Skipped ${skippedFiles.length} used files)`, 0);
} else {  
	setTimeout(() => editor.setSelection(cAnchor, cHead), 0);  
	editor.replaceSelection(oriSelection);  
    new Notice("Deletion cancelled.", 0);  
}

%>