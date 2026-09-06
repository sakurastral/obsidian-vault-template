---
title: Notes Management
cover: "[[default-atlas-cover.png]]"
created: 2025-12-16T08:38:43+08:00
modified: 2026-09-06T15:23:14+08:00
aliases:
description:
categories:
  - "[[Vault Management]]"
status:
parent:
related:
references:
sort-order: 5
tags:
---

```base
filters:
  and:
    - file.ext.containsAny("md", "base", "canvas")
    - '!file.folder.startsWith("Journal")'
    - '!file.folder.startsWith("Task")'
    - '!file.folder.startsWith("Assets/Template")'
    - '!file.folder.startsWith("Nexus")'
	- '!file.folder.startsWith("Calendar")'
	- '!file.folder.startsWith("Atlas")'
views:
  - type: table
    name: All
    groupBy:
      property: file.ext
      direction: ASC
    order:
      - file.folder
      - file.name
      - categories
      - tags
      - aliases
    sort:
      - property: file.folder
        direction: DESC
      - property: categories
        direction: DESC
      - property: type
        direction: ASC
      - property: file.name
        direction: DESC
    columnSize:
      file.folder: 256
      file.name: 548
      file.ext: 43
      note.categories: 343
      note.tags: 481
      note.references: 529
  - type: table
    name: Inbox
    filters:
      and:
        - file.folder.startsWith("Inbox")
    order:
      - file.name
      - file.folder
      - categories
    sort:
      - property: file.folder
        direction: ASC
  - type: table
    name: View
    order:
      - file.name
      - created
      - file.ctime
    sort:
      - property: created
        direction: ASC
      - property: file.ctime
        direction: ASC

```
