---
title: Cover Management
cover: "[[default-atlas-cover.png]]"
created: 2026-05-04T15:07:43+08:00
modified: 2026-09-06T15:23:14+08:00
aliases:
description:
categories:
  - "[[Vault Management]]"
status:
parent:
related:
references:
sort-order: 9
tags:
---

```base
filters:
  and:
    - file.ext == "md"
    - '!file.folder.startsWith("Assets")'
views:
  - type: table
    name: Notes
    filters:
      and:
        - '!file.folder.startsWith("Task")'
        - '!file.path.startsWith("Calendar/")'
        - '!file.path.startsWith("Journal/")'
        - '!file.folder.startsWith("Nexus")'
        - '!file.folder.startsWith("Atlas")'
    order:
      - file.folder
      - file.name
      - cover
    sort:
      - property: cover
        direction: ASC
      - property: file.folder
        direction: DESC
  - type: table
    name: Task
    filters:
      and:
        - file.folder.startsWith("Task")
    order:
      - file.folder
      - file.name
      - cover
    sort:
      - property: file.folder
        direction: DESC
  - type: table
    name: Calendar & Journal
    filters:
      or:
        - file.path.startsWith("Calendar/")
        - file.path.startsWith("Journal/")
    order:
      - file.folder
      - file.name
      - cover
    sort:
      - property: file.folder
        direction: DESC
  - type: table
    name: Nexus
    filters:
      and:
        - file.folder.startsWith("Nexus")
    order:
      - file.folder
      - file.name
      - cover
    sort:
      - property: file.folder
        direction: DESC
  - type: table
    name: Atlas
    filters:
      and:
        - file.folder.startsWith("Atlas")
    order:
      - file.folder
      - file.name
      - cover
    sort:
      - property: file.folder
        direction: DESC

```
