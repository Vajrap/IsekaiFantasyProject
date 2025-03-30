export interface SkillConsumeInterface {
	hp: number[],
	mp: number[],
	sp: number[],
	elements: {
		element: string,
		amount: number[]
	}[]
}

export interface SkillProduceInterface {
	elements: {
		element: string,
		amount: [number, number][]
	}[]
}

export interface SkillConsumeByTurnInterface {
	hp: number,
	mp: number,
	sp: number,
	elements: {
		element: string,
		amount: number
	}[]
}

export interface SkillProduceByTurnInterface {
	elements: {
		element: string,
		amount: number
	}[]
}
