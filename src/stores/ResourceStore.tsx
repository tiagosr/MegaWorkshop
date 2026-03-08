import { create, StateCreator } from "zustand";
import { Resource, ResourceFolder, ResourceRef } from "../classes/Resource";
import { Project } from "../classes/Project";
import { World, WorldRef } from "../classes/World";
import { Map, MapRef } from "../classes/Map";
import { Tilemap, TilemapRef } from "../classes/Tilemap";
import { Tileset, TilesetRef } from "../classes/Tileset";
import { Sprite, SpriteRef } from "../classes/Sprite";
import { Palette, PaletteRef } from "../classes/Palette";

interface ResourceSlice {
    project: Project,
    items: Record<string, Resource>,
    setResource: (res: Resource) => void,
    removeResource: (id: string) => void,
}

interface WorldStoreSlice {
    worlds: Array<WorldRef | ResourceRef<ResourceFolder<World>>>,
    addWorld: (world: World) => WorldRef,
    factories: { world: (name: string, path: string) => WorldRef },
    duplicators: { world: (source: WorldRef, path: string) => WorldRef },
}
interface MapStoreSlice {
    maps: Array<MapRef | ResourceRef<ResourceFolder<Map>>>,
    addMap: (map: Map) => MapRef,
    factories: { map: (name: string, path: string) => MapRef },
    duplicators: { map: (source: MapRef, path: string) => MapRef },
}

interface TilemapStoreSlice {
    tilemaps: Array<TilemapRef | ResourceRef<ResourceFolder<Tilemap>>>,
    addTilemap: (tilemap: Tilemap) => TilemapRef,
    factories: { tilemap: (name: string, path: string) => TilemapRef },
    duplicators: { tilemap: (source: TilemapRef, path: string) => TilemapRef },
}

interface TilesetStoreSlice {
    tilesets: Array<TilesetRef | ResourceRef<ResourceFolder<Tileset>>>,
    addTileset: (tileset: Tileset) => TilesetRef,
    factories: { tileset: (name: string, path: string) => TilesetRef },
    duplicators: { tileset: (source: TilesetRef, path: string) => TilesetRef }
}

interface SpriteStoreSlice {
    sprites: Array<SpriteRef | ResourceRef<ResourceFolder<Sprite>>>,
    addSprite: (sprite: Sprite) => SpriteRef,
    factories: { sprite: (name: string, path: string) => SpriteRef },
    duplicators: { sprite: (source: SpriteRef, path: string) => SpriteRef }
}

interface PaletteStoreSlice {
    palettes: Array<PaletteRef | ResourceRef<ResourceFolder<Palette>>>,
    addPalette: (palette: Palette) => PaletteRef,
    factories: { palette: (name: string, path: string) => PaletteRef },
    duplicators: { palette: (source: PaletteRef, path: string) => PaletteRef }
}


type ResourceStoreState = ResourceSlice
    & WorldStoreSlice
    & MapStoreSlice
    & TilemapStoreSlice
    & TilesetStoreSlice
    & SpriteStoreSlice
    & PaletteStoreSlice;

const resourceSlice: StateCreator<ResourceStoreState, [], [], ResourceSlice> = (set, get) => ({
    project: new Project("", "", crypto.randomUUID(), "."),
    items: {},
    setResource: (res) => set((state) => ({items: {...state.items, [res.id]: res}})),
    removeResource: (id) => set(({items: {[id]: _ , ...items}, ...rest}) => ({items: {...items}, ...rest})),
})


