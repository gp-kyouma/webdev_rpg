import {_get} from './DatabaseCRUD';

export default class Skill {
    
    constructor() { // "empty" skill

        this.id = 0
        this.handle = ""

        this.skill_name = ""
        this.skill_description = ""

        this.cost = 0
        this.effect = {}
    }

    async getFromDB(handle, useID = false) {
        let search_term;
        if (useID)
            search_term = { id: handle }
        else
            search_term = { handle: handle }

        const skilldata = await _get('skills', search_term)
        if (!skilldata || Array.isArray(skilldata) && skilldata.length === 0)
        {
            console.log("Skill with handle " + handle + " does not exist in database")
            return
        }
        const skill = skilldata[0]
        if (!skill)//just to be sure...
        {
            console.log("Skill with handle " + handle + " does not exist in database")
            return
        }

        this.setFromSkillData(skill)
    }

    setFromSkillData(skill){
        this.id = skill.id
        this.handle = skill.handle //possibly redundant

        this.skill_name = skill.skill_name
        this.skill_description = skill.skill_description

        this.cost = skill.cost

        try {
            this.effect = JSON.parse(skill.effect);
        } catch (e) {
            console.log(e)
            this.effect = {};
        }
    }

    //cloning business.
    clone() {

        // Deeply clone the internal data, then reconstruct the class
        let clonedSkill = structuredClone(this);

        return Object.setPrototypeOf(clonedSkill, Skill.prototype);
    }
}