import React from 'react';

const Rank = ({user}) => {
    return (
        <div>
            <div className="white f3">
                {user.name + ' tu cantidad de imagenes escaneadas es de ' + user.entries}
            </div>
        </div>
    )
}

export default Rank;