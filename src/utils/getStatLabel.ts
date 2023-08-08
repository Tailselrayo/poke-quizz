export function getStatLabel(name: string) {
    if (name==="attack") return "ATK"
    else if (name==="defense") return "DEF"
    else if (name==="special-attack") return "SP.ATK"
    else if (name==="special-defense") return "SP.DEF"
    else if (name==="speed") return "SPD"
    else return "HP"
}