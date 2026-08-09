---
title: "Gradient descent is just walking downhill — and why (A − Y) is enough"
date: "2026-08-06"
tags: ["gradient-descent", "machine-learning", "optimization", "algorithm", "numpy"]
---

# Gradient descent is just walking downhill — and why (A − Y) is enough

The DLH machine-learning curriculum had me build a single neuron from scratch in NumPy — classifying MNIST handwritten digits, the same project as my [training loop](/til/ai/training-a-single-neuron-loop) TIL. I kept hearing "gradient descent" as the magic that makes models learn; this TIL is the intuition that finally made it click. Gradient descent matters beyond the toy: it is the same optimizer behind every neural network, up to the LLMs training on next-word prediction.

The neuron has two knobs — **W**, its weights, and **b**, its bias. Cost measures how wrong the current knob setting is (against the true labels **Y**, given the predictions **A** on inputs **X**). There's no formula that solves for the best W and b directly — so we *walk* downhill: from where we are, figure out which way the cost surface slopes down, take a small step, repeat. That's gradient descent, and it's the entire learning of a neuron.

## The gradient is a slope per weight

For each weight wᵢ, ∂C/∂wᵢ is the slope of the cost along that weight: positive means cost rises as wᵢ grows, negative means it falls. Stacked, that's the gradient vector — it points in the direction of *steepest ascent*. To learn, you step in the *opposite* direction: `W ← W − α·gradient`.

## The beautiful simplification — why (A − Y) is enough

The naive path would be painful: cross-entropy (the cost function that scores predictions, see my [cross-entropy TIL](/til/ai/cross-entropy-cost-intuition)) has logs, and the sigmoid has its own nonlinearity. But it collapses. The derivative of the cost with respect to the weights comes out to:

```python
m = X.shape[1]                   # m = number of training examples
dz = A - Y                       # A = prediction, Y = true label; signed mistake
dW = (1 / m) * np.matmul(dz, X.T)            # avg of (mistake × input)
db = (1 / m) * np.sum(dz)                    # avg mistake
self.__W -= alpha * dW           # alpha = learning rate (step size)
self.__b -= alpha * db
```

The logs and the sigmoid *cancel each other*: σ′(z) = σ(z)(1−σ(z)), and the cross-entropy denominator 1/(A(1−A)) exactly undoes it. All that survives is the residual — how far off the prediction was, times the input. The two hardest parts of the math eat each other, and gradient descent becomes the "error × input" rule.

Reading the rule in plain words: A − Y is positive when the neuron over-predicted, negative when it under-predicted. A weight whose input was bright when the model over-predicted gets pushed down; dim pixels barely move. The bias update is just the average mistake.

## Why α exists

The step must be small enough not to overshoot the bottom of the bowl, large enough to learn quickly. α = 0.05 is the default — tiny steps, repeated. One pass dropped my cost from 5.41 to 4.79; the loop makes that add up (see my [training loop TIL](/til/ai/training-a-single-neuron-loop), and how the same two-stage story grows into a [neural network](/til/ai/neural-network-hidden-layer-shapes)).

## Questions that made it click

**"Why do we have − 1/m?"** — Two separate jobs: the minus flips the sign, the 1/m averages. The full story (and why you'd otherwise retune the learning rate for every dataset size) is in my [cross-entropy TIL](/til/ai/cross-entropy-cost-intuition).

**"Why recompute A every iteration?"** — Because W and b change *every* iteration, and A is a function of them — reuse an old A and you correct new weights with last round's mistakes (the stale-terrain trap from my [training loop TIL](/til/ai/training-a-single-neuron-loop)). Each stale step is barely harmful (α is tiny), but you run thousands of them.

**"normal(loc=0, scale=1) vs standard_normal?"** — Distributionally identical; the auto-grader can't compare random values, only shape and distributional properties. Pick either.
