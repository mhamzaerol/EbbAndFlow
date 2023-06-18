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
    get(key) {
        if (key === 'date') {
            return this.date;
        } else if (key === 'diaryTitle') {
            return this.diaryTitle;
        } else if (key === 'diaryStr') {
            return this.diaryStr;
        }
    }
    set(key, value) {
        if (key === 'date') {
            this.date = value;
        }
        if (key === 'diaryTitle') {
            this.diaryTitle = value;
        }
        if (key === 'diaryStr') {
            this.diaryStr = value;
        }
    }
    check(key, value) {
        if (key === 'date') {
            // only check day, month, year
            return this.date.getDate() === value.getDate() && this.date.getMonth() === value.getMonth() && this.date.getFullYear() === value.getFullYear();
        }
        if (key === 'diaryTitle') {
            return this.diaryTitle === value;
        }
        if (key === 'diaryStr') {
            return this.diaryStr === value;
        }
    }
    clone() {
        return new DiaryRecord(this.date, this.diaryTitle, this.diaryStr);
    }
    toJSON() {
        return {
            class: 'DiaryRecord',
            attr: {
                date: this.date.toJSON(),
                diaryTitle: this.diaryTitle,
                diaryStr: this.diaryStr,
            }
        };
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
    get(key) {
        if (key === 'date') {
            return this.date;
        } else if (key === 'intensity') {
            return this.intensity;
        } else if (key === 'valence') {
            return this.valence;
        }
    }
    set(key, value) {
        if (key === 'date') {
            this.date = value;
        }
        if (key === 'intensity') {
            this.intensity = value;
        }
        if (key === 'valence') {
            this.valence = value;
        }
    }
    check(key, value) {
        if (key === 'date') {
            // only check day, month, year
            return this.date.getDate() === value.getDate() && this.date.getMonth() === value.getMonth() && this.date.getFullYear() === value.getFullYear();
        }
        if (key === 'intensity') {
            return this.intensity === value;
        }
        if (key === 'valence') {
            return this.valence === value;
        }
    }
    clone() {
        return new MoodRecord(this.date, this.intensity, this.valence);
    }
    toJSON() {
        return {
            class: 'MoodRecord',
            attr: {
                date: this.date.toJSON(),
                intensity: this.intensity,
                valence: this.valence,
            }
        };
    }
}

export class SeagullChat {
    /* 
    SeagullChat: Object
        date: Date
        index: Number
        isMrSeagull: Boolean
        text: String
    */
    constructor(date, index, isMrSeagull, text) {
        this.date = date;
        this.index = index;
        this.isMrSeagull = isMrSeagull;
        this.text = text;
    }
    get(key) {
        if (key === 'date') {
            return this.date;
        } else if (key === 'index') {
            return this.index;
        } else if (key === 'isMrSeagull') {
            return this.isMrSeagull;
        } else if (key === 'text') {
            return this.text;
        }
    }
    set(key, value) {
        if (key === 'date') {
            this.date = value;
        }
        if (key === 'index') {
            this.index = value;
        }
        if (key === 'isMrSeagull') {
            this.isMrSeagull = value;
        }
        if (key === 'text') {
            this.text = value;
        }
    }
    check(key, value) {
        if (key === 'date') {
            // only check day, month, year
            return this.date.getDate() === value.getDate() && this.date.getMonth() === value.getMonth() && this.date.getFullYear() === value.getFullYear();
        }
        if (key === 'index') {
            return this.index === value;
        }
        if (key === 'isMrSeagull') {
            return this.isMrSeagull === value;
        }
        if (key === 'text') {
            return this.text === value;
        }
    }
    clone() {
        return new SeagullChat(this.date, this.index, this.isMrSeagull, this.text);
    }
    toJSON() {
        return {
            class: 'SeagullChat',
            attr: {
                date: this.date.toJSON(),
                index: this.index,
                isMrSeagull: this.isMrSeagull,
                text: this.text,
            }
        };
    }
}