import React from 'react';
import SplitPanes from '../components/SplitPanes';

const SoundEffects: React.FC = () => {
    return (
        <SplitPanes items={[
            <div>Sidebar A</div>,
            <div>Sound Effects</div>
        ]} splits={[
            { size: 200, minSize: 100, minimized: false, expandWithWindow: false },
            { size: 400, minSize: 200, minimized: false, expandWithWindow: true }
        ]} orientation="horizontal" />
    );
};

export default SoundEffects;