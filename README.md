# jughead
A library for parsing binaries

# Example struct
```
require "path"

define int32: integer(4) unsigned
define varint: leb128 signed
define byte: integer(1)
define string: byte[int32] utf8

define RandomSet: enum {
    0: { x: int32, y: int32 }
    1: { z: int32 },
   -1: nil
}

define Bitmap {
    internal width: varint
    internal height: varint
    pixels: int32[width, height]
}

public define GameMaker structure {
    internal magic_number: int32 = 0xCAFEBABE

    blerp: ref RandomSet[until nil]
    set: RandomSet <varint> [*]

    section(int32) zlib {
        Bitmap [*]
    }

    internal t: int32
    assert (t in (0...31))

    internal blerb: Bloop
}
```
