import { MapIcon } from "../helpers/Icons";
import { Tilemap } from "./Tilemap";
import { Resource, ResourceConstructorArgs, ResourceRef } from "./Resource";

export interface MapConstructorArgs extends ResourceConstructorArgs {
    background: Tilemap;
    foreground: Tilemap;
}

export class Map extends Resource {
    public background: Tilemap;
    public foreground: Tilemap;

    constructor({name, id, path, background, foreground}: MapConstructorArgs) {
        super({name, id, path});
        this.background = background;
        this.foreground = foreground;
    }

    override get type() {
        return "Map";
    }

    get icon() {
        return MapIcon;
    }
}

export class MapRef extends ResourceRef<Map> {
    get map(): Map | undefined {
        return this.project.getResource(this.id) as Map;
    }
}