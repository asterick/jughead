# jughead
A library for parsing binaries

# Example struct
```
require "path"

const CURRENT_REV = 31

define int32: integer(4) unsigned
define varint: leb128 signed
define byte: integer(1)
define string: byte[int32] utf8

define RandomSet: enum <varint> {
    0: { x: int32, y: int32 }
    1: { z: int32 },
   -1: nil
}

public define Bitmap: {
    internal width: varint
    internal height: varint
    pixels: int32[width, height]
}

public define GameFile: structure {
    # File format watermark
    internal: int32 == 0xCAFEBABE

    internal encoding_version: int32 default(CURRENT_REV)
    assert (encoding_version <= CURRENT_REV, "Version unhandled: {encoding_version}")

    internal set: RandomSet [until nil]             # Keep decoding until a null variant is discovered
    set_refs: (varint != -1) ref<index(set)> [*]    # Keep decoding, varint == -1 (reverse termination this sound complicated)
    floating_ref: varint ref<RandomSet>[until nil]  # Keep decoding until refering to a nil

    section[int32] zlib {
        bitmaps: Bitmap [*]
    }

    internal blerb: Bloop
}
```

Future features
===
 * Key/Value sets
 * Reverse order encoded sets
