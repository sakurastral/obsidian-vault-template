---
cover: "[[default-atlas-cover.png]]"
title: Cover Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
description:
created: 2026-05-04T15:07:43+08:00
modified: 2026-06-13T16:38:40+08:00
status:
parent:
related:
references:
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
        - '!file.path.startsWith("Project/Journal/")'
        - '!file.folder.startsWith("Nexus")'
        - '!file.folder.startsWith("Atlas")'
    order:
      - file.folder
      - file.name
      - cover
    sort:
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
        - file.path.startsWith("Project/Journal/")
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
