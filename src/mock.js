export function FireTable(weekDay, lesson, id) {
    this.weekday = weekDay;
    this.lesson = lesson;
    this.id = id;
}

export function FireLesson(
    subject,
    audience,
    professor,
    exercise,
    type,
    time,
    parity,
    group,
) {
    this.subject = subject;
    this.audience = audience;
    this.professor = professor;
    this.exercise = exercise;
    this.type = type;
    this.time = time;
    this.parity = parity;
    this.group = group;
}
