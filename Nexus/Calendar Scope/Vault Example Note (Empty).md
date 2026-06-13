---
cover:
title: Vault Example Note (Empty)
aliases:
categories:
  - "[[Vault Properties]]"
tags:
description:
created: 2025-12-25T15:19:55+08:00
modified: 2026-06-13T16:38:40+08:00
status:
parent:
related:
references:
---

```base
filters:
  or:
    - parent.contains(link(this.file.basename))
views:
  - type: cards
    name: All Sub Categories
    order:
      - file.name
      - aliases

```

```base
filters:
  or:
    - categories.contains(link(this.file.basename))
formulas:
  Related: categories.filter(value!=("[["+this.file.basename+"]]"))
properties:
  formula.Related:
    displayName: Related
  file.name:
    displayName: Name
  note.tags:
    displayName: Tags
views:
  - type: table
    name: All
	groupBy:
      property: file.folder
      direction: ASC
    order:
      - file.name
      - tags
      - formula.Related
    columnSize:
      file.name: 450
      note.tags: 400

```
