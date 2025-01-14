# jughead
A library for parsing binaries

# Example struct
require "path"

type int32 integer(4) unsigned
type varint leb128 signed
type byte integer(1)
type string byte[int32] utf8;

type blerb enum {
    0: TypeA <1,*> { x: int32, b: int32 }
    1: TypeB <2,3>
   -1: nil
}

public type GameMaker structure {
    body : match(int32) {
        800: GameMakerMain8
    }

    blorb : blerb
    bleep : ref blerb

    tags : test(int32) {
         1: EnumA,
         2: EnumB,
         3: EnumC,
         4: EnumD,
        -1: nil
    } [*]

    : block[int32] zlib { bitmaps: Bitmap [*] }

    internal t : int32

    assert (t in (0...31))
}

type GameMakerMain8 structure : GameMakerMain {
    // This is a simple append
}
