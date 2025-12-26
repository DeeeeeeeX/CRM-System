import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import '../css/Navigation.css'

const Navigation = ({quantity = {}}) => {

    const [isToggled, setIsToggled] = useState(1)
    let active = 'active'
    let inActive = 'inActive'

    const {all = 0, completed = 0, inWork = 0} = quantity;

    useEffect(() => {},[quantity])

    return (
            <nav>
                <Link onClick={() => {setIsToggled(1)}} className={isToggled === 1 ? active: inActive} to="/">Всё ({all})</Link>
                <Link onClick={() => {setIsToggled(2)}} className={isToggled === 2 ? active: inActive} to="/inWork">В работе ({inWork})</Link>
                <Link onClick={() => {setIsToggled(3)}} className={isToggled === 3 ? active: inActive} to="/complete">Сделано ({completed})</Link>
            </nav>
    );
};

export default Navigation;