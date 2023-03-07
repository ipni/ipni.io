---
title: "Advertisement Transfer"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  specs:
    parent: "advertisement_transfer"
    identifier: "advertisement_transfers"
weight: 410
toc: true
---

There are two ways that the provider advertisement chain can be made available for consumption by
indexer nodes.

1. As a [graphsync](https://github.com/ipfs/go-graphsync) endpoint on a libp2p host.
2. As a set of files fetched over HTTP.

There are two parts to the transfer protocol. The providing of the advertisement chain itself, and
a 'head' protocol for indexers to query the provider on what it's most recent advertisement is.

### Libp2p

On libp2p hosts, graphsync is used for providing the advertisement chain.

* Graphsync is configured on the common graphsync multiprotocol of the libp2p host.
* Requests for index advertisements can be identified by
  * The use of
    a ['dagsync'](https://github.com/filecoin-project/storetheindex/blob/main/dagsync/dtsync/voucher.go#L17-L24)
    voucher in the request.
  * A CID of either the most recent advertisement, or a a specific Entries pointer.
  * A selector either for the advertisement chain, or for an entries list.

A reference implementation of the core graphsync provider is available in
the [dagsync](https://github.com/filecoin-project/storetheindex/blob/main/dagsync) package, and it's
integration into a full provider is available
in [index-provider](https://github.com/filecoin-project/index-provider).

On these hosts, a custom `head` multiprotocol is exposed on the libp2p host as a way of learning the
most recent current advertisement.
The multiprotocol is
named [`/legs/head/<network-identifier>/<version>`](https://github.com/filecoin-project/storetheindex/blob/main/dagsync/p2p/protocol/head/head.go#L40)
. The protocol itself is implemented as an HTTP TCP stream, where a request is made for the `/head`
resource, and the response body contains the string representation of the root CID.

### HTTP

The IPLD objects of advertisements and entries are represented as files named as their CIDs in an
HTTP directory. These files are immutable, so can be safely cached or stored on CDNs.

The head protocol is the same as above, but not wrapped in a libp2p multiprotocol.
A client wanting to know the latest advertisement CID will ask for the file named `head` in the same
directory as the advertisements/entries, and will expect back
a [signed response](https://github.com/filecoin-project/storetheindex/blob/main/dagsync/httpsync/message.go#L60-L64)
for the current head.
