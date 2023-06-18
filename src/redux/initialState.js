import {DiaryRecord, MoodRecord, SeagullChat} from 'src/redux/datatypes';

export const persistentInitialState = {
    diaryRecords: [],
    moodRecords: [],
    seagullChats: [],
    fontSize: 'Normal',
    requireAuthentication: true,
}

export const temporaryInitialState = {
    pageHistory: [
        'Home'
    ],
    isAuthenticated: true,
    curDate: new Date(2023, 5, 5),
}

// export const initialState = {
//     persistentData: {
//         diaryRecords: [
//             new DiaryRecord(new Date(2023, 5, 5), "I'm feeling great today!", "Hello\nMy day was perfect today!!!"),
//         ],
//         moodRecords: [],
//         seagullChats: [
//             new SeagullChat(new Date(2023, 5, 5), 0, true, "Hello!"),
//             new SeagullChat(new Date(2023, 5, 5), 1, false, "Hello!"),
//             new SeagullChat(new Date(2023, 5, 5), 2, true, "How are you?"),
//             new SeagullChat(new Date(2023, 5, 5), 3, false, "I'm fine, thanks!"),
//             new SeagullChat(new Date(2023, 5, 5), 4, true, "That's great!"),
//             new SeagullChat(new Date(2023, 5, 5), 5, false, "Yeah!"),
//         ],
//         fontSize: 'Normal',
//         requireAuthentication: true,
//     },
//     temporaryData: {
//         pageHistory: [
//             'Home'
//         ],
//         isAuthenticated: true,
//         curDate: new Date(2023, 5, 5),
//     }
// }
