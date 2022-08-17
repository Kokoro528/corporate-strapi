export const proseStyle = (type) => {
    switch (type) {
        case "dark":
            return "prose prose-invert "
            break;
            
        case "white": 
            return "prose text-gray-900"
    
        default:
            return ""
            
    }
}