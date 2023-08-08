export function getStatColorFromName(name: string) {
    if (name==="attack") return "yellow2"
    else if (name==="defense") return "cyan.8"
    else if (name==="special-attack") return "purple2"
    else if (name==="special-defense") return "primary"
    else if (name==="speed") return "green.1"
    return "red2"
}