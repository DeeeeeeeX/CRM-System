import React, {useState} from 'react';
import {Link} from "react-router-dom";
import '../css/Navigation.css'

const Navigation = () => {
    const [AllCount, setAllCount] = useState(0)
    const [inWorkCount, setInWorkCount] = useState(0)
    const [completeCount, setCompleteCount] = useState(0)
    const [isToggled, setIsToggled] = useState(1)
    let active = 'active'
    let inActive = 'inActive'

    return (
            <nav>
                <Link onClick={() => {setIsToggled(1)}} className={isToggled === 1 ? active: inActive} to="/">Всё ({AllCount})</Link>
                <Link onClick={() => {setIsToggled(2)}} className={isToggled === 2 ? active: inActive} to="/inWork">В работе ({inWorkCount})</Link>
                <Link onClick={() => {setIsToggled(3)}} className={isToggled === 3 ? active: inActive} to="/complete">Сделано ({completeCount})</Link>
            </nav>
    );
};

export default Navigation;