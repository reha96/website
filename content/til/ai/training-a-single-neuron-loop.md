---
title: "Training a neuron is a two-step heartbeat: predict, then correct"
date: "2026-08-06"
tags: ["machine-learning", "neural-networks", "forward-propagation", "learning-rate", "python"]
---

# Training a neuron is a two-step heartbeat: predict, then correct

In the DLH machine-learning curriculum I built a `Neuron` class in NumPy that classifies MNIST digits: it takes an image's pixels as inputs **X**, weighs them (**W**), adds a bias (**b**), and outputs a probability **A** that the input is the target digit. Everything before training was a single step: forward (predict), cost (score), gradient_descent (one nudge of W and b). One nudge is nothing — from the task-5 test, one pass moved the cost from 5.41 to 4.79. Train is the loop that repeats that nudge `iterations` times so the neuron genuinely converges. The same predict-then-correct heartbeat is the skeleton of every training run in deep learning:

```python
for i in range(iterations):
    A = self.forward_prop(X)      # predict with the *current* weights
    self.gradient_descent(X, Y, A) # one nudge
```

## The loop is the learning

Each iteration is forward → gradient_descent, over and over, with W and b accumulating corrections the whole way. `train` permanently changes the neuron: after it returns, `__W` and `__b` hold the trained values — the neuron *is* the model now.

## The one real trap: stale predictions

`gradient_descent` needs the predictions *matching the current W* — the residual A − Y must be the error of the exact weights being updated. If you reused an old A, you'd be correcting this round's weights with last round's mistakes — walking downhill on stale terrain. That's why the loop body is precisely: predict, then step. (One reference repo I saw called `evaluate` inside every iteration, computing cost + thresholding 12,665 predictions × 5000 times — pure waste, and the auto-grader has a time budget.)

## Reading the cost curve

The printed cost curve is the debugging instrument of all of deep learning:

- Cost falling smoothly → learning rate right
- Cost flat from the start → α too small, or a dead neuron (never updates)
- Cost jumping up or NaN → α too big, overshooting the bowl

## Questions that made it click

**"What is the m dimension here?"** — m is the number of training examples, one per column: X is (nx, m) with nx = number of input features, Y and A are (1, m). The sum runs over all m columns and /m turns it into the average penalty per example.

**"Why A = self.forward_prop(X) at every iteration?"** — W and b change every iteration, and A is a function of them. Iteration 2 must correct the *new* weights using the *new* weights' mistakes, not the old ones'. Gradient descent is "look at the local slope where you stand, step, look again, step."

**"What about evaluate?"** — Threshold at 0.5: A ≥ 0.5 ⟺ z ≥ 0, so the decision boundary is just "is the weighted sum W·X + b positive?" Cost is computed on the soft A before thresholding — a prediction of 1 with A = 0.51 is right but barely, and the cost still records a small penalty so training can push confidence up.

The same single-neuron recipe, stacked twice, is what makes a [neural network](/til/ai/neural-network-hidden-layer-shapes) — and the "nudge" itself is [gradient descent](/til/ai/gradient-descent-mental-model), scored by the [cross-entropy cost](/til/ai/cross-entropy-cost-intuition).
