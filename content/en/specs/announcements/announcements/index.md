---
title: "Announcements"
description: "This page describes IPNI announcements"
lead: ""
draft: false
images: []
type: docs
menu:
  docs:
    parent: "announcements"
    identifier: "announcement"
weight: 510
toc: true
---

Announcements signal change to the advertisement chain itself. Announcement messages contain:

> **TODO**: add specification of announcement message and spell out that it's encoded as CBOR with
> edge
> cases on ExtraData + OrigPeer

Indexers may be notified of changes to advertisements as a way to reduce the latency of ingestion,
and for discovery and registration of new providers.

Once indexers observe a new provider, they should adaptively poll the provider for new content,
which provides the basis of understanding what content is currently available.

The indexer will maintain a policy for when advertisements from a provider are considered valid. An
example policy may be

* A provider must be available for at least 2 days before its advertisements will be returned to
  clients.
* If a provider cannot be dialed for 3 days, it's advertisements will no longer be returned to
  clients.
* If a provider starts a new chain, previous advertisements now no longer referenced will not be
  returned after 1 day of not being referenced.
* If a provider cannot be dialed for 2 weeks, previous advertisements downloaded by the indexer will
  be garbage collected, and will need to be re-synced from the provider.

There are two ways that a provider may pro-actively alert indexer(s) of new content availability:

1. Gossipsub announcements
2. HTTP announcements

### Gossipsub

The announcement contains the CID of the head and the multiaddr (either the libp2p host or the HTTP
host) where it should be fetched from. The format
is [here](https://pkg.go.dev/github.com/filecoin-project/storetheindex/dagsync/dtsync#Message).

It is sent over a gossip sub topic, that defaults to `/indexer/ingest/<network>`. For our production
network, this is `/indexer/ingest/mainnet`.

The `dagsync provider` will generate gossip announcements automatically on its host.

### HTTP

Alternatively, an announcement can be sent to a specific known network indexer.
The network indexer may then relay that announcement over gossip sub to other indexers to allow
broader discover of a provider choosing to selectively announce in this way.

Announcements are sent as HTTP PUT requests
to [`/ingest/announce`](https://github.com/filecoin-project/storetheindex/blob/main/server/ingest/http/server.go#L50)
on the index node's 'ingest' server.
Note that the `ingest server` is not the same http server as the primary publicly exposed query
server. This is because the index node operator may choose not to expose it, or may protect it so
that only selected providers are given access to this endpoint due to potential denial of service
concerns.

The body of the request put to this endpoint should be the json serialization of the
announcement [message](https://github.com/filecoin-project/storetheindex/blob/main/dagsync/dtsync/message.go#L15)
that would be provided over gossip sub: a representation of the head CID, and the multiaddr of where
to fetch the advertisement chain.