import React from 'react'
import './popup.scss'

export default function Popup(props) {
    return (
        <div className="popUp">
            <h2>Êtes-vous sûr de vouloir supprimer ce Pokémon ?</h2>
            <div className="choice">
                <button className='cancel'>Annuler</button>
                <button className='confirm' onClick={props.closePopup}>Confirmer</button>
            </div>
        </div>
    )
}
