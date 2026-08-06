---
title: "A neural network is your single neuron, stacked twice — the shapes tell the story"
date: "2026-08-06"
tags: ["neural-networks", "hidden-layer", "machine-learning", "deep-learning", "numpy"]
---

# A neural network is your single neuron, stacked twice — the shapes tell the story

After building a single neuron from scratch in NumPy for the DLH machine-learning curriculum, the next step was the jump that gives "deep" learning its name: stacking two layers instead of one. We were classifying MNIST — handwritten-digit images, 784 pixels each — and a single neuron could only draw one straight line between two classes. This TIL is what made the hidden layer click for me: the shapes of the weight matrices tell the whole story.

A single neuron takes many inputs, weighs them, and outputs a number between 0 and 1 — "probability the input belongs to class 1" (the target digit we're detecting). Each input xᵢ is multiplied by its weight wᵢ, summed, and the bias b shifts the result: z = Σ wᵢxᵢ + b. The sigmoid — the S-curve that squeezes z into (0, 1) — gives A = 1/(1+e⁻ᶻ).

## Two stages, two weight matrices

A neural network with a hidden layer is the same recipe applied twice:

```
X → Z1 = W1·X + b1 → A1 = σ(Z1) → Z2 = W2·A1 + b2 → A2 = σ(Z2)
```

The shapes tell the whole story:

```
W1: (nodes, nx)   — nx = input features (784 here); one row per hidden neuron; each is a miniature classifier
b1: (nodes, 1)    — one bias per hidden neuron (a column vector, not a scalar)
W2: (1, nodes)    — the output neuron's weights, one per hidden activation
A2: (1, m)        — final predictions, m = number of examples
```

With 784 features (MNIST), a 3-node network has 3 hidden "experts", each with 784 weights — that's 3×784 = 2,352 weights for the hidden layer vs 784 for the single neuron. The hidden layer reads the raw pixels; the output neuron reads the hidden layer's verdicts.

## Why a hidden layer is worth the trouble

A single neuron draws one straight decision boundary in pixel space — it can only separate two classes with one line. A hidden layer learns many local opinions (each node a boundary fragment), and the output neuron combines them into a more flexible boundary. That's the qualitative jump: the network can now approximate curved class regions.

## The same recipe, doubled

| | Single neuron | Neural network |
|---|---|---|
| Params | nx | nx **and** nodes |
| Attributes | W, b, A | W1, b1, A1 **and** W2, b2, A2 |
| Weights | 1 vector (1, nx) | 2 matrices: W1 (nodes, nx) + W2 (1, nodes) |
| Bias | scalar 0 | b1 (nodes, 1) + scalar b2 |

Not a new concept — a doubled one, with the hidden layer's parameters upgraded from vectors to matrices so they can serve many neurons at once.

## Questions that made it click

**"What's the difference between this init and the earlier single-neuron one?"** — Same recipe — validate, then initialize — applied to a bigger organism. The only real difference is that the hidden layer's parameters are matrices instead of vectors.

**"Can I write np.argmax(np.where(A >= 0.5), 1)?"** — No — that's malformed. Argmax is for multi-class decisions ("which of 10 classes wins?"), which comes later in this project. With one output, the threshold at 0.5 *is* the decision.

**"What does astype(int) achieve?"** — It casts booleans to 0/1 integers — a cast, not a computation. Prediction "≥ 0.5 → 1" becomes a numeric label you can compare against Y.

This two-stage network is the [single neuron's training loop](/til/ai/training-a-single-neuron-loop) applied to a bigger organism — and it learns with the same [gradient descent](/til/ai/gradient-descent-mental-model) and [cross-entropy cost](/til/ai/cross-entropy-cost-intuition).
