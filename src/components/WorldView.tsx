import React from 'react';
import './WorldView.css';

interface PlaceableElement {
    id: number;
    x: number;
    y: number;
    content: React.ReactNode;
}

interface WorldViewProps {
    elements: PlaceableElement[];
}

const WorldView: React.FC<WorldViewProps> = ({ elements }) => {
    return (
        <div className="world-view">
            {elements.map(element => (
                <div
                    key={element.id}
                    className="placeable-element"
                    style={{ left: element.x, top: element.y }}
                >
                    {element.content}
                </div>
            ))}
        </div>
    );
};

export default WorldView;