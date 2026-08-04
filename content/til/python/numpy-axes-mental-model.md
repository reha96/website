---
title: "Understanding NumPy axes as bracket nesting depth"
date: "2026-07-28"
tags: ["numpy", "python", "axes", "kmeans"]
---

# Understanding NumPy axes as bracket nesting depth

Think of **axes as nesting depth** in a sequence of brackets.

An array `(n, k, d)` is like:

```
[                       # axis 0 (n items)
  [                     # axis 1 (k items per n)
    [..., ..., ...],    # axis 2 (d items per k per n)
    ...
  ],
  ...
]
```

`sum(axis=i)` **collapses that level, removing it.** The axis number is just the bracket depth you're closing.

## Your bug in this language

**Old code (wrong):**
```python
(diffs ** 2)          # (n, k, d)
    .min(axis=1)      # (n, d)  — collapsed k, kept d alive
    .sum()            # scalar
```

Collapsing `k` before `d` removes the "which centroid" level while keeping individual dimensions alive. The mix doesn't correspond to any real centroid.

**The fix:**
```python
(diffs ** 2)          # (n, k, d)
    .sum(axis=2)      # (n, k)  — full distance per centroid
    .min(axis=1)      # (n,)    — pick the best centroid
    .sum()            # scalar
```

Collapse **inward from right to left**: `d` first to get real distances, then `k` to pick the best, then `sum` for the total.

## Quick intuition builder

For any array, `sum(axis=i)` answers "what does the data look like if I collapse level i into a total?"

- `sum(axis=0)` — collapse rows → column totals
- `sum(axis=1)` — collapse columns → row totals
- `sum(axis=(0,1))` — collapse both → grand total
