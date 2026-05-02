---
cover:
title: README
aliases:
categories:
tags:
created: 2025-12-19T16:35:48+08:00
modified: 2026-04-06T16:41:04+08:00
status:
parent:
references:
---

This is an Obsidian vault.

## Get started

1. Download the whole vault
2. Unzip the .zip file to a folder
3. Open this folder in Obsidian (Required Version: v1.11)
4. Open Command Palette and Run these Commands
	1. `Templater: Create Custom/Update “Created” and “Modified” Properties Across All Vault Notes`
	2. `Templater: Create Custom/Delete Example Notes`
5. After that, you can start writing your notes!

## Vault Organization Method: CAPTAIN

- C ollection
- A tlas
- P roject
- T ask
- A ssets
- I nbox
- N exus

### Detailed Description

- Collection: Collects all **external sources** from the internet or other platforms
- Atlas: Provides **note navigation and higher-level overviews**, including index pages and base views for exploring the vault structure
- Project: Holds **goal-oriented workspaces** with a clear scope, timeline, or outcome
	- Journal: Daily notes, including progress tracking, reflections, and work records
	- Nook: Stores **internal knowledge** created by myself
	- Calendar: Store Holidays or Events and their details
	- Other(Custom Name): Create new project folders under the "Project" folder for specialized needs
- Task: Contains all **task files**
- Assets: Stores **non-note files** and resources used by the vault
	- Attachments: Files attached directly to notes
	- Images: Images used globally across the vault.
	- Scripts: Custom scripts, mainly for Templater or automation
	- Settings: Centralized configuration and metadata for vault-level behaviors.
		- Custom File Explorer Sorting: Defines custom file and folder ordering rules for File Explorer. This is for the Custom File Explorer Sorting plugin.
		- Task Status: Configuration for task states
		- Title Prefix: Options for standardized title prefixes
		- Title Separator: Defines separators used in note titles for consistency
	- Template: Templates used by Templater for note creation and automation
- Inbox: All new internal or external notes are first placed here before being processed, categorized, and moved to their final location.
- Nexus: Defines the **core category system** of the vault.

## Basic Properties in Notes

```yaml
---
cover:
title: 
aliases:
categories:
tags:
created: 
modified:
status: 
parent:
references:
---
```

## Categories

Add your own categories in `Nexus/Categories/Area` and `Nexus/Categories/Others` folders. You can add the categories with no parent in `Nexus/Categories/Area` and the ones with parent in `Nexus/Categories/Others`. 

## License

This project is under the MIT license. See the LICENSE file for more details.

## Acknowledgments

This vault is inspired by various knowledge management systems and the Obsidian community. Special thanks to:
- reddit's r/Obsidian community
- obsidian forum
- obsidian discord
- Github - @kepano - [kepano-obsidian](https://github.com/kepano/kepano-obsidian)
- para [The PARA Method: The Simple System for Organizing Your Digital Life in Seconds](https://fortelabs.com/blog/para/)
- Medium - 朱騏 - [我想在 Obsidian 中使用卡片盒筆記法，該如何管理筆記檔案？](https://medium.com/pm%E7%9A%84%E7%94%9F%E7%94%A2%E5%8A%9B%E5%B7%A5%E5%85%B7%E7%AE%B1/%E6%88%91%E6%83%B3%E5%9C%A8-obsidian-%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%8D%A1%E7%89%87%E7%9B%92%E7%AD%86%E8%A8%98%E6%B3%95-%E8%A9%B2%E5%A6%82%E4%BD%95%E7%AE%A1%E7%90%86%E7%AD%86%E8%A8%98%E6%AA%94%E6%A1%88-821f913aa35d)
- Youtube - @NathanSeiling - [Folders or Links? The key to both is A.C.C.E.S.S.](https://www.youtube.com/watch?v=p0zWJ-TLghw)
