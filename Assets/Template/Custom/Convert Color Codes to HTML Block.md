<%*
// https://forum.obsidian.md/t/easy-text-selection-into-a-code-block-using-a-hotkey-templater/80055
// new Notice(`
// If you have a code block with color hex codes like this, you can select the whole code block and use this template to convert it to a html block:
// 	\`\`\`
// 	#000000
// 	#000000
// 	#000000
// 	#000000
// 	#000000
// 	\`\`\`
// `, 0)
function divWrapper (content) {
  let result = `<div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 15px; margin: 5px;"><!-- Custom Color Palette Block Start-->
	${content}
<!-- Custom Color Palette Block End--></div>`;
  return result;
}
function colorWrapper (color) {
  let result = `<div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 5px;">
		<div style="background-color: ${color}; width: 50px; height: 50px; border-radius: 50%;"></div>
		<span>${color}</span>
	</div>`;
  return result;
}

// get selection
let noteContent = tp.file.selection();
// get array of lines
let lines = noteContent.split('\n')
// convert into new content
let newContent = "";
lines.forEach(l => {
	if(!l.includes("`")) { newContent = newContent + colorWrapper(l) + "\n"; }
})
newContent = newContent.replace(/\n$/, "");
// put the new one into the divWrapper
newContent = divWrapper(newContent);
return newContent;
%>