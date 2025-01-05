import { QuestionIcon } from "../helpers/Icons";
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

    public get icon(): React.FunctionComponent<any> {
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