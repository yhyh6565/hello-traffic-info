import type { Script } from "@/types/script";

export async function loadScriptsFromCSV(): Promise<Script[]> {
  const response = await fetch("/scripts.csv");
  const text = await response.text();
  
  return parseCSV(text);
}

function parseCSV(csvText: string): Script[] {
  const lines = csvText.split('\n');
  const scripts: Script[] = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV with quoted fields (대본 contains commas and newlines)
    const parsed = parseCSVLine(line, lines, i);
    if (!parsed) continue;
    
    const { fields, newIndex } = parsed;
    i = newIndex;
    
    const [id, type, isCreepy, fileName, text] = fields;
    
    if (!id || !type || !text) continue;
    
    scripts.push({
      id: id.trim(),
      type: type.trim() === "라디오 사연" ? "story" : "traffic",
      isCreepy: isCreepy?.trim().toUpperCase() === "TRUE",
      title: getTitle(type.trim(), text.trim()),
      text: text.trim(),
      audioUrl: `/audio/${fileName?.trim() || id.trim()}.mp3`
    });
  }
  
  return scripts;
}

function parseCSVLine(startLine: string, allLines: string[], startIndex: number): { fields: string[], newIndex: number } | null {
  let currentLine = startLine;
  let currentIndex = startIndex;
  
  // Count quotes to check if we need to continue to next lines
  while (countQuotes(currentLine) % 2 !== 0 && currentIndex < allLines.length - 1) {
    currentIndex++;
    currentLine += '\n' + allLines[currentIndex];
  }
  
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < currentLine.length; i++) {
    const char = currentLine[i];
    
    if (char === '"') {
      if (inQuotes && currentLine[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  fields.push(current);
  
  return { fields, newIndex: currentIndex };
}

function countQuotes(str: string): number {
  let count = 0;
  for (const char of str) {
    if (char === '"') count++;
  }
  return count;
}

function getTitle(type: string, text: string): string {
  if (type === "교통정보") {
    // Extract first sentence or first 20 chars
    const firstSentence = text.split(/[.!?]/)[0];
    return firstSentence.length > 30 ? firstSentence.slice(0, 30) + "..." : firstSentence;
  }
  
  // For stories, try to extract sender's name pattern
  const senderMatch = text.match(/['']([^'']+)[''].*님/);
  if (senderMatch) {
    return `${senderMatch[1]}님의 사연`;
  }
  
  const idMatch = text.match(/(\d+)님/);
  if (idMatch) {
    return `${idMatch[1]}님의 사연`;
  }
  
  return "청취자 사연";
}
