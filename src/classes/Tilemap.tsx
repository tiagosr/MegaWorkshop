import { MapIcon } from "../helpers/Icons";
import { Resource, ResourceConstructorArgs, ResourceRef } from "./Resource";

export interface TilemapConstructorArgs extends ResourceConstructorArgs {
    tilesWide: number;
    tilesHigh: number;
    tiles?: number[];
}

export class Tilemap extends Resource {
    public tilesWide: number;
    public tilesHigh: number;
    public tiles: number[];

    constructor({name, id, path, tilesWide, tilesHigh, tiles}: TilemapConstructorArgs) {
        super({name, id, path});
        this.tilesWide = tilesWide;
        this.tilesHigh = tilesHigh;
        this.tiles = tiles || new Array(tilesWide * tilesHigh).fill(0);
    }

    override get type() {
        return "Tilemap";
    }

    override get icon() {
        return MapIcon;
    }
}

export class TilemapRef extends ResourceRef<Tilemap> {
    public get tilemap(): Tilemap | undefined {
        return this.project.getResource(this.id) as Tilemap;
    }
}