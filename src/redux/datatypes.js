export class DiaryRecord {
    /*
    DiaryRecord: Object
        date: Date
        diaryTitle: String
        diaryStr: String
    */
    constructor(date, diaryTitle, diaryStr) {
        this.date = date;
        this.diaryTitle = diaryTitle;
        this.diaryStr = diaryStr;
    }
    getDiaryTitle() {
        return this.diaryTitle;
    }
    setDiaryTitle(newTitle) {
        this.diaryTitle = newTitle;
    }
    getDiaryStr() {
        return this.diaryStr;
    }
    setDiaryStr(newStr) {
        this.diaryStr = newStr;
    }
    getDate() {
        return this.date;
    }
    setDate(newDate) {
        this.date = newDate;
    }
}

export class MoodRecord {
    /*
    MoodRecord: Object
        date: Date
        intensity: Number (in [0,1])
        valence: Number (in [0,1])
    
    */
    constructor(date, intensity, valence) {
        this.date = date;
        this.intensity = intensity;
        this.valence = valence;
    }
    getDate() {
        return this.date;
    }
    setDate(newDate) {
        this.date = newDate;
    }
    getIntensity() {
        return this.intensity;
    }
    setIntensity(newIntensity) {
        this.intensity = newIntensity;
    }
    getValence() {
        return this.valence;
    }
    setValence(newValence) {
        this.valence = newValence;
    }
}

export class SeagullChat {
    /* 
    SeagullChat: Object
        date: Date,
        timeStamp: Date, 
        text: String
    */
    constructor(date, timeStamp, text) {
        this.date = date;
        this.timeStamp = timeStamp;
        this.text = text;
    }
    getDate() {
        return this.date;
    }
    setDate(newDate) {
        this.date = newDate;
    }
    getTimeStamp() {
        return this.timeStamp;
    }
    setTimeStamp(newTimeStamp) {
        this.timeStamp = newTimeStamp;
    }
    getText() {
        return this.text;
    }
    setText(newText) {
        this.text = newText;
    }
}