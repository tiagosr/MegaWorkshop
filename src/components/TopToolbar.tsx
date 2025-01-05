import React from 'react';
import "./TopToolbar.css";
import { useNavigate } from 'react-router-dom';
import { PlayIcon, ExportIcon, SearchIcon } from '../helpers/Icons';

const TopToolbar: React.FC = () => {
    const navigate = useNavigate();
    const [mode, setMode] = React.useState<string>("/");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMode(event.target.value);
        navigate(event.target.value);
    };

    return (
        <div className="top-toolbar">
            <select className="select" value={mode} onChange={handleChange}>
                <option className="option" value={"/"}>Worlds</option>
                <option className="option" value={"/sprites"}>Sprites</option>
                <option className="option" value={"/tilemaps"}>Tilemaps</option>
                <option className="option" value={"/music"}>Music</option>
                <option className="option" value={"/sfx"}>Sound Effects</option>
            </select>
            <div className="title"></div>
            <button className="button"><ExportIcon /></button>
            <button className="button"><PlayIcon /></button>
            <div className="search">
                <div className="icon">
                    <SearchIcon />
                </div>
                <input type="text" className="input" placeholder="Search…" />
            </div>
        </div>
    );
};

export default TopToolbar;