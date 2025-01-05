import { Resource } from "./Resource";

import { PaletteRef } from "./Palette";
import { SpriteRef } from "./Sprite";
import { TilemapRef } from "./Tilemap";
import { TilesetRef } from "./Tileset";
import { WorldRef } from "./World";

export class Project {
    public name: string;
    public description: string;
    public id: string;
    public path: string;

    public sprites: SpriteRef[] = [];
    public palettes: PaletteRef[] = [];
    public tilesets: TilesetRef[] = [];
    public tilemaps: TilemapRef[] = [];
    public worlds: WorldRef[] = [];
    
    public resources: Resource[] = [];

    constructor(name: string, description: string, id: string, path: string) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.path = path;
    }

    public getResource(id: string): Resource | undefined {
        return this.resources.find(resource => resource.id === id);
    }
}