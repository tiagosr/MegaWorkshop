import React from 'react';
import SplitPanes from '../components/SplitPanes';
import SidebarItemList from '../components/SidebarItemList';

import { 
    WorldIcon,
    MapIcon,
    SpriteIcon,
    ScriptIcon, 
    FolderIcon 
} from '../helpers/Icons';


const GameWorlds: React.FC = () => {
    return (
        <SplitPanes items={[
            <SplitPanes orientation='vertical' items={[
                <SidebarItemList title="Worlds" files={[
                    { name: 'World 1', icon: WorldIcon, children: [
                        { name: 'Level 1', icon: MapIcon },
                        { name: 'Level 2', icon: MapIcon },
                        { name: 'Level 3', icon: MapIcon }
                    ]},
                    { name: 'World 2', icon: WorldIcon, children: [
                        { name: 'Level 1', icon: MapIcon },
                        { name: 'Level 2', icon: MapIcon },
                        { name: 'Level 3', icon: MapIcon }
                    ]},
                    { name: 'World 3', icon: WorldIcon, children: [
                        { name: 'Level 1', icon: MapIcon },
                        { name: 'Level 2', icon: MapIcon },
                        { name: 'Level 3', icon: MapIcon }
                    ]}
                ]} />,
                <SidebarItemList title="Entities" files={[
                    { name: 'Entity 1', icon: SpriteIcon },
                    { name: 'Entity 2', icon: SpriteIcon },
                    { name: 'Entity 3', icon: SpriteIcon }
                ]} />,
                <SidebarItemList title="Scripts" files={[
                    { name: 'common', icon: FolderIcon, children: [
                        { name: 'Script 1', icon: ScriptIcon },
                        { name: 'Script 2', icon: ScriptIcon },
                        { name: 'Script 3', icon: ScriptIcon }
                    ]},
                    { name: 'Script 2', icon: ScriptIcon },
                    { name: 'Script 3', icon: ScriptIcon }
                ]} />,
                <SidebarItemList title="Variables" files={[
                ]} />
            ]} splits={[
                { size: 200, minSize: 100, minimized: false, expandWithWindow: true, noOverflow: true },
                { size: 200, minSize: 100, minimized: false, expandWithWindow: true, noOverflow: true },
                { size: 200, minSize: 100, minimized: false, expandWithWindow: true, noOverflow: true },
                { size: 200, minSize: 100, minimized: false, expandWithWindow: true, noOverflow: true },
            ]} />,
            <SplitPanes orientation='vertical' items={[
                <div>World</div>,
                <div>Properties</div>
            ]} splits={[
                { size: 400, minSize: 200, minimized: false, expandWithWindow: true },
                { size: 200, minSize: 100, minimized: false, expandWithWindow: false }
            ]} />,
            <div>Sidebar B</div>
        ]} splits={[
            { size: 200, minSize: 100, minimized: false, expandWithWindow: false },
            { size: 400, minSize: 200, minimized: false, expandWithWindow: true },
            { size: 200, minSize: 100, minimized: false, expandWithWindow: false }
        ]} orientation="horizontal" />
    );
};

export default GameWorlds;