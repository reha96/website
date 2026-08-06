---
title: "Gradient descent is just walking downhill — and why (A − Y) is enough"
date: "2026-08-06"
tags: ["gradient-descent", "machine-learning", "optimization", "algorithm", "numpy"]
---

# Gradient descent is just walking downhill — and why (A − Y) is enough

The neuron has two knobs, W and b. Cost measures how wrong the current knob setting is. There's no formula that solves for the best W and b directly — so we *walk* downhill: from where we are, figure out which way the cost surface slopes down, take a small step, repeat. That's gradient descent, and it's the entire learning of a neuron.

## The gradient is a slope per weight

For each weight wᵢ, ∂C/∂wᵢ is the slope of the cost along that weight: positive means cost rises as wᵢ grows, negative means it falls. Stacked, that's the gradient vector — it points in the direction of *steepest ascent*. To learn, you step in the *opposite* direction: `W ← W − α·gradient`.

## The beautiful simplification — why (A − Y) is enough

The naive path would be painful: cross-entropy has logs, and the sigmoid has its own nonlinearity. But it collapses. The derivative of the cost w.r.t. the weights comes out to:

```python
m = X.shape[1]
dz = A - Y                                   # signed mistake per example
dW = (1 / m) * np.matmul(dz, X.T)            # avg of (mistake × input)
db = (1 / m) * np.sum(dz)                    # avg mistake
self.__W -= alpha * dW
self.__b -= alpha * db
```

The logs and the sigmoid *cancel each other*: σ′(z) = σ(z)(1−σ(z)), and the cross-entropy denominator 1/(A(1−A)) exactly undoes it. All that survives is the residual — how far off the prediction was, times the input. The two hardest parts of the math eat each other, and gradient descent becomes the "error × input" rule.

Reading the rule in plain words: A − Y is positive when the neuron over-predicted, negative when it under-predicted. A weight whose input was bright when the model over-predicted gets pushed down; dim pixels barely move. The bias update is just the average mistake.

## Why α exists

The step must be small enough not to overshoot the bottom of the bowl, large enough to learn quickly. α = 0.05 is the default — tiny steps, repeated. One pass dropped my cost from 5.41 to 4.79; the loop makes that add up.

## Questions that made it click

**"Why do we have − 1/m?"** — Two jobs. The minus: log of a number in (0,1] is never positive, so the raw penalty sum is negative; the minus flips it so "lower cost = better model." The 1/m: it turns the sum into the average penalty per example, so the gradient stays the same scale regardless of dataset size — without it, doubling your data would double the gradient and you'd retune the learning rate every time.

**"Why recompute A every iteration?"** — Because W and b change *every* iteration, and A is a function of them. Reusing a stale A means correcting this round's weights with last round's mistakes — walking downhill on stale terrain. Each stale step is barely harmful (α is tiny), but you run thousands of them.

**"normal(loc=0, scale=1) vs standard_normal?"** — Distributionally identical; the checker can't compare random values, only shape and distributional properties. Pick either.
