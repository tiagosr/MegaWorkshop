import { PaletteIcon } from "../helpers/Icons";
import { Resource, ResourceConstructorArgs, ResourceRef } from "./Resource";

export interface PaletteConstructorArgs extends ResourceConstructorArgs {
    colors: string[];
}

export class Palette extends Resource {
    public colors: string[];
    
    constructor({name, id, path, colors}: PaletteConstructorArgs) {
        super({name, id, path});
        this.colors = colors;
    }

    override get type() {
        return "Palette";
    }

    override get icon() {
        return PaletteIcon;
    }
}

export class PaletteRef extends ResourceRef<Palette> {
    public get palette(): Palette | undefined {
        return this.project.getResource(this.id) as Palette;
    }
}