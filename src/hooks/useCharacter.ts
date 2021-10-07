import { useState } from 'react';
import { CharacterSides } from '../types/CharacterSides';
import { mapSpots } from '../data/mapSpots';

export const useCharacter = (propName: string) => {
    const [name, setName] = useState(propName);
    const [pos, setPos] = useState({ x: 3, y: 5 });
    const [side, setSide] = useState<CharacterSides>('down');

    const moveLeft = () => {
        setPos(pos => ({
            x: canMove(pos.x - 1, pos.y) ? pos.x - 1 : pos.x,
            y: pos.y
        }));
        setSide('left');
    }
    const moveRight = () => {
        setPos(pos => ({
            x: canMove(pos.x + 1, pos.y) ? pos.x + 1 : pos.x,
            y: pos.y
        }));
        setSide('right');
    }
    const moveDown = () => {
        setPos(pos => ({
            x: pos.x,
            y: canMove(pos.x, pos.y + 1) ? pos.y + 1 : pos.y
        }));
        setSide('down');
    }
    const moveUp = () => {
        setPos(pos => ({
            x: pos.x,
            y: canMove(pos.x, pos.y - 1) ? pos.y - 1 : pos.y
        }));
        setSide('up');
    }

    const canMove = (x: number, y: number) => {
        if(mapSpots[y] !== undefined && mapSpots[y][x] !== undefined) {
            return (mapSpots[y][x] === 1);
        }
        return false;
    }

    return {
        name,
        x: pos.x,
        y: pos.y,
        side,
        moveLeft,
        moveRight,
        moveDown,
        moveUp
    };
}