---
title: "Class and Instance Attributes in Python — How __dict__ Ties It All Together"
date: "2026-05-28"
slug: "python-class-instance-attributes"
tags: ["Python", "OOP", "Classes", "Attributes", "__dict__", "Programming"]
topic: "Python"
author: "Reha Tuncer"
---

# Class and Instance Attributes in Python — How `__dict__` Ties It All Together

> *A deep dive into the two kinds of attributes every Python developer must understand — what they are, how to create them the Pythonic way, how `__dict__` stores them, and when to use each.*

---

![Class vs Instance Attributes](/class-instance-attributes.svg)

*Diagram: Class attributes live in the class's `__dict__` and are shared by all instances. Instance attributes live in each instance's own `__dict__` and are unique per object. When you access `obj.something`, Python checks the instance `__dict__` first, then falls back to the class `__dict__`.*

---

## What's a Class Attribute?

A **class attribute** is a variable defined directly in the class body — outside any method. It belongs to the class itself and is **shared by all instances** of that class.

```python
class Dog:
    species = "Canis familiaris"  # Class attribute — shared by all dogs

    def __init__(self, name):
        self.name = name          # Instance attribute — unique per dog

dog1 = Dog("Rex")
dog2 = Dog("Bella")

print(dog1.species)  # "Canis familiaris"
print(dog2.species)  # "Canis familiaris"
print(Dog.species)   # "Canis familiaris" — accessible from the class too
```

Key properties:
- Defined **once** in the class body (outside methods)
- **Shared** — changing it via the class affects all instances that haven't overridden it
- Accessible via `ClassName.attr` or `instance.attr`
- Stored in `ClassName.__dict__`

---

## What's an Instance Attribute?

An **instance attribute** is a variable bound to a specific instance — typically created inside `__init__` via `self`. It is **unique to each object**.

```python
class Dog:
    def __init__(self, name, age):
        self.name = name   # Instance attribute — unique per dog
        self.age = age     # Instance attribute — unique per dog

dog1 = Dog("Rex", 3)
dog2 = Dog("Bella", 5)

print(dog1.name)  # "Rex"
print(dog2.name)  # "Bella" — different!
```

Key properties:
- Created via `self.attr = value` (usually in `__init__`)
- **Unique** per instance — each object has its own copy
- Accessible only via `instance.attr`
- Stored in `instance.__dict__`

---

## The Pythonic Way to Create Attributes

### Class Attributes — The Pythonic Way

```python
class Rectangle:
    number_of_instances = 0       # Class-level counter — shared state
    print_symbol = "#"            # Class-level configuration — shared default

    def __init__(self, width, height):
        type(self).number_of_instances += 1  # Use type(self), not Rectangle
        self.__width = width
        self.__height = height
```

**Rule of thumb:** Use class attributes for:
- Constants shared by all instances (e.g., `species`, `print_symbol`)
- Counters tracking class-level state (e.g., `number_of_instances`)
- Default configuration values

**Always** access/modify class attributes with `ClassName.attr` or `type(self).attr` for clarity.

### Instance Attributes — The Pythonic Way

```python
class Rectangle:
    def __init__(self, width=0, height=0):
        self.width = width    # Instance attribute — unique per rectangle
        self.height = height  # Instance attribute — unique per rectangle
```

**Rule of thumb:** Every piece of data that differs between instances goes in `__init__` via `self`. This is the one true Pythonic place for instance attributes.

### Dynamic Attribute Creation (Know It Exists, Use Sparingly)

Python lets you attach arbitrary attributes to instances at runtime:

```python
obj = Rectangle(4, 5)
obj.color = "blue"       # Dynamically created instance attribute
obj.__dict__["area"] = 20  # Direct __dict__ manipulation (not recommended)
```

This is powerful but **not Pythonic** for normal code — it defeats static analysis, makes code harder to reason about, and is error-prone. Use it only when the problem genuinely requires dynamic attribute creation (e.g., ORMs, proxies).

---

## Differences Between Class and Instance Attributes

| Aspect | Class Attribute | Instance Attribute |
|--------|----------------|-------------------|
| **Defined in** | Class body (outside methods) | Inside `__init__` via `self` |
| **Owned by** | The class | The instance |
| **Shared?** | Yes — all instances see the same value | No — each instance has its own copy |
| **Stored in** | `ClassName.__dict__` | `instance.__dict__` |
| **Access via class** | ✅ `ClassName.attr` | ❌ AttributeError |
| **Access via instance** | ✅ Falls back from instance → class | ✅ Direct |
| **Mutability risk** | Mutable class attrs shared by all (beware!) | No sharing risk |
| **Lookup order** | Checked second (after instance) | Checked first |

---

## Advantages and Drawbacks

### Class Attributes

