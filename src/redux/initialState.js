export const initialState = {
    persistentData: {
            diaryRecords: [],
            moodRecords: [],
            seagullChats: [],
            fontSize: 'Normal',
            requireAuthentication: false,
    },
    temporaryData: {
        AuthenticationViewData: {
        },
        CalendarViewData: {
        },
        HomeViewData: {
        },
        MoodTrackerViewData: {
            MoodTrackerHorizontalSlider: 0,
            MoodTrackerVerticalSlider: 0,
            CurDate: null,
        },
        MrSeagullViewData: {
        },
        SettingsViewData: {
        },
        WriteDiaryViewData: {
        },
        AppViewData: {
            CurrentPage: 'Home',
            PrevPage: null,
        }
    }
}
