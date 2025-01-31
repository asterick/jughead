# jughead
A library for parsing binaries

# Example struct
```
require "path"

const CURRENT_REV = 31

define int32: integer (unsigned, bits=32, big)
define varint: leb128 (signed)
define byte: integer (bits=8)
define f32: float(bits=32)
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

public define GameFile: struct {
    # File format watermark
    internal: int32 = 0xCAFEBABE

    internal encoding_version: int32 default(CURRENT_REV)
    assert (encoding_version <= CURRENT_REV, "Version unhandled" + encoding_version)

    internal set: RandomSet [until nil]                  ; Decode up-to and including a nil
    set_refs: varint ref(index .set) [terminator nil]    ; Decode excluding a nil (dropped)
    floating_ref: varint ref(RandomSet) [terminator nil] ; 

    section[int32] zlib {
        bitmaps: Bitmap [*] ; Decode while valid and data available
    }

    internal blerb: Bloop
}
```

Future features
===
 * Key/Value sets
 * Reverse order encoded sets (.zip TOC)
 * Bit packing
