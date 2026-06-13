---
cover: "[[default-atlas-cover.png]]"
title: Template Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
description:
created: 2025-12-16T08:38:43+08:00
modified: 2026-06-13T16:38:40+08:00
status:
parent:
related:
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
  - type: table
    name: Cover Management
    filters:
      and:
        - file.ext == "md"
    order:
      - file.name
      - cover
    sort:
      - property: cover
        direction: ASC

```