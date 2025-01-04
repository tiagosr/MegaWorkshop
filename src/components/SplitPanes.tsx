import React, { LegacyRef, useCallback, useState } from 'react';
import './SplitPanes.css';
import { useResizeObserver } from '../helpers/useResizeObserver';

interface SplitPanesItemSplit {
    size: number;
    minSize: number;
    minimized: boolean;
    expandWithWindow: boolean;
}

interface SplitPanesProps {
    items: React.ReactNode[];
    orientation: 'horizontal' | 'vertical';
    splits: SplitPanesItemSplit[]
}

const SplitPanes: React.FC<SplitPanesProps> = ({ items, orientation, splits }) => {
    const [hoveredSplitter, setHoveredSplitter] = useState<number | null>(null);
    const [sizes, setSizes] = useState<Array<SplitPanesItemSplit>>(splits);

    const adjustPaneAtIndex = (sizes: SplitPanesItemSplit[], index: number, delta: number) => {
        const newSizes = [...sizes];
        const oldSize = newSizes[index];
        const newSize = Math.max(oldSize.size + delta, oldSize.minSize);
        const tempDelta = newSize - oldSize.size;
        const oldSize2 = newSizes[index + 1];
        const newSize2 = Math.max(oldSize2.size - tempDelta, oldSize2.minSize);
        const actualDelta = Math.min(newSize - oldSize.size, oldSize2.size - newSize2);
        newSizes[index] = { ...oldSize, size: oldSize.size + actualDelta };
        newSizes[index + 1] = { ...oldSize2, size: oldSize2.size - actualDelta };
        return newSizes;
    };

    const realSizes = useCallback(() => sizes, [sizes]);

    const readjust = (sizes: SplitPanesItemSplit[], newSize: number) => {
        const newSizes = [...sizes];
        const expandableSizes = newSizes.filter(size => size.expandWithWindow);
        const nonexpandableTotal = newSizes.filter(size => !size.expandWithWindow).reduce((acc, cur) => acc + cur.size, 0);
        const totalSize = expandableSizes.reduce((acc, cur) => acc + cur.size, 0);
        const delta = newSize - nonexpandableTotal - totalSize;
        const sizeDelta = delta / expandableSizes.length;
        return newSizes.map(size => ({ ...size, size: size.size + (size.expandWithWindow? sizeDelta : 0) }));
    };

    const onResize = useCallback(orientation === "horizontal" ?(target: HTMLElement) => {
        setSizes(readjust(realSizes(), target.clientWidth));
    } : (target: HTMLElement) => {
        setSizes(readjust(realSizes(), target.clientHeight));
    }, [orientation]);

    const targetRef = useResizeObserver(onResize);


    const handleMouseEnter = (i: number) => () => setHoveredSplitter(i);
    const handleMouseLeave = () => { setHoveredSplitter(null); };
    const realHoveredSplitter = useCallback(() => hoveredSplitter, [hoveredSplitter]);

    const handleMouseDown = (i:number) => {
        if (orientation === 'horizontal') {
            return (e: React.MouseEvent) => {
                if (realHoveredSplitter() !== i) return;
                e.preventDefault();
                const startX = e.clientX;
                const onMouseMove = (e: MouseEvent) => {
                    setSizes(adjustPaneAtIndex(sizes, i, (e.clientX - startX)));
                };

                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            };
        } else if (orientation === 'vertical') {
            return (e: React.MouseEvent) => {
                if (realHoveredSplitter() !== i) return;
                e.preventDefault();
                const startY = e.clientY;
                const onMouseMove = (e: MouseEvent) => {
                    setSizes(adjustPaneAtIndex(sizes, i, (e.clientY - startY)));
                };

                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }
        }
    };

    return (
        <div ref={targetRef as LegacyRef<HTMLDivElement>} className={`split-panes ${orientation}`}>
            {items.map((item, index) => (
                <>
                    <div key={index} className="split-pane" style={orientation === 'horizontal' ? { width: sizes[index]?.size } : { height: sizes[index]?.size }}>
                        {item}
                    </div>
                    {index < items.length - 1 && <div 
                        key={`${index}-splitter`}
                        className="split-panes-splitter"
                        onMouseDown={handleMouseDown(index)}
                        onMouseEnter={handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave} />}
                </>
                
            ))}
        </div>
    );
};

export default SplitPanes;