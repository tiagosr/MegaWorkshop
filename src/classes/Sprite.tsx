import { SpriteIcon } from "../helpers/Icons";
import { Resource, ResourceConstructorArgs, ResourceRef } from "./Resource";

export interface SpriteConstructorArgs extends ResourceConstructorArgs {
    tilesWide: number;
    tilesHigh: number;
    tiles?: number[];
}

export class Sprite extends Resource {
    public tilesWide: number;
    public tilesHigh: number;
    public tiles: number[];

    constructor({name, id, path, tilesWide, tilesHigh, tiles}: SpriteConstructorArgs) {
        super({name, id, path});
        this.tilesWide = tilesWide;
        this.tilesHigh = tilesHigh;
        this.tiles = tiles || new Array(tilesWide * tilesHigh).fill(0);
    }

    override get type() {
        return "Sprite";
    }

    override get icon() {
        return SpriteIcon;
    }
}

export class SpriteRef extends ResourceRef<Sprite> {
    public get sprite(): Sprite | undefined {
        return this.project.getResource(this.id) as Sprite;
    }
}