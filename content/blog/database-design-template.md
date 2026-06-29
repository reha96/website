---
title: "Database Design Template"
date: "2026-05-28"
slug: "database-design-template"
tags: ["database-design", "sql", "schema", "erd", "template", "guide"]
topic: "Database Design"
author: "Reha Tuncer"
---

# Database Design Template

A structured template for designing and documenting relational databases. Use this as a guide when planning your schema, defining entities and relationships, and considering optimizations and limitations.

## Scope

In this section you should answer the following questions:

- What is the purpose of your database?
- Which people, places, things, etc. are you including in the scope of your database?
- Which people, places, things, etc. are *outside* the scope of your database?

## Functional Requirements

In this section you should answer the following questions:

- What should a user be able to do with your database?
- What's beyond the scope of what a user should be able to do with your database?

## Representation

### Entities

In this section you should answer the following questions:

- Which entities will you choose to represent in your database?
- What attributes will those entities have?
- Why did you choose the types you did?
- Why did you choose the constraints you did?

### Relationships

In this section you should include your entity relationship diagram and describe the relationships between the entities in your database.

## Optimizations

In this section you should answer the following questions:

- Which optimizations (e.g., indexes, views) did you create? Why?

## Limitations

In this section you should answer the following questions:

- What are the limitations of your design?
- What might your database not be able to represent very well?
