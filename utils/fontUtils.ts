export async function getFontWeights(fontName: string): Promise<string[]> {
  try {
    const response = await fetch(`https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}`)
    const css = await response.text()
    
    const weightRegex = /font-weight:\s*(\d+)/g
    const weights = new Set<string>()
    let match

    while ((match = weightRegex.exec(css)) !== null) {
      weights.add(match[1])
    }

    return Array.from(weights).sort((a, b) => parseInt(a) - parseInt(b))
  } catch (error) {
    console.error(`Error fetching weights for ${fontName}:`, error)
    return ['400'] // Return default weight if fetching fails
  }
}

