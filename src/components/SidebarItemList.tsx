import React, { useState } from 'react';

interface FileNode {
    name: string;
    children?: FileNode[];
}

interface SidebarItemListProps {
    files: FileNode[];
}

const SidebarItemList: React.FC<SidebarItemListProps> = ({ files }) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

    const toggleNode = (nodeName: string) => {
        setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(nodeName)) {
                newSet.delete(nodeName);
            } else {
                newSet.add(nodeName);
            }
            return newSet;
        });
    };

    const renderTree = (nodes: FileNode[]) => {
        return nodes.map(node => (
            <div key={node.name} style={{ marginLeft: '20px' }}>
                {node.children && node.children.length > 0 ? (
                    <>
                        <div onClick={() => toggleNode(node.name)} style={{ cursor: 'pointer' }}>
                            {expandedNodes.has(node.name) ? '▼' : '▶'} {node.name}
                        </div>
                        {expandedNodes.has(node.name) && renderTree(node.children)}
                    </>
                ) : (
                    <div>{node.name}</div>
                )}
            </div>
        ));
    };

    return <div>{renderTree(files)}</div>;
};

export default SidebarItemList;