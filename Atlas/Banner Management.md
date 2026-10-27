---
title: Banner Management
banner: "[[default-cover.png]]"
created: 2026-05-04T15:07:43+08:00
modified: 2026-10-27T14:51:05+08:00
aliases:
description:
categories:
  - "[[Vault Management]]"
status: "[[Path]]"
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
      - banner
    sort:
      - property: banner
        direction: ASC
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
      - banner
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
      - banner
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
      - banner
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
      - banner
    sort:
      - property: file.folder
        direction: DESC

```
