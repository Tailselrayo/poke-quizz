export function getStatLabel(name: string) {
    if (name==="attack") return "atk"
    else if (name==="defense") return "def"
    else if (name==="special-attack") return "sp.atk"
    else if (name==="special-defense") return "sp.def"
    else if (name==="speed") return "spd"
    else return "hp"
}