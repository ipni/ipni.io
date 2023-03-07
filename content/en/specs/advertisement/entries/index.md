---
title: "Entries"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  docs:
    parent: "advertisement"
    identifier: "entries"
weight: 320
toc: true
---

The Entries data structure can be one of the following:

* an interlinked chain of `EntryChunk` nodes, or
* an [IPLD HAMT ADL](https://ipld.io/specs/advanced-data-layouts/hamt/spec), where the keys in the
  map represent the multihashes and the values are simply set to true.

### `EntryChunk` Chain

The `EntryChunk` chain is defined as the following schema:

```
type EntryChunk struct {
    Entries [Bytes]
    Next optional Link
}
```

The primary `Entries` list is the array of multihashes in the advertisement.
If an advertisement has more CIDs than fit into a single block for purposes of data transfer, they
may be split into multiple chunks, conceptually a linked list, by using `Next` as a reference to the
next chunk.

In terms of concrete constraints, each `EntryChunk` should stay below 4MB,
and a linked list of entry chunks should be no more than 400 chunks long. Above these constraints,
the list of entries should be split into multiple advertisements. Practically, this means that each
individual advertisement can hold up to approximately 40 million multihashes.

### HAMT

The HAMT must follow the IPLD specification
of [HAMT ADL](https://ipld.io/specs/advanced-data-layouts/hamt/spec).
The HAMT data structure
is [used as a set](https://ipld.io/specs/advanced-data-layouts/hamt/spec/#use-as-a-set) to capture
the list of multihashes being advertised.
This is where the keys in the HAMT represent the multihashes being advertised, and the values are
simply set to `true`.
