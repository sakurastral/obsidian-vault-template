---
cover: "[[calendar-pexels-pnw-prod-8251157.jpg]]"
title: Event Management
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2026-04-25T18:52:56+08:00
modified: 2026-04-25T18:56:28+08:00
status:
parent:
references:
---

```base
filters:
  and:
    - file.folder == "Project/Calendar"
views:
  - type: calendar
    name: View
    order:
      - calendar-event-title
    startDate: note.calendar-event-start
    endDate: note.calendar-event-end
  - type: list
    name: List

```

