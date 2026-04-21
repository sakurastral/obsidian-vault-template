---
cover:
title: Task Board
aliases:
categories:
  - "[[Vault Management]]"
tags:
created: 2025-12-16T08:38:43+08:00
modified: 2026-04-06T16:41:57+08:00
status:
parent:
references:
---

```base
filters:
  and:
    - file.folder.startsWith("Task")
formulas:
  related-category: categories.filter(value!=("[[Task]]"))
  task-content-with-link: link(file, note["Task：Content"])
  overdue: if(note["Task：Due"] < now(), "🚨", if(note["Task：Due"].format("YYYY-MM-DD") === today().format("YYYY-MM-DD"), "⚠️", ""))
  Start Date: if(note["Task：Scheduled(Start)"], note["Task：Scheduled(Start)"], Task：Due)
  End Date: if(note["Task：Scheduled(End)"], note["Task：Scheduled(End)"], Task：Due)
  Relative Due: '"Due："+date(Task：Due).relative().toString()'
  Task in Short: '"Task：" + Task：Content'
properties:
  note.Task：Status:
    displayName: Status
  note.Task：Due:
    displayName: Due
  formula.task-content-with-link:
    displayName: Task
  formula.related-category:
    displayName: Related
  formula.overdue:
    displayName: Overdue Warning
views:
  - type: table
    name: Inbox
    filters:
      and:
        - file.folder == "Task/Inbox"
    order:
      - Task：Status
      - Task：Due
      - formula.overdue
      - formula.task-content-with-link
      - formula.related-category
    sort:
      - property: Task：Due
        direction: ASC
      - property: formula.related-category
        direction: DESC
      - property: tags
        direction: ASC
    columnSize:
      note.Task：Due: 200
      formula.overdue: 30
      formula.task-content-with-link: 489
    cardSize: 300
    calendarView: dayGridMonth
  - type: table
    name: Archived
    filters:
      and:
        - file.folder == "Task/Archived"
    order:
      - Task：Archived
      - formula.task-content-with-link
    columnSize:
      note.Task：Archived: 308
      formula.task-content-with-link: 400
  - type: calendar
    name: Calendar
    filters:
      and:
        - file.folder == "Task/Inbox"
    order:
      - formula.Task in Short
      - formula.Relative Due
    startDate: formula.Start Date
    endDate: formula.End Date

```
