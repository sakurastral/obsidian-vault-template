---
cover:
title: Assets Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2025-12-16T08:38:43+08:00
modified: 2025-12-19T11:26:15+08:00
parent:
references:
---

```base
filters:
  and:
    - '!file.ext.containsAny("md", "base", "canvas")'
    - '!file.folder.startsWith("Assets/Template")'
    - '!file.folder.startsWith("Assets/Scripts")'
formulas:
  Size (kB): (file.size/1024).round(1)
  Referrer: file.backlinks.map(file(value))
  Preview: image(file)
views:
  - type: table
    name: Assets
    filters:
      and:
        - file.folder.startsWith("Assets")
        - '!file.folder.startsWith("Assets/Template")'
        - '!file.folder.startsWith("Assets/Scripts")'
        - '!file.folder.startsWith("Assets/Settings")'
    order:
      - file.name
      - file.ext
      - file.folder
    sort:
      - property: file.ext
        direction: DESC
      - property: type
        direction: ASC
  - type: table
    name: Uncorrectly Categorized
    filters:
      and:
        - '!file.folder.startsWith("Assets")'
  - type: cards
    name: Orphan Files (Card)
    filters:
      and:
        - formula.Referrer.isEmpty()
    order:
      - file.name
      - file.ext
      - formula.Size (kB)
      - file.folder
    sort:
      - property: file.ext
        direction: ASC
      - property: file.name
        direction: ASC
    columnSize:
      file.ext: 105
    rowHeight: medium
    imageFit: ""
    cardSize: 230
    imageAspectRatio: 1
    image: file.file
  - type: table
    name: Orphan Files (Table)
    filters:
      and:
        - formula.Referrer.isEmpty()
    order:
      - file.name
      - formula.Preview
      - file.ext
      - formula.Size (kB)
      - file.folder
    sort:
      - property: file.ext
        direction: ASC
      - property: file.name
        direction: ASC
    columnSize:
      file.ext: 105
    imageFit: ""
    cardSize: 230
    imageAspectRatio: 1
    image: file.file

```
