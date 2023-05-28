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
        },
        MrSeagullViewData: {
        },
        SettingsViewData: {
        },
        WriteDiaryViewData: {
        },
    }
}
