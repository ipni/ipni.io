---
title: "ExtendedProvider"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  docs:
    parent: "advertisement"
    identifier: "extendedprovider"
weight: 340
toc: true
---

The `ExtendedProvider` field allows for specification of provider families, in cases where a
provider operates multiple PeerIDs, perhaps with different transport protocols between them, but
over the same database of content.

```ipldsch
type ExtendedProvider struct {
    Providers [Provider]
    Override bool
}

type Provider struct {
    ID String
    Addresses [String]
    Metadata optional Bytes
    Signature Bytes
}
```

* If `Metadata` is not specified for a `Provider`, the metadata from the
  encapsulating  `Advertisement` will be used instead.
  * If `Metadata` in encapsulating advertisement is not specified, the extended provider record
    is treated as address update only.
* If `Addresses` are not specified, the record will be skipped and has no effect.
* If a `Provider` listing is written with no `ContextID`, those peers will be returned for all
  advertisements published by the publisher.
  * If `Override` is set on an `ExtendedProvider` entry on an advertisement with a `ContextID`, it
    indicates that any specified chain-level set of providers should not be returned for that
    context ID. `Providers` will be returned Instead.
  * If `Override` is not set on an entry for an advertisement with a `ContextID`, it will be
    combined as a union with any chain-level `ExtendedProvider`s (Addresses, Metadata).
  * If `Override` is set on `ExtendedProvider` for an advertisement without a `ContextID`, the
    entry is invalid and should be ignored.
* The `Signature` for each of the `Providers` within an `ExtendedProvider` is signed by their
  corresponding private key.
  * The full advertisement object is serialized, with all instances of `Signature` replaced with
    an empty array of bytes.
  * This serialization is then hashed, and the hash is then signed.
  * The `Provider` from the encapsulating advertisement must be present in the `Providers` of
    the `ExtendedProvider` object, and must sign in this way as well. It may omit `Metadata`
    and `Addresses` if they match the values already set at the encapsulating advertisement.
    However, `Signature` must be present.
* Note: the `Signature` of the top level `Advertisement` is calculated as before - it should not
  include the `ExtendedProvider` field for backwards compatibility. The Additional secondary
  signature from the same `Provider` in `ExtendedProvider` ensures integrity over the full message.
