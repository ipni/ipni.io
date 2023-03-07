---
title: "Advertisements"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  docs:
    parent: "advertisement"
    identifier: "advertisements"
weight: 310
toc: true
---

An Advertisement is represented as an IPLD node with the following schema:

```ipldch
type Advertisement struct {
    PreviousID optional Link
    Provider String
    Addresses [String]
    Signature Bytes
    Entries Link
    ContextID Bytes
    Metadata Bytes
    IsRm Bool
    ExtendedProvider optional ExtendedProvider
}
```

* **`PreviousID`** is the CID of the previous advertisement, and is empty for the 'genesis'.
* **`Provider`** is the `peer.ID` of the libp2p host providing the content.
* **`Addresses`** are the multiaddrs to provide to clients in order to connect to the provider.
    * The provider addresses in the indexer are always updated by the latest advertisement received.
* **`Entries`** is a link to a data structure that contains the advertised multihashes.
* **`ContextID`** is an identifier used to subsequently update or delete an advertisement. It has
  the following semantics:
    * If a ContextID is used with different entries, those entries will be _added_ to the
      association with that ContextID
    * If a ContextID is used with different metadata, all previous CIDs advertised under that
      ContextID will have their metadata updated to the most recent.
    * If a ContextID is used with the `IsRm` flag set, all previous CIDs advertised under that
      ContextID will be removed.
* **`Metadata`** represents additional opaque data that is returned in client query responses for
  any of the CIDs in this advertisement. It is expected to start with a `varint` indicating the
  remaining format of metadata. The opaque data is send to the provider when retrieving content for
  the provider to use to retrieve the content. Storetheindex operators may limit the length of this
  field, and it is recommended to keep it below 100 bytes.
* **`ExtendedProvider`** is an optional field; if specified, indexers which understand
  the `ExtendedProvider` extension should ignore the `Provider`, `Addresses`, and `Metadata`
  specified in the advertisement in favor of those specified in the `ExtendedProvider`. The values
  in the direct advertisement should still be set to a compatible endpoint for content routers that
  do not understand full `ExtendedProvider` semantics.
    * `Extendedprovider` is not valid for an `IsRm` advertisement. It should be ignored if
      specified.

> **TODO**: Add correct PNG graph
![index-ad-ipld-graph](resources/index-ad-ipld-graph.png)

Multihash data is “paginated” by downloading blocks (chunks) of multihashes. These chunks are linked
together using IPLD links.
