<%* 
const markerSelected   = "🔖 ";
const markerUnselected = "🏷️ ";
const divider = " ➜ "; 

let optionText = "Add Categories";  
let categoryPath = "Nexus/Categories";  

let categoryFiles = app.vault.getMarkdownFiles()  
    .filter(file => file.path.includes(categoryPath))
	.sort();

function getParents(file) {
  const cache = app.metadataCache.getFileCache(file);
  const fm = cache?.frontmatter ?? {};
  let parents = fm.parent ?? [];
  if (!Array.isArray(parents)) parents = [parents];
  return parents.filter(Boolean);
}

function getCategoryData(files) {
	let pathData = [];
	for (const file of files) {
	    const name = file.basename;
	    const parent = getParents(file).map(p=>p.replace(/[\[\]]/g, ""));
		const data = { name, parent }
		pathData.push(data)
	}
	return pathData;
}

function getExpandPaths(paths, datas) {
	let result1 = [];
	for ( const path of paths) {
		const target = path.split(divider)[0];
		const parent = datas.find( ({name}) => name === target )?.parent;
		
		if ( parent.length > 0 ) {
			const expand = getExpandPaths(parent.map( x => x + divider + path), datas)
			result1.push(...expand)
		} else {
			result1.push(path)
		}
	}
	return result1;
}

function listAllFullPaths(files) {
  let result2 = [];
  const pathData = getCategoryData(files);

  for (const file of files) {
    const base = file.basename;
    const parent = pathData.find( ({name}) => name === base)?.parent;
	
	if ( parent.length > 0 ) {
		let expand = parent.map( x => x + divider + base)
		expand = getExpandPaths(expand, pathData)
		result2.push(...expand)
	} else {
		result2.push(base) 
	}
  }
  
  return result2.flat().filter(Boolean);
}

-%>
<%* 
const currentFile = tp.file.find_tfile(tp.file.path(true));

let existingCategories = [];
const fileCache = app.metadataCache.getFileCache(currentFile);
if (fileCache && fileCache.frontmatter && fileCache.frontmatter.categories) {
    existingCategories = fileCache.frontmatter.categories;
    if (!Array.isArray(existingCategories)) {
        existingCategories = [existingCategories];
    }
}

let categoryTextList = listAllFullPaths(categoryFiles)
	.map((path)=>{  
		const base = path.replace(markerUnselected, "").replace(markerSelected, "").split(divider).pop();
		
		const isExisting = existingCategories.includes( "[[" + base + "]]");
		const marker = isExisting ? markerSelected : markerUnselected;
		
		const result = marker + path

	    return result;
	})
	.sort((a, b) => {
	    const markerA = a.startsWith("🔖") ? 0 : 1;
	    const markerB = b.startsWith("🔖") ? 0 : 1;
	    if (markerA !== markerB) { return markerA - markerB; }
	    return b.localeCompare(a);
	});

const suggester = await tp.system.multi_suggester(categoryTextList, categoryTextList, false, optionText);  
-%>
<%* 
const file = tp.file.find_tfile(tp.file.path(true));  
const add = await app.fileManager.processFrontMatter(file, (frontmatter) => {  
  if (!frontmatter["categories"]) {  
    frontmatter["categories"] = [];  
  } else if (!Array.isArray(frontmatter["categories"])) {  
    frontmatter["categories"] = [frontmatter["categories"]];  
  }  

  frontmatter["categories"] = [...frontmatter["categories"], ...suggester.map(r=> "[[" + r.replace(markerUnselected, "").replace(markerSelected, "").split(divider).pop() + "]]" )]  
	  .filter((item, index, array) => {  
		return array.indexOf(item) === index;
	  });  
});  
-%>