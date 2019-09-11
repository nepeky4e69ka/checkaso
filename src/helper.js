"use strict";

import store            from '@/store/index'
import axios            from 'axios';
import { WebpMachine }  from "webp-hero"
// should be moved to sw for better performance
const webpMachine       = new WebpMachine();
const cachedWEBPImages  = [];

// local storage use
export const storage = ( action, name, obj ) => {

    let ls = null;
    switch ( action ){
        case 'get' : ls = JSON.parse( localStorage.getItem( name ) ); break;
        case 'set' : localStorage.setItem( name, JSON.stringify( obj )) ; break;
        case 'del' : localStorage.removeItem( name ) ; break;
    }
    return ls
};

export const setStates = ( params ) => {
    storage('set', 'states', Object.assign( params, store.state.states ));
};
// WEBP SAFARI SUPPORT & CACHING
export const transformImages = async() => {

    const images = document.querySelectorAll('.image__wrapper img');
    const links = Array.from( images ).map( e => e.dataset.url );

    for( let i = 0; i < links.length; i++){

        let base64url,
            cachedIndex = cachedWEBPImages.findIndex( cache => cache.link === links[ i ] );

        if( cachedIndex > -1 ) base64url = cachedWEBPImages[ cachedIndex ].data;
        else {
            try {
                const { data } = await axios.get( links[ i ],{ responseType: 'arraybuffer'});
                base64url = await webpMachine.decode( new Uint8Array( data ) );
                // prevent double request&decode
                cachedWEBPImages.push({ link: links[ i ], data: base64url });
            }catch (e){
                // set "no image" here
                window.console(e);
            }
        }
        images[ i ].parentNode.style = `background:url('${ base64url }')`;
    }
    document.querySelector('.apps_container').classList.add('polyfill');

};
//
export const roundToShort = ( value ) => { // not my

    let newValue = value;
    if (value >= 1000) {
        let suffixes = ["", "K.", "KK.", "B.","T."];
        let suffixNum = Math.floor( (value).length/3 );
        let shortValue = '';
        for ( let precision = 2; precision >= 1; precision-- ) {
            shortValue = parseFloat( (suffixNum !== 0
                ? ( value / Math.pow(1000,suffixNum )) : value).toPrecision( precision ));
            let dotLessShortValue = ( shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if ( dotLessShortValue.length <= 2 ) { break; }
        }
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
};