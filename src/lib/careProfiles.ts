// Interface for the care profile data
export interface CareProfile {
  id: string;
  name: string;
  age: number;
  address: string;
  preferences: string[];
}

// Mock data for care profiles
export const initialCareProfiles: Record<string, CareProfile> = {
  "margaret-wilson": {
    id: "margaret-wilson",
    name: "Margaret Wilson",
    age: 75,
    address: "123 Maple Street, Riverside, CA 92501",
    preferences: [
      "Prefers to take medication with meals",
      "Enjoys classical music during morning routine",
      "Needs assistance with mobility",
    ],
  },
  "robert-wilson": {
    id: "robert-wilson",
    name: "Robert Wilson",
    age: 78,
    address: "456 Oak Avenue, Riverside, CA 92501",
    preferences: [
      "Diabetic diet - no sugar",
      "Likes to walk in the garden after lunch",
      "Needs reading glasses for activities",
    ],
  },
};

// Separate async data fetching function (for future use with real API)
export async function getProfileData(
  id: string
): Promise<CareProfile | undefined> {
  // In a real app, this would fetch from an API
  // For demo purposes, we're just using mock data
  return initialCareProfiles[id];
}

// Synchronous version for client-side use
export function getProfileSync(id: string): CareProfile | undefined {
  return initialCareProfiles[id];
} 