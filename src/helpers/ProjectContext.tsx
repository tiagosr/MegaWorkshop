import { createContext } from "react";
import { Project } from "../classes/Project";


export type ProjectContextType = {
    project: Project;
    setProjectValue: (key: string, value:any) => void;
    
};

export const ProjectContext = createContext<ProjectContextType>({
    project: new Project("untitled", "", crypto.randomUUID(), ""),
    setProjectValue: () => {},
});