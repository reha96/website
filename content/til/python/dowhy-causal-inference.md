---
title: "Python can do causal inference too — introducing DoWhy"
date: "2026-06-15"
tags: ["python", "causal-inference", "data-science", "statistics"]
---

# Python can do causal inference too — introducing DoWhy

During my PhD, I believed advanced statistics belonged to specialized languages like R
or Stata. I'm thinking of topics from the later chapters of
[_Microeconometrics Using Stata_](https://www.stata.com/bookstore/microeconometrics-stata/)
by A. Colin Cameron and Pravin K. Trivedi — multinomial models (Chapter 18),
evaluation of RCTs (Chapters 24–25), and the like.

Turns out Python does offer a package for causal identification:
[DoWhy](https://www.pywhy.org/dowhy/). It models cause-effect relationships with
explicit assumptions, separates identification from estimation, and can auto-validate
its assumptions. It could solve my issues for those later chapters.

I still haven't taken the time to go deeper into causal inference, and DoWhy adds to
the resources I want to try when I take that leap. Another relevant source is
[_Causal Inference: The Mixtape_](https://mixtape.scunning.com/) by Scott Cunningham.
