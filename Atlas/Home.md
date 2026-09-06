---
title: Home
cover: "[[default-home-cover.png]]"
created: 2024-09-30T14:29:33+08:00
modified: 2026-09-06T15:23:14+08:00
aliases:
  - home
description:
categories:
  - "[[Vault Management]]"
status:
parent:
related:
references:
sort-order: 1
tags:
---

```base
filters:
  and:
    - file.folder == "Atlas"
    - file.name != this.file.name
views:
  - type: cards
    name: View
    sort:
      - property: sort-order
        direction: ASC
    cardSize: 250
    image: note.cover
    imageAspectRatio: 0.45
  - type: table
    name: View 2
    order:
      - file.name
      - sort-order
    sort:
      - property: sort-order
        direction: ASC

```

```base
views:
  - type: table
    name: 最近新增
    sort:
      - property: created
        direction: DESC
    limit: 10

```
