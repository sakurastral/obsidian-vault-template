---
cover: "[[jplenio-foggy-7725646.jpg]]"
title: Home
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2024-09-30T14:29:33+08:00
modified: 2026-04-17T08:10:29+08:00
status:
parent:
references:
---

```base
filters:
  and:
    - file.folder == "Atlas"
    - file.name != this.file.name
views:
  - type: dynamic-views-grid
    name: View
    sort: []
    dateProperty: file.name
    titleProperty: note.Day：Type
    startDate: note.title
    imageProperty: note.cover
    imageFormat: cover
    imagePosition: bottom
    imageFit: crop
    fallbackToContent: false
    cardSize: 150

```
```base
views:
  - type: table
    name: New
    sort:
      - property: created
        direction: DESC
    limit: 10

```

