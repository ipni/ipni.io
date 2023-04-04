---
title: "Metadata"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  docs:
    parent: "advertisement"
    identifier: "metadata"
weight: 330
toc: true
---

The reference provider currently supports Bitswap and Filecoin protocols. The structure of the
metadata format for these protocols is defined
in [the library](https://github.com/filecoin-project/index-provider/tree/main/metadata).

The network indexer nodes expect that metadata begins with a `uvarint` identifying the protocol,
followed by protocol-specific metadata. This may be repeated for additional supported protocols.
Specified protocols are expected to be ordered in increasing order.

* Bitswap
  * `uvarint`
    protocol `0x0900` ([`TransportBitswap`](https://github.com/multiformats/multicodec/blob/master/table.csv#L133)
    in the multicodec table).
  * no following metadata.
* filecoin graphsync
  * `uvarint`
    protocol `0x0910`  ([`TransportGraphsyncFilecoinv1`](https://github.com/multiformats/multicodec/blob/master/table.csv#L134)
    in the multicodec table).
  * the following bytes should be a cbor encoded struct of:
    * PieceCID, a link
    * VerifiedDeal, boolean
    * FastRetrieval, boolean
* http
  * the proposed `uvarint` protocol is `0x3D0000`.
  * the following bytes are not yet defined.

If the `Metadata` field is not specified, the advertisement is treated as address update only.