**Advantages:**
- Single source of truth — update once, affects all
- Memory efficient — one copy, not N copies
- Great for defaults, configuration, and counters

**Drawbacks:**
- **Mutable class attributes are a footgun:**

```python
class Team:
    members = []  # ❌ BAD: mutable class attribute — shared list!

t1 = Team()
t2 = Team()
t1.members.append("Alice")
print(t2.members)  # ["Alice"] — t2 sees t1's change! unintended sharing
```

- Changes affect ALL instances (unless overridden) — can cause surprising bugs
- Harder to reason about in large codebases

### Instance Attributes

**Advantages:**
- No sharing risk — each instance is independent
- Easy to reason about — data is local to the object
- The Pythonic default for most data

**Drawbacks:**
- Memory overhead if every instance holds identical data (use class attrs instead)
- Must be initialized in `__init__` for every instance

---

## How Python Uses `__dict__` for Attribute Storage

Every Python object (including classes themselves) has a `__dict__` attribute — a dictionary that stores all **writable** attributes.

### Instance `__dict__`

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

r = Rectangle(4, 5)

print(r.__dict__)  # {'width': 4, 'height': 5}
```

Every `self.attr = value` literally inserts a key-value pair into `r.__dict__`.

### Class `__dict__`

```python
class Rectangle:
    number_of_instances = 0
    print_symbol = "#"

    def __init__(self, width, height):
        self.width = width
        self.height = height

print(Rectangle.__dict__)
# {
#     'number_of_instances': 0,
#     'print_symbol': '#',
#     '__init__': <function ...>,
#     '__dict__': <attribute ...>,
#     '__doc__': None,
#     '__module__': '__main__',
#     '__weakref__': <attribute ...>
# }
```

Class `__dict__` contains class attributes, methods, and special dunder attributes. It's a `mappingproxy` — read-only from outside.

### The Attribute Lookup Chain

When you write `obj.attr`, Python follows this exact sequence:

```
1. Check obj.__dict__         → Instance attribute found? Return it.
2. Check type(obj).__dict__   → Class attribute found? Return it.
3. Walk MRO (base classes)    → Found in parent's __dict__? Return it.
4. AttributeError              → Not found anywhere.
```

```python
class Animal:
    kingdom = "Animalia"       # In Animal.__dict__

class Dog(Animal):
    species = "Canis familiaris"  # In Dog.__dict__

    def __init__(self, name):
        self.name = name       # In dog_instance.__dict__

dog = Dog("Rex")

# Lookup chain for dog.name:
#   1. dog.__dict__ → {'name': 'Rex'}  FOUND! ✅
#   2. (class __dict__ not checked — already found)

# Lookup chain for dog.species:
#   1. dog.__dict__ → {'name': 'Rex'}  Not found
#   2. Dog.__dict__ → species: 'Canis familiaris'  FOUND! ✅

# Lookup chain for dog.kingdom:
#   1. dog.__dict__ → Not found
#   2. Dog.__dict__ → Not found
#   3. Animal.__dict__ → kingdom: 'Animalia'  FOUND! ✅ (via MRO)
```

This explains the mutable-class-attribute footgun:

```python
dog.__dict__["name"] = "Buddy"   # Changes only this instance ✅
Dog.__dict__["species"] # This is a mappingproxy — can't write directly

# But if species were a mutable list:
# Dog.species_list.append("wolf") would modify the shared list!
```

### Using `getattr` for Safe Attribute Access

```python
r = Rectangle(4, 5)

# Direct access — crashes if missing
width = r.width  # OK

# Safe access with default fallback
area = getattr(r, 'area', None)  # Returns None if 'area' doesn't exist
color = getattr(r, 'color', 'unknown')  # Returns 'unknown'

# Check existence
if hasattr(r, 'area'):
    print(r.area)
```

`getattr(obj, name, default)` traverses the same lookup chain but never raises `AttributeError` — it returns `default` instead.

---

## Summary: When to Use What

| Scenario | Use | Example |
|----------|-----|---------|
| Data unique per instance | Instance attribute | `self.name`, `self.width` |
| Constant shared by all | Class attribute | `species = "Canis familiaris"` |
| Counter/tracker | Class attribute | `number_of_instances = 0` |
| Default configuration | Class attribute | `print_symbol = "#"` |
| Mutable shared state | Instance attribute (avoid mutable class attrs!) | `self.items = []` in `__init__` |

> **The golden rule:** If the value should differ between instances, it's an instance attribute. If it should be the same for all instances (or tracked at the class level), it's a class attribute. When in doubt, use an instance attribute — it's safer and more Pythonic.

---

*This post is part of the [Python — More Classes and Objects](https://github.com/reha96/dlh-higher_level_programming/tree/main/python-more_classes) project.*
