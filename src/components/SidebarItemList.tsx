import React, { useState } from 'react';
import './Sidebar.css';

interface FileNode {
    name: string;
    icon?: React.ElementType;
    children?: FileNode[];
}

interface SidebarItemListProps {
    title: string;
    files: FileNode[];
}

const SidebarItemList: React.FC<SidebarItemListProps> = ({ title, files }: SidebarItemListProps) => {
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
        return nodes.map((node:FileNode) => (
            <div className='item-list' key={node.name}>
                {node.children && node.children.length > 0 ? (
                    <>
                        <div className='branch' onClick={() => toggleNode(node.name)} style={{ cursor: 'pointer' }}>
                            {expandedNodes.has(node.name) ? '▼' : '▶'} {node.icon ? <node.icon className="icon" /> : <></>} {node.name}
                        </div>
                        {expandedNodes.has(node.name) && renderTree(node.children)}
                    </>
                ) : (
                    <div className='leaf'>{node.icon ? <node.icon className="icon" /> : <></>} {node.name}</div>
                )}
            </div>
        ));
    };

    return <div className='sidebar-item-list'>
        <div className='sidebar-title'>{title}</div>
        {renderTree(files)}
    </div>;
};

export default SidebarItemList;