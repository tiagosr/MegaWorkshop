import { WorldIcon } from "../helpers/Icons";
import { MapRef } from "./Map";
import { Resource, ResourceConstructorArgs, ResourceRef } from "./Resource";

export interface WorldConstructorArgs extends ResourceConstructorArgs {
    connections?: MapConnection[];
}


export class MapConnection {
    public from: MapRef;
    public to: MapRef;
    public destX: number;
    public destY: number;

    // TODO add origin collider
    // TODO add metadata
    
    constructor({from, to, destX, destY}:{from: MapRef, to: MapRef, destX: number, destY: number}) {
        this.from = from;
        this.to = to;
        this.destX = destX;
        this.destY = destY;
    }
}

export class World extends Resource {

    public connections: MapConnection[] = [];
    
    constructor({name, id, path, connections}: WorldConstructorArgs) {
        super({name, id, path});
        this.connections = connections || [];
    }

    override get type() {
        return "World";
    }

    get icon() {
        return WorldIcon;
    }
    
}

export class WorldRef extends ResourceRef<World> {
    get world(): World | undefined {
        return this.project.getResource(this.id) as World;
    }
}