---
title: "What is Keras, and how is a single neuron different from OLS?"
date: "2026-08-12"
tags: ["machine-learning", "keras", "tensorflow", "neural-networks", "regression", "gradient-descent", "ols"]
---

# What is Keras, and how is a single neuron different from OLS?

**TL;DR:** Keras is the high-level API for building and training neural networks — not a universal machine-learning API. Regression is a *task type*, not a model kind: the same Keras machinery does it, with only the output head and the loss swapped. A single linear neuron (a `Dense` layer) trained with mean squared error converges to the **same optimum as OLS** — the two differ only in route: closed form in one step versus iterative gradient descent.

## What problem led here

I just finished my first Keras model: MNIST digit classification — 784 input features, 256-256-10 layers, softmax output, categorical crossentropy, Adam optimizer. Then I noticed the same framework does regression, and my mental model quietly broke: I had filed Keras under "classification tools." This TIL is the walk from that wrong file drawer to the actual shape of things.

## The landscape: who owns what

The Python ML stack isn't one library — it's a grid of tools with separate jobs:

| Library | Job | Example |
|---|---|---|
| numpy | raw array math | `np.matmul`, broadcasting |
| scipy | scientific and statistical functions | distributions, linear algebra |
| scikit-learn | classical machine learning | `LinearRegression`, k-means, decision trees, SVMs |
| TensorFlow | the compute engine: tensors, automatic differentiation, GPU | backpropagation, `tf.convert_to_tensor` |
| Keras | high-level neural-network API on top of TensorFlow | `keras.Sequential`, `Dense`, `fit` |

The correction: Keras does **not** unify these — it is one cell in the grid, and its overlap with sklearn is ergonomics, not scope.

## Keras does regression too — regression is a task type, not a model kind

My mistake was thinking "Keras model" = classification. The `Dense`-stack machinery is task-agnostic; you change only the **head** (the output layer) and the **loss**:

| | Regression | Classification |
|---|---|---|
| Output layer | `Dense(1)`, no activation | `Dense(10, activation="softmax")` |
| Loss | `mean_squared_error`, `mean_absolute_error` | `categorical_crossentropy` |
| Metric | MAE, MSE | accuracy |
| Example target | house price, MPG | digit 0–9 |

Why does it *feel* universal? Keras borrowed sklearn's ergonomics deliberately — `fit` / `evaluate` / `predict` — the Keras README literally says "just like in the Scikit-Learn API." Same verbs, same cadence; behind the hood, different jobs.

## A single neuron = one linear model

No Keras background assumed: a **Dense layer** with one unit is one neuron. It computes a weighted sum plus a bias, `y = W·x + b`, optionally followed by an activation function. With **no activation**, a single linear neuron on a regression target *is* a linear regression model — same math, same model, only the training machinery differs.

## The click: Dense-on-MSE and OLS solve the same problem

A linear `Dense(1)` compiled with MSE minimizes **L(w, b) = (1/m) · Σ(yᵢ − w·xᵢ − b)²** — the exact objective of OLS. This quadratic has **one global minimum**, so both routes land on the same point when the neuron is fully trained:

- **OLS route (closed form):** ŵ = (XᵀX)⁻¹Xᵀy — one matrix inversion (or QR/SVD), exact in a single step, zero hyperparameters. The familiar friend from my econometrics years.
- **Keras route (iterative):** Adam — w ← w − α·m̂/√v̂ — thousands of small steps with a learning rate and the β₁/β₂ momentum hyperparameters. Approximate, converges to within tolerance, needs "long enough" training.

Both on the same toy problem:

```python
import numpy as np
from sklearn.linear_model import LinearRegression
import keras

X = np.linspace(0, 1, 100).reshape(-1, 1)   # one feature, 100 rows
y = 3 * X.ravel() + 1 + np.random.normal(0, 0.1, 100)

ols = LinearRegression().fit(X, y)          # closed form, one step

model = keras.Sequential([keras.layers.Dense(1)])   # one linear neuron
model.compile(optimizer="adam", loss="mean_squared_error")
model.fit(X, y, epochs=200, verbose=0)      # same loss, gradient steps

# both minimize (1/m)·Σ(yᵢ − w·xᵢ − b)² and converge to the same line
```

The true line is y = 3x + 1; both land near ŵ ≈ 3, b̂ ≈ 1.

## Why we need non-linearities (and why gradient descent is then the only way)

The closed form is the **exception**, not the rule: it exists only for linear models with MSE (and its ridge variant). Add `activation="tanh"` or a hidden layer and the loss stops being quadratic — the surface turns non-convex, no formula exists, and only iteration works. That's the entire reason neural networks train by [gradient descent](/til/ai/gradient-descent-mental-model) and backprop, and the reason a framework like Keras exists at all.

## Where they genuinely part ways

- **Early stopping:** OLS has no such concept; a 5-epoch Keras run simply lands short of the optimum.
- **Different loss:** compile with `mean_absolute_error` and the linear neuron converges to the conditional *median* (LAD regression) — something OLS, MSE by construction, cannot deliver.
- **Regularization:** L2 on the kernel ≈ ridge, ŵ = (XᵀX + λI)⁻¹Xᵀy, when fully converged — but Adam's implicit regularization is not ridge, so finite training drifts apart.
- **Activations:** any nonlinearity invalidates the closed form entirely.
- **Scale:** OLS needs the full dataset in memory and a matrix inversion (O(d³)); gradient steps stream data and cost O(m·d) per epoch.

## Tensor in one breath

A **tensor** is a numpy array plus superpowers: automatic differentiation (it remembers how it was computed, so gradients come free) and GPU/TPU placement. The real friction is interop — you convert explicitly, `tf.convert_to_tensor` / `tensor.numpy()` — which feeds the "numpy, but limited" myth. The correction: *more* capable, not less.

## Questions that made it click

**"To predict house prices, what loss and output activation would I use?"** — `mean_squared_error` or `mean_absolute_error`; `Dense(1)` with **no** activation, so any real value can come out. If the instinct is softmax, the task-type distinction isn't anchored yet.

**"Which `keras.layers` class fits a decision tree or k-means?"** — none exist. Those live in sklearn. That's the grid: task type × architecture — Keras owns neural networks for both task types, and sklearn owns the classical column.

**"What stays identical between the MNIST classifier and a regression network?"** — the hidden layers, the optimizer, the fit loop. Only the head and the loss change.
