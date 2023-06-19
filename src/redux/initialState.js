import {DiaryRecord, MoodRecord, SeagullChat} from 'src/redux/datatypes';

export const persistentInitialState = {
    diaryRecords: [],
    moodRecords: [],
    seagullChats: [
        new SeagullChat(new Date(1900, 1, 1), 0, false, "From now on, you are the personal assistant of me. Your task is to help me with my situation. Here is my diary of today:\n\n${userDiary}\n\n\
        Also, I provide you with my mood record:\n\n${userMood}\n\nPlease adjust your response accordingly. Namely, \
        please take the mood record into account when you respond to me and help me with what I mention you in my diary. \
        It is possible that I may not have provided a diary record or a mood record. In that case, adjust your response accordingly.\n\
        Do not forget that your role is to help me and improve my mood and feelings. Also, you should guide me as well!!"),
        new SeagullChat(new Date(1900, 1, 1), 1, true, "Hello, I am Mr. Seagull, your personal assistant.\n\nI checked your mood record and diary, and I am ready to assist you.\n\nIn case you want to discuss something specific, please let me know.\n\nOtherwise, I can share my help and advice on how to help you with your situation."),
    ],
    fontSize: 'Normal',
    requireAuthentication: true,
}

export const temporaryInitialState = {
    pageHistory: [
        'Home'
    ],
    isAuthenticated: false,
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
