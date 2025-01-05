import { TilesetIcon } from "../helpers/Icons";
import { Resource, ResourceConstructorArgs, ResourceRef } from "./Resource";

export interface TilesetConstructorArgs extends ResourceConstructorArgs {
    tilesCount: number;
    tileData?: number[];
}

export class Tileset extends Resource {
    public tilesCount: number;
    public tileData: number[];

    constructor({name, id, path, tilesCount, tileData}: TilesetConstructorArgs) {
        super({name, id, path});
        this.tilesCount = tilesCount;
        this.tileData = tileData || new Array(tilesCount * 8 * 8).fill(0);
    }

    override get type() {
        return "Tileset";
    }

    override get icon() {
        return TilesetIcon;
    }
}

export class TilesetRef extends ResourceRef<Tileset> {
    public get tileset(): Tileset | undefined {
        return this.project.getResource(this.id) as Tileset;
    }
}