const worldSlice: StateCreator<ResourceStoreState, [], [], WorldStoreSlice> =
 (set, get): WorldStoreSlice => ({
    worlds: [],
    addWorld: (world) => {
        let ref = new WorldRef(get().project, world.id);
        set((state)=>({worlds: [...state.worlds, ref]}));
        return ref;
    },
    factories: {
        world: (name, path) => {
            let res = new World({name: name, id: crypto.randomUUID(), path: path, connections: []});
            get().setResource(res);
            return get().addWorld(res);
        },
    },
    duplicators: {
        world: (source: ResourceRef<World>, path) => {
            const orig = get().items[source.id] as World;
            let copy = new World({
                name: `${orig.name} Copy`,
                id: crypto.randomUUID(),
                path: path,
                connections: [...orig.connections]});
            get().setResource(copy);
            return get().addWorld(copy);
        },
    }
})
const mapSlice: StateCreator<ResourceStoreState, [], [], MapStoreSlice> =
 (set, get): MapStoreSlice => ({
    maps: [],
    addMap: (map) => {
        let ref = new MapRef(get().project, map.id);
        set((state)=>({maps: [...state.maps, ref]}));
        return ref;
    },
    factories: {
        map: (name, path) => {
            let res = new Map({name: name, id: crypto.randomUUID(), path: path, 
                background: get().factories.tilemap(`${name} bg`, path),
                foreground: get().factories.tilemap(`${name} fg`, path)
            });
            get().setResource(res);
            return get().addMap(res);
        },
    },
    duplicators: {
        map: (source: ResourceRef<Map>, path) => {
            const orig = get().items[source.id] as Map;
            let copy = new Map({
                name: `${orig.name} Copy`, id: crypto.randomUUID(), path: path,
                background: orig.background, foreground: orig.foreground
            });
            get().setResource(copy);
            return get().addMap(copy);
        }
    }
})
const tilemapSlice: StateCreator<ResourceStoreState, [], [], TilemapStoreSlice> =
 (set, get): TilemapStoreSlice => ({
    tilemaps: [],
    addTilemap: (tilemap) => {
        let ref = new TilemapRef(get().project, tilemap.id);
        set((state)=>({tilemaps: [...state.tilemaps, ref]}));
        return ref;
    },
    factories: {
        tilemap: (name, path) => {
            let res = new Tilemap({name: name, id: crypto.randomUUID(), path: path, tilesWide: 32, tilesHigh: 32});
            get().setResource(res);
            return get().addTilemap(res);
        },
    },
    duplicators: {
        tilemap: (source, path) => {
            const orig = get().items[source.id] as Tilemap;
            let copy = new Tilemap({
                name: `${orig.name} Copy`, id: crypto.randomUUID(), path: path,
                tilesHigh: orig.tilesHigh, tilesWide: orig.tilesWide,
                tiles: [...orig.tiles]
            });
            get().setResource(copy);
            return get().addTilemap(copy);
        }
    }
})
const tilesetSlice: StateCreator<ResourceStoreState, [], [], TilesetStoreSlice> =
 (set, get): TilesetStoreSlice => ({
    tilesets: [],
    addTileset: (tileset) => {
        let ref = new TilesetRef(get().project, tileset.id);
        set((state)=>({tilesets: [...state.tilesets, ref]}));
        return ref;
    },
    factories: {
        tileset: (name, path) => {
            let res = new Tileset({name: name, id: crypto.randomUUID(), path: path, tilesCount: 256});
            get().setResource(res);
            return get().addTileset(res);
        },
    },
    duplicators: {
        tileset: (source, path) => {
            const orig = get().items[source.id] as Tileset;
            let copy = new Tileset({
                name: `${orig.name} Copy`, id: crypto.randomUUID(), path: path,
                tilesCount: orig.tilesCount,
                tileData: [...orig.tileData]
            });
            get().setResource(copy);
            return get().addTileset(copy);
        }
    }
})
const spriteSlice: StateCreator<ResourceStoreState, [], [], SpriteStoreSlice> =
 (set, get): SpriteStoreSlice => ({
    sprites: [],
    addSprite: (sprite) => {
        let ref = new SpriteRef(get().project, sprite.id);
        set((state)=>({sprites: [...state.sprites, ref]}));
        return ref;
    },
    factories: {
        sprite: (name, path) => {
            let res = new Sprite({name: name, id: crypto.randomUUID(), path: path, tilesWide: 4, tilesHigh: 4});
            get().setResource(res);
            return get().addSprite(res);
        },
    },
    duplicators: {
        sprite: (source, path) => {
            const orig = get().items[source.id] as Sprite;
            let copy = new Sprite({
                name: `${orig.name} Copy`, id: crypto.randomUUID(), path: path,
                tilesWide: orig.tilesWide,
                tilesHigh: orig.tilesHigh,
                tiles: [...orig.tiles]
            });
            get().setResource(copy);
            return get().addSprite(copy);
        }
    }
})
const paletteSlice: StateCreator<ResourceStoreState, [], [], PaletteStoreSlice> =
 (set, get): PaletteStoreSlice => ({
    palettes: [],
    addPalette: (palette) => {
        let ref = new PaletteRef(get().project, palette.id);
        set((state)=>({palettes: [...state.palettes, ref]}));
        return ref;
    },
    factories: {
        palette: (name, path) => {
            let res = new Palette({name: name, id: crypto.randomUUID(), path: path, colors: []});
            get().setResource(res);
            return get().addPalette(res);
        },
    },
    duplicators: {
        palette: (source, path) => {
            const orig = get().items[source.id] as Palette;
            let copy = new Palette({
                name: `${orig.name} Copy`, id: crypto.randomUUID(), path: path,
                colors: [...orig.colors]
            });
            get().setResource(copy);
            return get().addPalette(copy);
        }
    }
})



export const useResourceStore = create<ResourceStoreState>()((...a) => {
    const ws = worldSlice(...a);
    const ms = mapSlice(...a);
    const tms = tilemapSlice(...a);
    const tss = tilesetSlice(...a);
    const ss = spriteSlice(...a);
    const ps = paletteSlice(...a);
    return {
        ...resourceSlice(...a),
        // ...[ws, ms, tms, tss, ss].reduce(
        //     (prev, next) => ({
        //         ...prev, ...next,
        //         factories: {...prev.factories, ...next.factories},
        //         duplicators: {...prev.duplicators, ...next.duplicators}
        //     }), {factories: {}, duplicators: {}}), // unfortunately TS doesn't like this
        ...ws,
        ...ms,
        ...tms,
        ...tss,
        ...ss,
        ...ps,
        factories: {
            ...ws.factories,
            ...ms.factories,
            ...tms.factories,
            ...tss.factories,
            ...ss.factories,
            ...ps.factories,
        },
        duplicators: {
            ...ws.duplicators,
            ...ms.duplicators,
            ...tms.duplicators,
            ...tss.duplicators,
            ...ss.duplicators,
            ...ps.duplicators,
        }
    }
});