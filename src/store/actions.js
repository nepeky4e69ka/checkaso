import axios from 'axios';
import store from '@/store/index'
import { storage, setStates} from '@/helper'

const GET_APPS = async({ commit }, query = {} ) => {

    // Assign current state and new
    const Query = Object.assign ( store.state.states.query, query );
    commit('setStates', { query: Query });
    // update ls
    setStates({ query: Query });
    try {
        // emulate request
        const { data } = await axios.get('/apps.json', { params:Query });
        commit('setTables', data );
    }
    catch (e){
        // default tables
        commit('setTables', { new_table:{ name:'Новая папка', applications:[] }} );
    }
};

const RESTORE_STATES = async({ commit }) =>{
    const state = storage( 'get', 'states' );
    if( state ) commit( 'setStates', state);
};

const SET_APPLICATIONS = ({ commit}, payload ) => {
    // prevent image bug
    commit('setApplications', []);
    setTimeout( () => commit('setApplications', payload), 10)
};
export default {
    GET_APPS,
    RESTORE_STATES,
    SET_APPLICATIONS
}