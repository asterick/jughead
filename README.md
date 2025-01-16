# jughead
A library for parsing binaries

# Example struct
```
require "path"

define int32 integer(4) unsigned
define varint leb128 signed
define byte integer(1)
define string byte[int32] utf8;

define blerb enum {
    0: { int32: x, int32: y }
    1: { int32: z },
   -1: terminal
}

define Bitmap {
    internal varint: width, height, size = width * height
    int32[width, height]: pixels
}

public define GameMaker structure {
    internal int32: magic_number = 0xCAFEBABE

    ref blerb: Bleep

    blerb (varint) [*] :someType

    block[int32] zlib {
        Bitmap [*]
    }

    internal int32 :t
    internal blerb :Bloop

    assert (t in (0...31))
}

define GameMakerMain8 structure {
    // This is a simple append
}
```
