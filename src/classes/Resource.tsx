import { FolderIcon, QuestionIcon } from "../helpers/Icons";
import { Project } from "./Project";

export interface ResourceConstructorArgs {
    name: string;
    id?: string;
    path: string;
}

export class Resource {
    public name: string;
    public id: string;
    public path: string;
    
    constructor( { name, id, path }: ResourceConstructorArgs) {
        this.name = name;
        this.id = id || crypto.randomUUID();
        this.path = path;
    }

    public get type(): string {
        return "Resource";
    }

    public get icon(): React.FunctionComponent<React.SVGAttributes<SVGElement>> {
        return QuestionIcon;
    }
}

export class ResourceRef<T extends Resource> {
    public id: string;

    public project: Project;
    
    constructor(project:Project, id: string) {
        this.id = id;
        this.project = project;
    }

    public get resource(): T | undefined {
        return this.project.getResource(this.id) as T;
    }

}

export class ResourceFolder<T extends Resource> extends Resource {

    public items: Array<T | ResourceFolder<T>>;

    constructor({ name, id, path }: ResourceConstructorArgs) {
        super({name, id, path})
        this.items = []
    }

    override get type(): string {
        return "Folder";
    }
    override get icon(): React.FunctionComponent<React.SVGAttributes<SVGElement>> {
        return FolderIcon;
    }
}

export type ResourceFolderRef<T extends Resource> = ResourceRef<T>;
