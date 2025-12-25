---
cover:
title: Template Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2025-12-16T08:38:43+08:00
modified: 2025-12-19T11:16:03+08:00
parent:
references:
---

```base
filters:
  or:
    - file.folder.startsWith("Assets/Template")
    - file.folder.startsWith("Assets/Scripts")
views:
  - type: table
    name: View
    groupBy:
      property: file.ext
      direction: DESC
    order:
      - file.folder
      - file.name
    sort:
      - property: file.path
        direction: ASC
    columnSize:
      file.folder: 234

```