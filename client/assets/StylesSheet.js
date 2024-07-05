import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    
    // Container
    default_page: { flex: 1, paddingTop: 20, backgroundColor: '#fff8e7' },
    home_container: { flex: 1,  alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff8e7' },
    basic_container: { flex: 1, alignItems: 'center', backgroundColor: '#fff8e7' },
    info_container: { flex: 1, padding: 10, alignItems:'center', backgroundColor: '#fff8e7' },
    driving_container: { marginTop: 200, height: 250, width: 300, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderColor: '#ffbb00', borderRadius: 25, borderWidth: 3},
    notification_container: { marginTop: 200, height: 400, width: 350, alignSelf: 'center', alignItems: 'center', backgroundColor: '#fff', borderColor: '#ffbb00', borderRadius: 25, borderWidth: 3},

    // Options (buttons for selection)
    options_container: { flex: 0.25, alignItems: 'center', backgroundColor: '#fff8e7', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
    options: { paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: '#ffbb00', borderRadius: 25 },
    options2: { paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: '#da7a7e', borderRadius: 25 },
    options_text: { fontSize: 10, color: '#010b13' },
    options_selected: {  backgroundColor: '#ffbb00' }, 
    options_selected2: {  backgroundColor: '#da7a7e' },
    checkbox_container: { marginLeft: 70, alignSelf:'flex-start', alignItems: 'center', backgroundColor: '#fff8e7', flexDirection: 'row' },

    // Titles
    default_title: { textAlign: 'center', marginVertical: 10, color: '#010b13' },
    info_title: { textAlign: 'justify', marginVertical: 10, color: '#010b13' },
    default_title_bold: { textAlign: 'center', marginVertical: 10, color: '#010b13', fontWeight: 'bold' },
    default_title_italics: { textAlign: 'center', marginVertical: 10, color: '#010b13', fontStyle: 'italic' },
    login_input: { height: 40, width: 200, backgroundColor: '#fff', marginTop: 10, paddingHorizontal: 10, borderRadius: 25, borderWidth: 1, borderColor: '#ffbb00'},
    report_input: { height: 40, width: '100%', height: '100%', borderColor: '#ffbb00', borderWidth: 1, borderRadius: 25, paddingHorizontal: 50, backgroundColor: '#fff', marginTop: 10 }, 
    report_title: { textAlign: 'center', marginVertical: 10, color: '#fff8e7', backgroundColor: '#dc343b', borderRadius: 25, width: 100, height: 25, fontSize: 18 },
    trail_input: {height: 40, width: 200, backgroundColor: '#fff', marginTop: 10, paddingHorizontal: 10, borderRadius: 25, borderWidth: 1, borderColor: '#ffbb00' },
    search_button_title: { color: '#010b13', fontSize: 14, textAlign:'center' },
    rescue_title: { fontSize: 30, fontWeight: 'bold', alignSelf: 'center', marginTop: 20, marginBottom: 20 },
    rescue_title_button: { color: '#010b13', fontSize: 18, textAlign:'center' },
    white_button: { backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 5, marginVertical: 10 },

    // Buttons
    default_button: { backgroundColor: '#fff8e7', paddingVertical: 10, margin: 10, borderRadius: 25, width: 350 },
    login_button: { marginTop: 10, backgroundColor: '#dc343b', borderRadius: 25, width: 100 },
    report_button: { backgroundColor: '#dc343b', borderRadius: 25, width: 100, marginVertical: 20 },
    trail_button: { height: 40, width: 200, marginTop: 10, borderRadius: 25},
    rescue_button_1: { backgroundColor: '#FFBB00', paddingVertical: 15, paddingHorizontal: 10, marginBottom: 5, borderRadius: 25, heigh: 30, width: 350, marginTop: 10 },
    rescue_button_2: { backgroundColor: '#2B9D70', paddingVertical: 15, paddingHorizontal: 10, marginBottom: 5, borderRadius: 25, heigh: 30, width: 350, marginTop: 10 },
    rescue_button_3: { backgroundColor: '#bd4e6a', paddingVertical: 15, paddingHorizontal: 10, marginBottom: 5, borderRadius: 25, heigh: 30, width: 350, marginTop: 10 },
    rescue_button_4: { backgroundColor: 'gray', paddingVertical: 15, paddingHorizontal: 10, marginBottom: 5, borderRadius: 25, heigh: 30, width: 350, marginTop: 10 },
      
    // Modal
    modal_container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modal_title: { textAlign: 'center', marginVertical: 10, color: '#fff', fontSize: 18 },
    modal_button: { backgroundColor: 'black', paddingVertical: 5 },
    modal_menu_button: { backgroundColor: 'black', paddingVertical: 5, marginBottom: 5, borderRadius: 25, width: 200, heigh: 30 },

    // FlatList (table)
    flatlist_header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10 },
    flatlist_header_text: { fontWeight: 'bold', textAlign: 'center' },
    flatlist_row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 5 },
    flatlist_cell: { flex: 1, textAlign: 'center', borderWidth: 1, borderColor: '#ccc', padding: 10, fontSize: 18 },

    // Search Bars
    search_container: {  backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent', color: '#010b13', alignItems: 'center', justifyContent: 'center' },
    to_from_search_container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    to_from_search: { backgroundColor: '#292f34', padding: 20, borderRadius: 25, width: '80%' },
    
    // Image arrangements
    default_logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 50, marginTop: 100 },
    report_logo: { width: 100, height: 100, alignSelf: 'center', marginTop: 100 },
    trail_issues_logo: { width: 150, height: 150, alignSelf: 'center', marginTop: 100, marginBottom: 50 },
    info_logo: { width: 50, height: 50, marginHorizontal: 10},

    // Map
    map_container: { flex: 1 },
    map: { flex: 1 },
    explore_map_container: { width: 350, height: 400, borderRadius: 10, overflow: 'hidden', alignSelf:'center', margin: 20 },
    explore_map: { width: '100%', height: '100%' },
    overlay_map: {position: 'absolute', width: '15%', marginTop: 50, alignSelf: 'flex-end' },
    overlay_button_search: { width: 51, height: 51, alignSelf: 'flex-end', marginTop: 7, marginRight: 5 },
    overlay_button: { width: 51, height: 51, alignSelf: 'flex-end', marginRight: 5 },
    overlay_button_: { width: 51, height: 51, alignSelf: 'flex-end', marginRight: 5 },

    // Dropdown menu
    dropdown_view: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    dropdown_view2: { backgroundColor: 'white', padding: 5, borderRadius: 10, width: '80%', width:270, height: 120 },
    dropdown_container: { padding: 5, borderRadius: 25, borderColor: 'white', borderWidth: 1, borderRadius: 5, width:270, height: 30, backgroundColor: 'white', alignSelf: 'center'},
    dropdown_title: { fontSize: 16, padding: 10, color: 'black', marginHorizontal: 10 },
    dropdown_item: { padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc' },

});