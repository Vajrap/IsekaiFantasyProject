;
export function foundSkill(skill) {
    return {
        status: 'FOUND',
        message: skill
    };
}
export function skillNotFound() {
    return {
        status: 'SKILL_NOT_FOUND',
        message: null
    };
}
