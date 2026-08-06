---
title: "Why cross-entropy, and what −1/m is really doing"
date: "2026-08-06"
tags: ["machine-learning", "logistic-regression", "cross-entropy", "cost-function", "gradient-descent"]
---

# Why cross-entropy, and what −1/m is really doing

While building a single neuron from scratch in NumPy for the DLH machine-learning curriculum (classifying MNIST handwritten digits), I had to answer the question every ML beginner meets: how do you score a prediction? The answer is a cost function — one number saying how wrong the model is overall. Cross-entropy is the standard choice for classification: it is what logistic regression (the neuron's official name) uses, what neural networks use, and, generalized, what LLMs use when they train on next-word prediction. This TIL is the intuition that made it click for me, and what the −1/m in the formula is really doing.

After forward propagation — running inputs through the neuron to get predictions — you have A, the prediction, one value per example, each in (0, 1) — and Y, the truth, each 0 or 1. The cost is a single number that says how wrong the model is overall. It's the number gradient descent (see my [gradient descent TIL](/til/ai/gradient-descent-mental-model)) pushes toward 0, so it must be smooth and slope "downhill" no matter where we are.

## Why not mean-squared-error

With a sigmoid output — the S-curve that squeezes a weighted sum into a probability — squared error (mean-squared-error, MSE) gives a wobbly surface: far from the answer the curve flattens and learning crawls; near the answer it can get stuck. Cross-entropy avoids both — one clean bowl shape — and it falls out of the probabilistic reading of A ("the neuron says: probability the input is class 1 = A").

## Surprise, one example at a time

- Truth Y=1: penalty = −log(A). A→1 ⇒ penalty→0 (confident, correct); A→0 ⇒ penalty→∞ (confident, wrong).
- Truth Y=0: mirror image, penalty = −log(1−A).
- One formula picks the right branch automatically:

```python
m = Y.shape[1]
cost = -(1/m) * np.sum(Y * np.log(A) + (1 - Y) * np.log(1.0000001 - A))
```

−log(p) is the *surprise* of an event with predicted probability p. Average surprise over the data is the negative log-likelihood of a Bernoulli model — minimizing cost maximizes the probability the model assigns to the true labels. That's the deep reason logistic regression "believes" its outputs.

## The minus and the 1/m are two separate jobs

The raw penalty is always ≤ 0 — log of a number in (0, 1] is never positive — so the sum grows *more negative* as the model gets worse. The minus flips it: "lower cost = better model." The 1/m turns the sum into the average penalty per example. Without it, training on twice as many examples reports twice the cost for the same model quality, and the gradient (1/m)·Σ(…) doubles with dataset size — you'd have to retune the learning rate every time.

## The log(0) trap

A = σ(z) — the sigmoid of the weighted sum z — can be virtually 1 (z = 40 ⇒ A = 1 − 4×10⁻¹⁸), so log(1−A) would take the log of something that rounds to exactly 0 ⇒ −∞. The `1.0000001 − A` keeps the log's input off zero: the penalty stays huge but finite. I met this trap earlier as a typo — `1/(1+np.log(-z))` instead of `np.exp` — which spattered `nan` across the output with `RuntimeWarning: invalid value encountered in log`.

Two more anchors from the session: cost is scored on the *soft* A before thresholding — a "right" prediction of 1 with A = 0.51 still records a small penalty, so training can tell "barely right" from "utterly confident." And the numbers: A = 0.5 everywhere ⇒ cost ≈ 0.6931 (log 2, one bit of uncertainty); one gradient pass took my cost 5.41 → 4.79.

## Questions that made it click

**"What is the m dimension here?"** — m is the number of training examples, one per column: X is (nx, m), Y and A are (1, m). The sum runs over all m columns and /m turns it into the average penalty per example — cost 0.5 means "each example costs 0.5 units of surprise."

**"Why do we have − 1/m?"** — the minus flips the always-negative penalty sum so minimization means improvement; the 1/m averages so the number is comparable across dataset sizes and the gradient keeps the same scale regardless of batch size.

**"Do my comments capture the operation?"** — not quite: m is the *number of examples*, not "dims for later regularization" (there is no regularization here), and only one branch uses log(1−A) — Y ∈ {0,1} picks the branch per example.

This cost function is what the [gradient descent TIL](/til/ai/gradient-descent-mental-model) differentiates to learn, inside the [training loop TIL](/til/ai/training-a-single-neuron-loop), for a neuron that becomes a [neural network](/til/ai/neural-network-hidden-layer-shapes).
