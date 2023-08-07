export function getStatColorFromName(name: string) {
    if (name==="attack") return "yellow"
    else if (name==="defense") return "cyan.8"
    else if (name==="special-attack") return "purple"
    else if (name==="special-defense") return "primary"
    else if (name==="speed") return "green.1"
    return "red"
}