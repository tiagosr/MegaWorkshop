import React from 'react';
import SplitPanes from '../components/SplitPanes';

const Sprites: React.FC = () => {
    return (
        <SplitPanes items={[
            <div>Sidebar A</div>,
            <SplitPanes orientation='vertical' items={[
                <div>Sprites</div>,
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

export default Sprites;