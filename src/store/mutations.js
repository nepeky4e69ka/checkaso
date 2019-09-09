export default {
    setApplications: ( state, payload ) => state.applications = payload,
    setStates: ( state, payload ) => state.states = payload,
    setTables: ( state, payload ) => state.tables = payload,
    setQuery: ( state, payload ) => state.query = payload,
    setError: ( state, error ) => state.error = error

}